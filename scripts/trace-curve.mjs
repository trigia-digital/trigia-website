// Temporary calibration tool for HeroSweep.tsx — traces the orange curve's
// centerline directly from public/bg-curve-2.jpg pixel data (not a guessed
// bezier), then maps image coordinates -> rendered box coordinates (undoing
// background-size:cover) -> on-screen coordinates for both .hero-bg (right)
// and .hero-bg-left (left, same image mirrored via CSS scaleX(-1)).
//
// Row-wise scanning (fixed y, find x) is used instead of column-wise
// because the real curve is near-vertical for a long stretch near the top
// corners, where column-wise scanning is ambiguous (many y candidates per
// x) but row-wise is not (one clear x crossing per y).
//
// There is exactly ONE real curve per side (.hero-bg on the right,
// .hero-bg-left mirroring the same image on the left) — both cover only
// 70% of the viewport width, so their visible ranges overlap in the
// middle. Because .hero-bg-left is a pure horizontal mirror of the same
// trace, the two curves are mathematically guaranteed to coincide exactly
// at the viewport's horizontal center (screenX = 1920/2 = 960) — that's
// the natural handoff point used to join the two sides into one
// continuous path, with no synthetic/guessed connector needed.
//
// Not part of the app bundle — run with `node scripts/trace-curve.mjs`.
import sharp from "sharp";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";

const IMG_PATH = fileURLToPath(new URL("../public/bg-curve-2.jpg", import.meta.url));

// Rendered box dimensions at the 1920x1080 reference viewport, read live
// from the DOM (.hero-bg / .hero-bg-left getBoundingClientRect()):
const BOX_W = 1344;
const BOX_H = 1080;
const SECTION_W = 1920;
const CENTER_X = SECTION_W / 2; // 960

const ORANGE = { r: 255, g: 90, b: 31 };

