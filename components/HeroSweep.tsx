"use client";

import { useEffect, useRef } from "react";

// Traced directly from public/bg-curve-2.jpg pixel data (see
// scripts/trace-curve.mjs — a temporary calibration tool, not part of this
// bundle) — not a hand-designed curve. Coordinates are reference pixels at
// a 1920x1080 viewport: right corner -> along the real .hero-bg curve ->
// through the exact point where it mathematically coincides with the
// mirrored .hero-bg-left curve (guaranteed at the viewport's horizontal
// center, since the left curve is a pure mirror of the same image) ->
// along the real .hero-bg-left curve -> left corner. No synthetic/guessed
// segment anywhere — every point is real curve pixel data. The path does
// pass behind the hero text at its deepest point (~y 880); this is
// intentional — HeroSweep renders at z-[1], below .hero > .wrap's z-2, so
// text stays fully legible with the glow only visible behind/around it,
// the same treatment the existing background blob already gets. Rendered
// by scaling both axes uniformly by (canvasWidth / 1920), matching how
// background-size:cover scales .hero-bg/.hero-bg-left with viewport width.
const REFERENCE_WIDTH = 1920;

const POINTS: { x: number; y: number }[] = [
  { x: 1799, y: 112.3 }, { x: 1792.3, y: 121 }, { x: 1774.1, y: 126.7 }, { x: 1787.5, y: 135.4 },
  { x: 1782.7, y: 144 }, { x: 1777, y: 152.6 }, { x: 1772.2, y: 161.3 }, { x: 1798.1, y: 285.1 },
  { x: 1791.4, y: 296.6 }, { x: 1783.7, y: 305.3 }, { x: 1792.3, y: 311 }, { x: 1776, y: 316.8 },
  { x: 1789.4, y: 319.7 }, { x: 1786.6, y: 328.3 }, { x: 1769.3, y: 334.1 }, { x: 1756.8, y: 339.8 },
  { x: 1782.7, y: 342.7 }, { x: 1755.8, y: 345.6 }, { x: 1753, y: 357.1 }, { x: 1775, y: 362.9 },
  { x: 1771.2, y: 371.5 }, { x: 1751, y: 374.4 }, { x: 1764.5, y: 377.3 }, { x: 1741.4, y: 380.2 },
  { x: 1761.6, y: 383 }, { x: 1740.5, y: 391.7 }, { x: 1761.6, y: 394.6 }, { x: 1735.7, y: 397.4 },
  { x: 1756.8, y: 403.2 }, { x: 1740.5, y: 406.1 }, { x: 1729.9, y: 409 }, { x: 1752, y: 411.8 },
  { x: 1725.1, y: 417.6 }, { x: 1744.3, y: 426.2 }, { x: 1727, y: 429.1 }, { x: 1740.5, y: 432 },
  { x: 1721.3, y: 434.9 }, { x: 1712.6, y: 440.6 }, { x: 1731.8, y: 443.5 }, { x: 1706.9, y: 449.3 },
  { x: 1723.2, y: 452.2 }, { x: 1704, y: 455 }, { x: 1698.2, y: 463.7 }, { x: 1708.8, y: 469.4 },
  { x: 1691.5, y: 478.1 }, { x: 1705.9, y: 481 }, { x: 1690.6, y: 486.7 }, { x: 1679, y: 489.6 },
  { x: 1672.3, y: 498.2 }, { x: 1681.9, y: 501.1 }, { x: 1664.6, y: 506.9 }, { x: 1677.1, y: 512.6 },
  { x: 1653.1, y: 521.3 }, { x: 1660.8, y: 529.9 }, { x: 1645.4, y: 532.8 }, { x: 1634.9, y: 538.6 },
  { x: 1626.2, y: 547.2 }, { x: 1638.7, y: 550.1 }, { x: 1615.7, y: 555.8 }, { x: 1602.2, y: 567.4 },
  { x: 1594.6, y: 573.1 }, { x: 1589.8, y: 581.8 }, { x: 1579.2, y: 587.5 }, { x: 1568.6, y: 593.3 },
  { x: 1579.2, y: 596.2 }, { x: 1568.6, y: 599 }, { x: 1556.2, y: 601.9 }, { x: 1541.8, y: 613.4 },
  { x: 1532.2, y: 622.1 }, { x: 1524.5, y: 627.8 }, { x: 1509.1, y: 633.6 }, { x: 1497.6, y: 645.1 },
  { x: 1487, y: 653.8 }, { x: 1474.6, y: 656.6 }, { x: 1465, y: 662.4 }, { x: 1449.6, y: 671 },
  { x: 1435.2, y: 679.7 }, { x: 1428.5, y: 688.3 }, { x: 1415, y: 691.2 }, { x: 1399.7, y: 699.8 },
  { x: 1389.1, y: 705.6 }, { x: 1378.6, y: 711.4 }, { x: 1368, y: 717.1 }, { x: 1357.4, y: 722.9 },
  { x: 1346.9, y: 728.6 }, { x: 1337.3, y: 734.4 }, { x: 1324.8, y: 740.2 }, { x: 1312.3, y: 745.9 },
  { x: 1301.8, y: 751.7 }, { x: 1289.3, y: 757.4 }, { x: 1277.8, y: 763.2 }, { x: 1265.3, y: 769 },
  { x: 1252.8, y: 774.7 }, { x: 1241.3, y: 780.5 }, { x: 1227.8, y: 786.2 }, { x: 1216.3, y: 792 },
  { x: 1202.9, y: 797.8 }, { x: 1190.4, y: 803.5 }, { x: 1176, y: 809.3 }, { x: 1161.6, y: 815 },
  { x: 1150.1, y: 820.8 }, { x: 1136.6, y: 826.6 }, { x: 1124.2, y: 832.3 }, { x: 1108.8, y: 838.1 },
  { x: 1090.6, y: 843.8 }, { x: 1076.2, y: 849.6 }, { x: 1066.6, y: 852.5 }, { x: 1051.2, y: 858.2 },
  { x: 1042.6, y: 861.1 }, { x: 1033.9, y: 864 }, { x: 1023.4, y: 866.9 }, { x: 1012.8, y: 869.8 },
  { x: 1003.2, y: 872.6 }, { x: 989.8, y: 875.5 }, { x: 967.7, y: 881.3 }, { x: 955.2, y: 884.2 },
  { x: 964.8, y: 884.2 }, { x: 952.3, y: 881.3 }, { x: 937.9, y: 878.4 }, { x: 916.8, y: 872.6 },
  { x: 907.2, y: 869.8 }, { x: 896.6, y: 866.9 }, { x: 886.1, y: 864 }, { x: 877.4, y: 861.1 },
  { x: 868.8, y: 858.2 }, { x: 853.4, y: 852.5 }, { x: 843.8, y: 849.6 }, { x: 829.4, y: 843.8 },
  { x: 811.2, y: 838.1 }, { x: 802.6, y: 835.2 }, { x: 790.1, y: 829.4 }, { x: 777.6, y: 823.7 },
  { x: 764.2, y: 817.9 }, { x: 751.7, y: 812.2 }, { x: 737.3, y: 806.4 }, { x: 722.9, y: 800.6 },
  { x: 711.4, y: 794.9 }, { x: 697.9, y: 789.1 }, { x: 678.7, y: 780.5 }, { x: 667.2, y: 774.7 },
  { x: 654.7, y: 769 }, { x: 642.2, y: 763.2 }, { x: 630.7, y: 757.4 }, { x: 618.2, y: 751.7 },
  { x: 607.7, y: 745.9 }, { x: 595.2, y: 740.2 }, { x: 582.7, y: 734.4 }, { x: 573.1, y: 728.6 },
  { x: 562.6, y: 722.9 }, { x: 552, y: 717.1 }, { x: 541.4, y: 711.4 }, { x: 530.9, y: 705.6 },
  { x: 520.3, y: 699.8 }, { x: 509.8, y: 697 }, { x: 491.5, y: 688.3 }, { x: 484.8, y: 679.7 },
  { x: 472.3, y: 676.8 }, { x: 457, y: 668.2 }, { x: 442.6, y: 659.5 }, { x: 433, y: 653.8 },
  { x: 422.4, y: 648 }, { x: 412.8, y: 642.2 }, { x: 397.4, y: 630.7 }, { x: 387.8, y: 622.1 },
  { x: 378.2, y: 613.4 }, { x: 363.8, y: 610.6 }, { x: 351.4, y: 599 }, { x: 340.8, y: 596.2 },
  { x: 351.4, y: 593.3 }, { x: 340.8, y: 590.4 }, { x: 330.2, y: 581.8 }, { x: 321.6, y: 576 },
  { x: 317.8, y: 567.4 }, { x: 302.4, y: 564.5 }, { x: 288, y: 553 }, { x: 285.1, y: 544.3 },
  { x: 270.7, y: 535.7 }, { x: 259.2, y: 529.9 }, { x: 273.6, y: 527 }, { x: 247.7, y: 518.4 },
  { x: 257.3, y: 509.8 }, { x: 243.8, y: 504 }, { x: 234.2, y: 495.4 }, { x: 229.4, y: 486.7 },
  { x: 216, y: 483.8 }, { x: 228.5, y: 478.1 }, { x: 209.3, y: 475.2 }, { x: 219.8, y: 466.6 },
  { x: 213.1, y: 457.9 }, { x: 196.8, y: 452.2 }, { x: 213.1, y: 449.3 }, { x: 188.2, y: 446.4 },
  { x: 207.4, y: 440.6 }, { x: 198.7, y: 434.9 }, { x: 179.5, y: 432 }, { x: 193, y: 429.1 },
  { x: 175.7, y: 426.2 }, { x: 195.8, y: 423.4 }, { x: 169, y: 414.7 }, { x: 190.1, y: 409 },
  { x: 179.5, y: 406.1 }, { x: 163.2, y: 403.2 }, { x: 183.4, y: 400.3 }, { x: 158.4, y: 394.6 },
  { x: 179.5, y: 391.7 }, { x: 161.3, y: 388.8 }, { x: 178.6, y: 380.2 }, { x: 155.5, y: 377.3 },
  { x: 169, y: 374.4 }, { x: 148.8, y: 371.5 }, { x: 145, y: 362.9 }, { x: 171.8, y: 360 },
  { x: 166.1, y: 351.4 }, { x: 137.3, y: 342.7 }, { x: 163.2, y: 339.8 }, { x: 150.7, y: 337 },
  { x: 138.2, y: 331.2 }, { x: 131.5, y: 322.6 }, { x: 144, y: 316.8 }, { x: 128.6, y: 313.9 },
  { x: 138.2, y: 308.2 }, { x: 125.8, y: 302.4 }, { x: 122.9, y: 290.9 }, { x: 147.8, y: 164.2 },
  { x: 144, y: 155.5 }, { x: 139.2, y: 146.9 }, { x: 136.3, y: 138.2 }, { x: 147.8, y: 132.5 },
  { x: 125.8, y: 123.8 }, { x: 121, y: 112.3 },
];

