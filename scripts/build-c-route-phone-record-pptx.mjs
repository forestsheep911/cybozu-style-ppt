import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "c-web-first-phone-record");
const screenshotsDir = path.join(runDir, "screenshots");
const fullScreenshotsDir = path.join(screenshotsDir, "full");
const backgroundScreenshotsDir = path.join(screenshotsDir, "backgrounds");
const distDir = path.join(runDir, "dist");
const logoPath = path.join(runDir, "web", "assets", "cybozu-logo.png");

const slides = [
  {
    screenshot: "00_pain.png",
    title: "Phone calls disappear when records stay on paper.",
    body: "Details are written quickly, follow-up is handled by memory, and managers cannot see the trend.",
  },
  {
    screenshot: "01_system.png",
    title: "kintone turns every call into a shared record.",
    body: "Caller, topic, status, owner, and next action sit in one visible table.",
  },
  {
    screenshot: "02_outcome.png",
    title: "Follow-up gets easier when the team sees the same history.",
    body: "Open items, resolved calls, and repeated issues become visible across the team.",
  },
];

const C = {
  ink: "17202A",
  gray700: "4A5568",
  gray500: "6B7280",
  white: "FFFFFF",
  yellow: "F8C400",
  yellowDeep: "D89B00",
};

const font = { head: "Aptos Display", body: "Aptos" };

function addText(slide, text, opts) {
  slide.addText(text, {
    fontFace: font.body,
    color: C.ink,
    margin: 0,
    fit: "shrink",
    breakLine: false,
    ...opts,
  });
}

function createBaseDeck(title) {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "cybozu-style-ppt";
  pptx.company = "cybozu-style-ppt";
  pptx.subject = title;
  pptx.title = title;
  pptx.lang = "en-US";
  pptx.theme = { headFontFace: font.head, bodyFontFace: font.body, lang: "en-US" };
  return pptx;
}

function addHybridOverlay(slide, spec, index) {
  slide.addShape("rect", {
    x: 0.46,
    y: 0.48,
    w: 4.92,
    h: 1.76,
    fill: { color: C.white, transparency: 8 },
    line: { color: C.white, transparency: 100 },
  });
  slide.addShape("rect", {
    x: 0.46,
    y: 0.48,
    w: 0.08,
    h: 1.76,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  addText(slide, spec.title, {
    x: 0.72,
    y: 0.77,
    w: 4.25,
    h: 0.7,
    fontFace: font.head,
    fontSize: 22.5,
    bold: true,
  });
  addText(slide, spec.body, {
    x: 0.74,
    y: 1.62,
    w: 4.24,
    h: 0.34,
    fontSize: 9.6,
    color: C.gray700,
  });
  slide.addImage({ path: logoPath, x: 8.42, y: 0.36, w: 1.08, h: 0.31 });
  addText(slide, `C-HYBRID ${String(index + 1).padStart(2, "0")}`, {
    x: 8.14,
    y: 5.12,
    w: 1.28,
    h: 0.12,
    fontSize: 6.5,
    color: C.gray500,
    bold: true,
    align: "right",
  });
  slide.addShape("line", {
    x: 0.5,
    y: 5.22,
    w: 8.9,
    h: 0,
    line: { color: C.yellowDeep, width: 1.1, transparency: 10 },
  });
}

async function main() {
  await mkdir(distDir, { recursive: true });

  const exportDeck = createBaseDeck("C-export phone record prototype");
  const hybridDeck = createBaseDeck("C-hybrid-export phone record prototype");

  slides.forEach((spec, index) => {
    const fullScreenshotPath = path.join(fullScreenshotsDir, spec.screenshot);
    const backgroundScreenshotPath = path.join(backgroundScreenshotsDir, spec.screenshot);
    if (!existsSync(fullScreenshotPath)) throw new Error(`Missing full screenshot: ${fullScreenshotPath}`);
    if (!existsSync(backgroundScreenshotPath)) throw new Error(`Missing background screenshot: ${backgroundScreenshotPath}`);

    const exportSlide = exportDeck.addSlide();
    exportSlide.addImage({ path: fullScreenshotPath, x: 0, y: 0, w: 10, h: 5.625 });
    exportSlide.addNotes("C-export: this slide is a full-slide screenshot from the Reveal.js browser deck.");

    const hybridSlide = hybridDeck.addSlide();
    hybridSlide.addImage({ path: backgroundScreenshotPath, x: 0, y: 0, w: 10, h: 5.625 });
    addHybridOverlay(hybridSlide, spec, index);
    hybridSlide.addNotes("C-hybrid-export: screenshot background from Reveal.js plus editable PPT title/logo/page overlays.");
  });

  const exportPath = path.join(distDir, "c-export-phone-record.pptx");
  const hybridPath = path.join(distDir, "c-hybrid-export-phone-record.pptx");
  await exportDeck.writeFile({ fileName: exportPath });
  await hybridDeck.writeFile({ fileName: hybridPath });

  const manifest = {
    route: "C / web-first",
    modes: {
      live: "outputs/c-web-first-phone-record/web/index.html",
      cExport: "outputs/c-web-first-phone-record/dist/c-export-phone-record.pptx",
      cHybridExport: "outputs/c-web-first-phone-record/dist/c-hybrid-export-phone-record.pptx",
    },
    source: "Reveal.js HTML/CSS/JS rendered to screenshots",
    screenshots: slides.map((slide) => `outputs/c-web-first-phone-record/screenshots/full/${slide.screenshot}`),
    hybridBackgrounds: slides.map((slide) => `outputs/c-web-first-phone-record/screenshots/backgrounds/${slide.screenshot}`),
    hybridEditableOverlays: ["title", "support copy", "cybozu logo", "page mark", "bottom rule"],
  };
  await writeFile(path.join(distDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`cExport=${exportPath}`);
  console.log(`cHybridExport=${hybridPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
