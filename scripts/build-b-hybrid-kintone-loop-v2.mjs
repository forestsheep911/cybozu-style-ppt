import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "b-hybrid-kintone-loop-v2");
const distDir = path.join(runDir, "dist");
const bgDir = path.join(runDir, "assets", "generated-backgrounds");
const ryoImageDir = path.join(
  rootDir,
  "plugins",
  "cybozu-style-ppt",
  "assets",
  "source-decks",
  "ryo-materials-26-media",
  "ryo-materials-26",
  "images",
);

const SLIDE_W = 10;
const SLIDE_H = 5.625;

const C = {
  ink: "17202A",
  gray700: "4A5568",
  gray500: "6B7280",
  white: "FFFFFF",
  yellow: "F8C400",
  yellowDeep: "D89B00",
};

const font = {
  head: "Aptos Display",
  body: "Aptos",
};

const slides = [
  {
    bg: "00_cover_bg.png",
    title: "From field feedback to improvement loop",
    body: "Turn scattered field feedback into one visible improvement loop.",
    note: "B-hybrid: generated scene background; title, body, logo, and page mark are editable overlays.",
  },
  {
    bg: "01_pain_bg.png",
    title: "Separate updates hide the pattern",
    body: "Paper, chat, and spreadsheets capture fragments, but not the trend.",
    note: "B-hybrid: generated pain scene with no baked-in text; editable overlays carry the locked copy.",
  },
  {
    bg: "02_solution_bg.png",
    title: "One app connects the loop",
    body: "Input, approval, notice, and summary stay connected.",
    note: "B-hybrid: generated workflow visual stays illustrative; exact words remain editable in PowerPoint.",
  },
  {
    bg: "03_continue_bg.png",
    title: "Every small fix leaves a trace",
    body: "Visible history makes it easier to review, reuse, and expand improvements.",
    note: "B-hybrid: generated closing scene; reusable customer-facing overlays remain editable.",
  },
];

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

function addHybridOverlay(slide, index, spec) {
  slide.addShape("rect", {
    x: 0.46,
    y: 0.5,
    w: 4.95,
    h: 1.58,
    fill: { color: C.white, transparency: 12 },
    line: { color: C.white, transparency: 100 },
  });
  slide.addShape("rect", {
    x: 0.46,
    y: 0.5,
    w: 0.08,
    h: 1.58,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  addText(slide, spec.title, {
    x: 0.72,
    y: 0.78,
    w: 4.25,
    h: 0.56,
    fontFace: font.head,
    fontSize: 24,
    bold: true,
  });
  addText(slide, spec.body, {
    x: 0.74,
    y: 1.52,
    w: 4.2,
    h: 0.28,
    fontSize: 10.2,
    color: C.gray700,
  });

  slide.addImage({
    path: path.join(ryoImageDir, "image10.png"),
    x: 8.42,
    y: 0.36,
    w: 1.08,
    h: 0.31,
  });

  addText(slide, `B-HYBRID ${String(index + 1).padStart(2, "0")}`, {
    x: 8.38,
    y: 5.12,
    w: 1.05,
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

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "cybozu-style-ppt";
  pptx.company = "cybozu-style-ppt";
  pptx.subject = "B-hybrid test deck with generated backgrounds and editable overlays";
  pptx.title = "B-hybrid test - kintone field feedback loop";
  pptx.lang = "en-US";
  pptx.theme = { headFontFace: font.head, bodyFontFace: font.body, lang: "en-US" };

  slides.forEach((spec, index) => {
    const bgPath = path.join(bgDir, spec.bg);
    if (!existsSync(bgPath)) throw new Error(`Missing generated background: ${bgPath}`);

    const slide = pptx.addSlide();
    slide.background = { color: C.white };
    slide.addImage({ path: bgPath, x: 0, y: 0, w: SLIDE_W, h: SLIDE_H });
    addHybridOverlay(slide, index, spec);
    slide.addNotes(spec.note);
  });

  const pptxPath = path.join(distDir, "b-hybrid-kintone-loop-v2.pptx");
  await pptx.writeFile({ fileName: pptxPath });

  const manifest = {
    theme: "kintone field feedback improvement loop",
    route: "B-hybrid",
    rule: "Generated image provides scene/background only; exact text, logo, and page marks are separate editable PowerPoint overlays.",
    slideCount: slides.length,
    output: path.relative(rootDir, pptxPath).replaceAll("\\", "/"),
    backgroundImages: slides.map((slide) => `assets/generated-backgrounds/${slide.bg}`),
    editableOverlays: [
      "title text",
      "supporting body text",
      "cybozu logo image from RYO26 source deck image10.png",
      "page mark",
      "thin bottom rule",
    ],
    textLock: "work/text-lock.md",
  };
  await writeFile(path.join(distDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`pptx=${pptxPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