// Precompute cumulative arc length once, in reference-pixel units — since
// both axes are scaled uniformly at render time, arc-length proportions
// don't change with scale.
const CUM_LENGTH: number[] = [0];
let TOTAL_LENGTH = 0;
for (let i = 1; i < POINTS.length; i++) {
  TOTAL_LENGTH += Math.hypot(POINTS[i].x - POINTS[i - 1].x, POINTS[i].y - POINTS[i - 1].y);
  CUM_LENGTH.push(TOTAL_LENGTH);
}

// Same role as FlowCanvas's bezierPoint — interpolates a point at
// progress t, but along the real traced polyline instead of a bezier.
function pointAtT(t: number) {
  const target = Math.min(1, Math.max(0, t)) * TOTAL_LENGTH;
  let i = 1;
  while (i < CUM_LENGTH.length - 1 && CUM_LENGTH[i] < target) i++;
  const segStart = CUM_LENGTH[i - 1];
  const segLen = CUM_LENGTH[i] - segStart;
  const segT = segLen === 0 ? 0 : (target - segStart) / segLen;
  const p0 = POINTS[i - 1];
  const p1 = POINTS[i];
  return { x: p0.x + (p1.x - p0.x) * segT, y: p0.y + (p1.y - p0.y) * segT };
}

