import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "b-hybrid-phone-record");
const distDir = path.join(runDir, "dist");
const bgPath = path.join(runDir, "assets", "generated-backgrounds", "phone-record-bg.png");
const logoPath = path.join(
  rootDir,
  "plugins",
  "cybozu-style-ppt",
  "assets",
  "source-decks",
  "ryo-materials-26-media",
  "ryo-materials-26",
  "images",
  "image10.png",
);

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

async function main() {
  if (!existsSync(bgPath)) throw new Error(`Missing generated background: ${bgPath}`);
  if (!existsSync(logoPath)) throw new Error(`Missing logo asset: ${logoPath}`);

  await mkdir(distDir, { recursive: true });

  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "cybozu-style-ppt";
  pptx.company = "cybozu-style-ppt";
  pptx.subject = "B-hybrid phone call record management concept";
  pptx.title = "B-hybrid phone record concept";
  pptx.lang = "en-US";
  pptx.theme = { headFontFace: font.head, bodyFontFace: font.body, lang: "en-US" };

  const slide = pptx.addSlide();
  slide.background = { color: C.white };
  slide.addImage({ path: bgPath, x: 0, y: 0, w: 10, h: 5.625 });

  slide.addShape("rect", {
    x: 0.46,
    y: 0.48,
    w: 4.92,
    h: 1.72,
    fill: { color: C.white, transparency: 10 },
    line: { color: C.white, transparency: 100 },
  });
  slide.addShape("rect", {
    x: 0.46,
    y: 0.48,
    w: 0.08,
    h: 1.72,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  addText(slide, "Turn every phone call into a shared record", {
    x: 0.72,
    y: 0.77,
    w: 4.35,
    h: 0.64,
    fontFace: font.head,
    fontSize: 23.5,
    bold: true,
  });
  addText(slide, "kintone keeps call details, follow-up status, and customer context in one place.",
    {
      x: 0.74,
      y: 1.6,
      w: 4.28,
      h: 0.28,
      fontSize: 10.2,
      color: C.gray700,
    },
  );

  slide.addImage({ path: logoPath, x: 8.42, y: 0.36, w: 1.08, h: 0.31 });
  addText(slide, "B-HYBRID / PHONE RECORD", {
    x: 7.92,
    y: 5.12,
    w: 1.52,
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
  slide.addNotes("B-hybrid note: generated background uses the phone-call-record scene; title, body, logo, and page mark are editable overlays.");

  const pptxPath = path.join(distDir, "b-hybrid-phone-record.pptx");
  await pptx.writeFile({ fileName: pptxPath });

  const manifest = {
    route: "B-hybrid",
    concept: "kintone phone call record management",
    output: "outputs/b-hybrid-phone-record/dist/b-hybrid-phone-record.pptx",
    background: "outputs/b-hybrid-phone-record/assets/generated-backgrounds/phone-record-bg.png",
    editableOverlays: ["title", "support copy", "cybozu logo", "page mark", "bottom rule"],
    title: "Turn every phone call into a shared record",
    body: "kintone keeps call details, follow-up status, and customer context in one place.",
  };
  await writeFile(path.join(distDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`pptx=${pptxPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
