import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "c-web-first-field-feedback");
const fullDir = path.join(runDir, "screenshots", "full");
const backgroundsDir = path.join(runDir, "screenshots", "backgrounds");
const distDir = path.join(runDir, "dist");
const logoPath = path.join(runDir, "web", "assets", "cybozu-logo.png");

const slides = [
  {
    screenshot: "00_cover.png",
    title: "Turn scattered field feedback into one visible improvement loop.",
    body: "kintone collects input, approval status, notifications, and actions in one shared work system.",
  },
  {
    screenshot: "01_pain.png",
    title: "Separate updates hide the pattern.",
    body: "Each update exists, but the trend is hard to see when work stays split across tools.",
  },
  {
    screenshot: "02_solution.png",
    title: "One app connects input, approval, notice, and summary.",
    body: "The operating loop stays visible from first report to management review.",
  },
  {
    screenshot: "03_continue.png",
    title: "Every small fix leaves a trace.",
    body: "Visible history makes successful changes easier to review, reuse, and expand.",
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

function createDeck(title) {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "cybozu-style-ppt";
  pptx.company = "cybozu-style-ppt";
  pptx.subject = title;
  pptx.title = title;
  pptx.lang = "en-US";
  pptx.theme = { headFontFace: "Aptos Display", bodyFontFace: "Aptos", lang: "en-US" };
  return pptx;
}

function addText(slide, text, opts) {
  slide.addText(text, {
    fontFace: "Aptos",
    color: C.ink,
    margin: 0,
    fit: "shrink",
    breakLine: false,
    ...opts,
  });
}

function addHybridOverlay(slide, spec, index) {
  slide.addShape("rect", { x: 0.46, y: 0.48, w: 4.98, h: 1.84, fill: { color: C.white, transparency: 8 }, line: { color: C.white, transparency: 100 } });
  slide.addShape("rect", { x: 0.46, y: 0.48, w: 0.08, h: 1.84, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, spec.title, { x: 0.72, y: 0.75, w: 4.36, h: 0.78, fontFace: "Aptos Display", fontSize: 21.4, bold: true });
  addText(slide, spec.body, { x: 0.74, y: 1.66, w: 4.26, h: 0.34, fontSize: 9.2, color: C.gray700 });
  slide.addImage({ path: logoPath, x: 8.42, y: 0.36, w: 1.08, h: 0.31 });
  addText(slide, `C-HYBRID ${String(index + 1).padStart(2, "0")}`, { x: 8.14, y: 5.12, w: 1.28, h: 0.12, fontSize: 6.5, color: C.gray500, bold: true, align: "right" });
  slide.addShape("line", { x: 0.5, y: 5.22, w: 8.9, h: 0, line: { color: C.yellowDeep, width: 1.1, transparency: 10 } });
}

async function main() {
  await mkdir(distDir, { recursive: true });
  const exportDeck = createDeck("C-export field feedback loop");
  const hybridDeck = createDeck("C-hybrid-export field feedback loop");

  slides.forEach((spec, index) => {
    const fullPath = path.join(fullDir, spec.screenshot);
    const bgPath = path.join(backgroundsDir, spec.screenshot);
    if (!existsSync(fullPath)) throw new Error(`Missing full screenshot: ${fullPath}`);
    if (!existsSync(bgPath)) throw new Error(`Missing background screenshot: ${bgPath}`);

    const exportSlide = exportDeck.addSlide();
    exportSlide.addImage({ path: fullPath, x: 0, y: 0, w: 10, h: 5.625 });
    exportSlide.addNotes("C-export: full-slide screenshot from the Reveal.js field feedback deck.");

    const hybridSlide = hybridDeck.addSlide();
    hybridSlide.addImage({ path: bgPath, x: 0, y: 0, w: 10, h: 5.625 });
    addHybridOverlay(hybridSlide, spec, index);
    hybridSlide.addNotes("C-hybrid-export: web-rendered background plus editable PPT title/logo/page overlays.");
  });

  const exportPath = path.join(distDir, "c-export-field-feedback.pptx");
  const hybridPath = path.join(distDir, "c-hybrid-export-field-feedback.pptx");
  await exportDeck.writeFile({ fileName: exportPath });
  await hybridDeck.writeFile({ fileName: hybridPath });
  await writeFile(path.join(distDir, "manifest.json"), `${JSON.stringify({ route: "C / web-first", cExport: exportPath, cHybridExport: hybridPath, slideCount: slides.length }, null, 2)}\n`, "utf8");
  console.log(`cExport=${exportPath}`);
  console.log(`cHybridExport=${hybridPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