export default function HeroSweep() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function render(t: number) {
      ctx!.clearRect(0, 0, w, h);

      const scale = w / REFERENCE_WIDTH;
      const p = pointAtT(t);
      const gx = p.x * scale;
      const gy = p.y * scale;
      const fade = Math.sin(t * Math.PI);

      const haloR = 60 * scale;
      const halo = ctx!.createRadialGradient(gx, gy, 0, gx, gy, haloR);
      halo.addColorStop(0, `rgba(255,160,100,${0.4 * fade})`);
      halo.addColorStop(0.5, `rgba(255,120,50,${0.18 * fade})`);
      halo.addColorStop(1, "rgba(255,90,31,0)");
      ctx!.fillStyle = halo;
      ctx!.beginPath();
      ctx!.arc(gx, gy, haloR, 0, Math.PI * 2);
      ctx!.fill();

      const coreR = 10 * scale;
      const core = ctx!.createRadialGradient(gx, gy, 0, gx, gy, coreR);
      core.addColorStop(0, `rgba(255,235,205,${fade})`);
      core.addColorStop(1, "rgba(255,90,31,0)");
      ctx!.fillStyle = core;
      ctx!.beginPath();
      ctx!.arc(gx, gy, coreR, 0, Math.PI * 2);
      ctx!.fill();
    }

    let raf = 0;

    if (prefersReduced) {
      render(0.5);
    } else {
      let glowT = 0;
      const glowSpeed = 0.00015;
      const loop = () => {
        render(glowT);
        glowT += glowSpeed * 16;
        if (glowT > 1) glowT -= 1;
        raf = requestAnimationFrame(loop);
      };
      loop();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[50vw] max-h-[960px] z-[1] pointer-events-none select-none"
      aria-hidden="true"
    />
  );
}
