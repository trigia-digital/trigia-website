// One-off script to capture preview screenshots for the Work section case studies.
// Run with: node scripts/capture-work-screenshots.mjs
import { chromium } from "playwright";
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "work");

const targets = [
  { url: "https://rumihomespa.com", file: "rumi-home-spa.jpg" },
  { url: "https://member.rumihomespa.com", file: "rumi-inner-circle.jpg" },
  { url: "https://jocular-unicorn-44f877.netlify.app", file: "kwarran-sambit.jpg" },
];

async function main() {
  const browser = await chromium.launch();
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

  for (const { url, file } of targets) {
    console.log(`Capturing ${url} ...`);
    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    } catch (err) {
      console.warn(`  networkidle timed out for ${url}, continuing anyway: ${err.message}`);
    }
    await page.waitForTimeout(1500);

    const buffer = await page.screenshot();
    const outPath = path.join(outDir, file);
    await sharp(buffer).resize({ width: 900 }).jpeg({ quality: 80 }).toFile(outPath);
    console.log(`  saved -> public/work/${file}`);
  }

  await browser.close();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