async function main() {
  const img = sharp(IMG_PATH).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: imgW, height: imgH, channels } = info;

  const scale = Math.max(BOX_W / imgW, BOX_H / imgH);
  const offsetX = (imgW * scale - BOX_W) / 2;
  const offsetY = (imgH * scale - BOX_H) / 2;
  console.log(`image ${imgW}x${imgH}, scale=${scale.toFixed(4)}, offsetX=${offsetX.toFixed(1)}, offsetY=${offsetY.toFixed(1)}`);

  function pixelAt(x, y) {
    const idx = (y * imgW + x) * channels;
    return { r: data[idx], g: data[idx + 1], b: data[idx + 2] };
  }
  function colorDist(c) {
    return Math.sqrt((c.r - ORANGE.r) ** 2 + (c.g - ORANGE.g) ** 2 + (c.b - ORANGE.b) ** 2);
  }
  function toBox(imgX, imgY) {
    return { boxX: imgX * scale - offsetX, boxY: imgY * scale - offsetY };
  }

  // Row-wise scan across the FULL image height: for each y, find the x
  // whose color is closest to brand orange (with a brightness floor to
  // skip near-black background).
  const MAX_DIST = 90;
  const MIN_BRIGHTNESS = 35;
  const STEP = 3;
  const rows = [];
  for (let y = 0; y < imgH; y += STEP) {
    let bestX = -1;
    let bestDist = Infinity;
    for (let x = 0; x < imgW; x++) {
      const c = pixelAt(x, y);
      const brightness = (c.r + c.g + c.b) / 3;
      if (brightness < MIN_BRIGHTNESS) continue;
      const d = colorDist(c);
      if (d < bestDist) {
        bestDist = d;
        bestX = x;
      }
    }
    if (bestX >= 0 && bestDist < MAX_DIST) {
      rows.push({ imgY: y, imgX: bestX, dist: bestDist });
    }
  }
  console.log(`raw row matches: ${rows.length} (of ${Math.ceil(imgH / STEP)} rows scanned)`);

  // Outlier rejection: reject points whose x deviates far from the local
  // median of nearby rows (handles the anti-aliased/competing-highlight
  // false matches found near the steep top bend).
  const WINDOW = 9;
  const clean = [];
  for (let i = 0; i < rows.length; i++) {
    const lo = Math.max(0, i - WINDOW);
    const hi = Math.min(rows.length, i + WINDOW + 1);
    const neighborXs = [];
    for (let j = lo; j < hi; j++) if (j !== i) neighborXs.push(rows[j].imgX);
    neighborXs.sort((a, b) => a - b);
    const median = neighborXs[Math.floor(neighborXs.length / 2)];
    if (Math.abs(rows[i].imgX - median) < 60) {
      clean.push(rows[i]);
    }
  }
  console.log(`after outlier rejection: ${clean.length}`);

  // Convert to screen coords for both sides.
  const withScreen = clean.map((p) => {
    const { boxX, boxY } = toBox(p.imgX, p.imgY);
    return {
      imgX: p.imgX,
      imgY: p.imgY,
      boxY,
      boxX,
      screenXRight: (SECTION_W - BOX_W) + boxX,
      screenXLeft: BOX_W - boxX,
    };
  });

  // Only rows whose box_y is >= 0 are actually visible on screen at all
  // (rows above that are cropped off by background-size:cover). We keep
  // NATURAL scan order (imgY ascending) rather than re-sorting by x: the
  // curve is near-vertical for a long stretch near the top corner (a tight
  // "hook"), so sorting by x would scramble points from different y's that
  // happen to land at similar x, breaking continuity. Natural order is
  // already a valid continuous walk along the real curve.
  const visible = withScreen.filter((p) => p.boxY >= -20);
  console.log(`visible on screen: ${visible.length}`);

  // The hook's peak (true corner point) is where screenXRight is maximal.
  let peakIdx = 0;
  for (let i = 1; i < visible.length; i++) {
    if (visible[i].screenXRight > visible[peakIdx].screenXRight) peakIdx = i;
  }
  console.log(`peak at index ${peakIdx}/${visible.length}, screenXRight=${visible[peakIdx].screenXRight.toFixed(0)}, boxY=${visible[peakIdx].boxY.toFixed(0)}`);

  // Walk forward from the peak (natural order = continuous walk along the
  // curve) until screenXRight crosses the viewport center — this is the
  // exact point where the mirrored left curve passes through too.
  let centerIdx = visible.length - 1;
  for (let i = peakIdx; i < visible.length; i++) {
    if (visible[i].screenXRight <= CENTER_X) {
      centerIdx = i;
      break;
    }
  }
  const centerPoint = visible[centerIdx];
  console.log(`center handoff at index ${centerIdx}, screenXRight=${centerPoint.screenXRight.toFixed(1)}, boxY=${centerPoint.boxY.toFixed(1)}`);

  // Right segment: peak -> center (natural order, already the correct
  // direction: starts at the true right corner, moves inward to center).
  const rightRaw = visible.slice(peakIdx, centerIdx + 1).map((p) => ({ x: p.screenXRight, y: p.boxY }));

  // Left segment: the SAME underlying points mapped through the mirrored
  // formula, then reversed so the path continues center -> left corner.
  const leftRaw = visible.slice(peakIdx, centerIdx + 1).map((p) => ({ x: p.screenXLeft, y: p.boxY })).reverse();

  console.log(`right raw: ${rightRaw.length} points, x [${rightRaw[rightRaw.length - 1].x.toFixed(0)}, ${rightRaw[0].x.toFixed(0)}]`);
  console.log(`left raw: ${leftRaw.length} points, x [${leftRaw[0].x.toFixed(0)}, ${leftRaw[leftRaw.length - 1].x.toFixed(0)}]`);

  // De-duplicate/collapse points extremely close together (dense sampling
  // near the shallow, slow-moving parts of the curve can bunch up).
  function dedupe(pts) {
    const out = [];
    for (const p of pts) {
      const last = out[out.length - 1];
      if (!last || Math.hypot(last.x - p.x, last.y - p.y) > 2) out.push(p);
    }
    return out;
  }
  const rightD = dedupe(rightRaw);
  const leftD = dedupe(leftRaw);

  const combined = [...rightD, ...leftD];

  // Thin the dense real-trace sections for embedding as a literal array in
  // the component — keep a point only if it's at least MIN_GAP away from
  // the last kept point (always keep the first/last of the whole path).
  const MIN_GAP = 9;
  const path = [combined[0]];
  for (let i = 1; i < combined.length - 1; i++) {
    const last = path[path.length - 1];
    if (Math.hypot(combined[i].x - last.x, combined[i].y - last.y) >= MIN_GAP) {
      path.push(combined[i]);
    }
  }
  path.push(combined[combined.length - 1]);

  console.log(`final path points: ${path.length} (thinned from ${combined.length})`);
  console.log("first 6:", path.slice(0, 6).map((p) => `(${p.x.toFixed(0)},${p.y.toFixed(0)})`).join(" "));
  console.log("around handoff:", path.slice(rightD.length - 3, rightD.length + 3).map((p) => `(${p.x.toFixed(0)},${p.y.toFixed(0)})`).join(" "));
  console.log("last 6:", path.slice(-6).map((p) => `(${p.x.toFixed(0)},${p.y.toFixed(0)})`).join(" "));

  const ys = path.map((p) => p.y);
  console.log(`y range: ${Math.min(...ys).toFixed(0)} to ${Math.max(...ys).toFixed(0)}`);

  writeFileSync(
    fileURLToPath(new URL("../scripts/traced-curve-points.json", import.meta.url)),
    JSON.stringify(path, null, 2)
  );
  console.log("wrote scripts/traced-curve-points.json");
}

main();
