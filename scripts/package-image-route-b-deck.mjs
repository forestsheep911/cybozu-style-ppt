import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = process.env.IMAGE_ROUTE_B_RUN_DIR
  ? path.resolve(rootDir, process.env.IMAGE_ROUTE_B_RUN_DIR)
  : path.join(rootDir, "outputs", "b-route-whole-image-kintone");
const slideDir = path.join(runDir, "assets", "generated-slides");
const storyboardPath = path.join(runDir, "work", "storyboard.md");
const distDir = path.join(runDir, "dist");
const outPath = process.env.IMAGE_ROUTE_B_DECK_PATH
  ? path.resolve(rootDir, process.env.IMAGE_ROUTE_B_DECK_PATH)
  : path.join(distDir, "cybozu-kintone-loop-b-whole-image.pptx");

function parseStoryBlocks(markdown) {
  const blocks = new Map();
  const chunks = markdown.split(/\n(?=## )/g);
  for (const chunk of chunks) {
    const idMatch = chunk.match(/^##\s+([^\n]+)/m);
    if (!idMatch) continue;
    const id = idMatch[1].trim();
    const titleMatch = chunk.match(/-\s+\*\*Title\*\*:\s*(.+)/);
    const notesMatch = chunk.match(/-\s+\*\*Speaker notes\*\*:\s*(.+)/);
    const claimMatch = chunk.match(/-\s+\*\*Core claim\*\*:\s*(.+)/);
    const notes = [
      titleMatch ? `Title: ${titleMatch[1].trim()}` : null,
      claimMatch ? `Core claim: ${claimMatch[1].trim()}` : null,
      notesMatch ? `Speaker notes: ${notesMatch[1].trim()}` : null,
      "Route B note: this slide is a full-slide generated bitmap; edit the Text Lock/storyboard and regenerate, not native slide objects.",
    ].filter(Boolean);
    blocks.set(id, notes.join("\n"));
  }
  return blocks;
}

async function main() {
  await mkdir(distDir, { recursive: true });
  const storyboard = await readFile(storyboardPath, "utf8");
  const notesById = parseStoryBlocks(storyboard);
  const files = (await readdir(slideDir))
    .filter((name) => /^\d{2}_[a-z0-9_]+\.png$/i.test(name))
    .sort((a, b) => a.localeCompare(b, "en"));

  if (files.length === 0) {
    throw new Error(`No PNG slides found in ${slideDir}`);
  }

  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt";
  pres.company = "cybozu-style-ppt";
  pres.subject = "Route B image-first whole-slide deck";
  pres.title = "kintone de gyomu kaizen wo mawashi tsuzukeru";
  pres.lang = "ja-JP";
  pres.theme = {
    headFontFace: "Aptos",
    bodyFontFace: "Aptos",
    lang: "ja-JP",
  };

  for (const file of files) {
    const slide = pres.addSlide();
    const id = path.basename(file, ".png");
    slide.background = { color: "FFFFFF" };
    slide.addImage({
      path: path.join(slideDir, file),
      x: 0,
      y: 0,
      w: 10,
      h: 5.625,
    });
    const notes = notesById.get(id);
    if (notes) slide.addNotes(notes);
  }

  await pres.writeFile({ fileName: outPath });
  const manifest = {
    route: "B",
    mode: "image-first whole-slide generation",
    runDir,
    output: outPath,
    slideCount: files.length,
    slides: files,
    editableLayer: ["work/text-lock.md", "work/storyboard.md", "prompts/*.md", "PowerPoint notes"],
    pptxConstraint: "Each slide contains exactly one full-slide bitmap image; visible content is not natively editable.",
  };
  await writeFile(path.join(distDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`wrote=${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
