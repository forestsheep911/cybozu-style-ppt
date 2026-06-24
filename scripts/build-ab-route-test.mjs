import { mkdir, writeFile, readdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "ab-route-test-kintone-loop");
const distDir = path.join(runDir, "dist");
const generatedDir = path.join(runDir, "assets", "generated-slides");
const ryoImageDir = path.join(rootDir, "plugins", "cybozu-style-ppt", "assets", "source-decks", "ryo-materials-26-media", "ryo-materials-26", "images");

const C = {
  yellow: "F8C400",
  yellowDeep: "E0A900",
  yellowPale: "FFF4CC",
  cream: "FFF9E8",
  ink: "17202A",
  gray700: "4A5568",
  gray500: "8A94A6",
  gray300: "D9DEE7",
  gray200: "EEF1F5",
  gray100: "F6F8FA",
  white: "FFFFFF",
  teal: "21A6B7",
  green: "4BAE65",
  orange: "F19A2A",
  red: "E65A4F",
  blue: "3B82C4",
};

const S = {
  rect: "rect",
  roundRect: "roundRect",
  line: "line",
  ellipse: "ellipse",
  rightArrow: "rightArrow",
  arc: "arc",
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
    breakLine: false,
    fit: "shrink",
    ...opts,
  });
}

function addChrome(slide, page) {
  slide.background = { color: C.white };
  slide.addShape(S.rect, { x: 0, y: 0.05, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0, y: 5.48, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, `A-${String(page).padStart(2, "0")}`, { x: 8.82, y: 5.2, w: 0.55, h: 0.13, fontSize: 7, color: C.gray500, align: "right", fontFace: font.body });
}

function addPill(slide, text, x, y, w, fill = C.yellow) {
  slide.addShape(S.roundRect, { x, y, w, h: 0.28, rectRadius: 0.08, fill: { color: fill }, line: { color: fill } });
  addText(slide, text, { x: x + 0.1, y: y + 0.09, w: w - 0.2, h: 0.08, fontSize: 6.5, bold: true, align: "center", color: fill === C.yellow ? C.ink : C.white });
}

function addImageContain(slide, file, { x, y, w, h }) {
  slide.addImage({ path: path.join(ryoImageDir, file), x, y, w, h });
}

function addAsset(slide, file, x, y, w, h) {
  slide.addImage({ path: path.join(ryoImageDir, file), x, y, w, h });
}

function addCard(slide, { x, y, w, h, title, body, color = C.yellow }) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
  slide.addShape(S.rect, { x, y, w: 0.08, h, fill: { color }, line: { color } });
  addText(slide, title, { x: x + 0.28, y: y + 0.18, w: w - 0.44, h: 0.18, fontSize: 10.5, bold: true });
  addText(slide, body, { x: x + 0.28, y: y + 0.5, w: w - 0.44, h: h - 0.62, fontSize: 7.4, color: C.gray700 });
}

function addLoopNode(slide, { label, x, y, color, icon }) {
  slide.addShape(S.ellipse, { x, y, w: 0.66, h: 0.66, fill: { color }, line: { color } });
  if (icon) addAsset(slide, icon, x + 0.15, y + 0.15, 0.36, 0.36);
  addText(slide, label, { x: x - 0.25, y: y + 0.83, w: 1.15, h: 0.12, fontSize: 7.2, bold: true, align: "center" });
}

function buildRouteA() {
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "cybozu-style-ppt";
  pptx.company = "cybozu-style-ppt";
  pptx.subject = "Route A test deck using editable structure and curated assets";
  pptx.title = "Route A test - kintone field feedback loop";
  pptx.lang = "en-US";
  pptx.theme = { headFontFace: font.head, bodyFontFace: font.body, lang: "en-US" };

  {
    const slide = pptx.addSlide();
    addChrome(slide, 1);
    addPill(slide, "ROUTE A / EDITABLE", 0.72, 0.78, 1.45);
    addText(slide, "From field feedback to improvement loop", { x: 0.72, y: 1.2, w: 5.2, h: 0.74, fontFace: font.head, fontSize: 27, bold: true });
    addText(slide, "Same Text Lock as Route B. This version keeps copy, arrows, cards, and loop structure editable, while people and helper visuals come from the curated asset source.", { x: 0.75, y: 2.28, w: 4.85, h: 0.55, fontSize: 10.5, color: C.gray700 });
    addAsset(slide, "image219.png", 6.25, 1.35, 0.82, 1.45);
    addAsset(slide, "image230.png", 7.18, 1.72, 1.12, 0.95);
    addAsset(slide, "image187.png", 8.05, 1.36, 0.9, 1.12);
    slide.addShape(S.roundRect, { x: 6.0, y: 3.15, w: 3.18, h: 0.72, rectRadius: 0.16, fill: { color: C.yellowPale }, line: { color: C.yellow } });
    addText(slide, "field input -> approval -> notice -> summary", { x: 6.22, y: 3.42, w: 2.74, h: 0.12, fontSize: 7.8, bold: true, align: "center" });
    slide.addNotes("Route A note: editable PPT structure with curated raster assets for people/helper visuals.");
  }

  {
    const slide = pptx.addSlide();
    addChrome(slide, 2);
    addPill(slide, "PAIN", 0.72, 0.78, 0.72, C.orange);
    addText(slide, "Separate updates hide the pattern", { x: 0.72, y: 1.18, w: 5.4, h: 0.42, fontFace: font.head, fontSize: 23, bold: true });
    addAsset(slide, "image189.png", 0.88, 2.05, 1.12, 1.12);
    addCard(slide, { x: 2.35, y: 1.92, w: 1.8, h: 1.1, title: "Paper", body: "Issue details stay local.", color: C.gray500 });
    addCard(slide, { x: 4.35, y: 2.72, w: 1.8, h: 1.1, title: "Spreadsheet", body: "Trends require manual work.", color: C.teal });
    addCard(slide, { x: 6.35, y: 1.92, w: 1.8, h: 1.1, title: "Message", body: "Follow-up gets separated.", color: C.orange });
    slide.addShape(S.line, { x: 2.05, y: 2.55, w: 6.45, h: 0.2, line: { color: C.gray300, width: 1.2, dash: "dash" } });
    addText(slide, "Each update exists, but the improvement signal is fragmented.", { x: 2.38, y: 4.35, w: 5.5, h: 0.2, fontSize: 10.5, bold: true, color: C.gray700, align: "center" });
    slide.addNotes("Route A note: no drawn people; stress character is a source asset, surrounding structure is editable.");
  }

  {
    const slide = pptx.addSlide();
    addChrome(slide, 3);
    addPill(slide, "SOLUTION", 0.72, 0.78, 1.0, C.green);
    addText(slide, "One app connects the loop", { x: 0.72, y: 1.18, w: 4.4, h: 0.42, fontFace: font.head, fontSize: 23, bold: true });
    addText(slide, "Input -> Approval -> Notice -> Summary", { x: 0.75, y: 1.75, w: 3.5, h: 0.18, fontSize: 10, color: C.gray700 });
    const nodes = [
      { label: "Input", x: 2.1, y: 2.1, color: C.yellow, icon: "image61.png" },
      { label: "Approval", x: 4.6, y: 1.35, color: C.green, icon: "image95.png" },
      { label: "Notice", x: 6.85, y: 2.1, color: C.teal, icon: "image49.png" },
      { label: "Summary", x: 4.6, y: 3.08, color: C.orange, icon: "image119.png" },
    ];
    nodes.forEach((node) => addLoopNode(slide, node));
    slide.addShape(S.rightArrow, { x: 3.18, y: 1.98, w: 0.78, h: 0.22, rotate: 340, fill: { color: C.yellowDeep }, line: { color: C.yellowDeep } });
    slide.addShape(S.rightArrow, { x: 5.92, y: 1.98, w: 0.78, h: 0.22, rotate: 25, fill: { color: C.yellowDeep }, line: { color: C.yellowDeep } });
    slide.addShape(S.rightArrow, { x: 5.92, y: 3.08, w: 0.78, h: 0.22, rotate: 155, fill: { color: C.yellowDeep }, line: { color: C.yellowDeep } });
    slide.addShape(S.rightArrow, { x: 3.18, y: 3.08, w: 0.78, h: 0.22, rotate: 200, fill: { color: C.yellowDeep }, line: { color: C.yellowDeep } });
    addAsset(slide, "image187.png", 8.15, 3.45, 0.72, 0.92);
    addText(slide, "The visible loop is editable; the helper is a curated raster asset.", { x: 1.72, y: 4.68, w: 6.7, h: 0.12, fontSize: 7.5, color: C.gray500, align: "center" });
    slide.addNotes("Route A note: loop labels/arrows/icons remain editable objects; helper is an image asset.");
  }

  {
    const slide = pptx.addSlide();
    addChrome(slide, 4);
    addPill(slide, "CONTINUE", 0.72, 0.78, 1.05);
    addText(slide, "Every small fix leaves a trace", { x: 0.72, y: 1.18, w: 4.9, h: 0.42, fontFace: font.head, fontSize: 23, bold: true });
    addText(slide, "Visible history makes it easier to review, reuse, and expand successful changes across teams.", { x: 0.75, y: 1.78, w: 4.6, h: 0.35, fontSize: 10.5, color: C.gray700 });
    ["Review", "Reuse", "Expand"].forEach((label, index) => {
      const x = 1.1 + index * 2.2;
      slide.addShape(S.ellipse, { x, y: 3.0, w: 0.54, h: 0.54, fill: { color: [C.yellow, C.teal, C.green][index] }, line: { color: [C.yellow, C.teal, C.green][index] } });
      addText(slide, String(index + 1), { x, y: 3.16, w: 0.54, h: 0.1, fontSize: 8, bold: true, color: C.white, align: "center" });
      addText(slide, label, { x: x - 0.32, y: 3.76, w: 1.18, h: 0.12, fontSize: 8.2, bold: true, align: "center" });
      if (index < 2) slide.addShape(S.line, { x: x + 0.72, y: 3.27, w: 1.2, h: 0, line: { color: C.yellowDeep, width: 1.3, endArrowType: "triangle" } });
    });
    addAsset(slide, "image220.png", 7.0, 2.42, 1.05, 1.35);
    addAsset(slide, "image188.png", 8.0, 2.18, 0.95, 1.42);
    slide.addShape(S.roundRect, { x: 0.98, y: 4.58, w: 7.65, h: 0.36, rectRadius: 0.12, fill: { color: C.yellowPale }, line: { color: C.yellowPale } });
    addText(slide, "Next action: choose one field report and make the loop visible.", { x: 1.22, y: 4.72, w: 7.18, h: 0.08, fontSize: 7.3, bold: true, align: "center" });
    slide.addNotes("Route A note: closing structure is editable; positive people/helper visuals use source assets.");
  }

  return pptx;
}

async function buildRouteBContainer({ editableLogoOverlay = false } = {}) {
  const files = ["00_cover.png", "01_pain.png", "02_solution.png", "03_continue.png"];
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "cybozu-style-ppt";
  pptx.company = "cybozu-style-ppt";
  pptx.subject = "Route B test deck using generated full-slide bitmaps";
  pptx.title = "Route B test - kintone field feedback loop";
  pptx.lang = "en-US";
  for (const [index, file] of files.entries()) {
    const slide = pptx.addSlide();
    slide.background = { color: C.white };
    const imagePath = editableLogoOverlay && file === "01_pain.png"
      ? path.join(generatedDir, "01_pain-before-logo-overlay.png")
      : path.join(generatedDir, file);
    if (!existsSync(imagePath)) throw new Error(`Missing generated Route B image: ${imagePath}`);
    slide.addImage({ path: imagePath, x: 0, y: 0, w: 10, h: 5.625 });
    if (editableLogoOverlay && index === 1) {
      slide.addImage({
        path: path.join(ryoImageDir, "image10.png"),
        x: 8.5,
        y: 0.36,
        w: 0.95,
        h: 0.275,
      });
    }
    slide.addNotes("Route B note: this slide is a generated full-slide bitmap; visible content is not natively editable.");
  }
  return pptx;
}

async function copyIfExists(src, dest) {
  if (existsSync(src)) await copyFile(src, dest);
}

async function main() {
  await mkdir(distDir, { recursive: true });
  await mkdir(generatedDir, { recursive: true });

  const routeAPath = path.join(distDir, "route-a-editable-kintone-loop.pptx");
  const routeA = buildRouteA();
  await routeA.writeFile({ fileName: routeAPath });

  const expectedB = ["00_cover.png", "01_pain.png", "02_solution.png", "03_continue.png"].every((file) => existsSync(path.join(generatedDir, file)));
  let routeBPath = null;
  let routeBHybridPath = null;
  if (expectedB) {
    routeBPath = path.join(distDir, "route-b-image-kintone-loop.pptx");
    const routeB = await buildRouteBContainer();
    await routeB.writeFile({ fileName: routeBPath });
    if (existsSync(path.join(generatedDir, "01_pain-before-logo-overlay.png"))) {
      routeBHybridPath = path.join(distDir, "route-b-hybrid-logo-overlay-kintone-loop.pptx");
      const routeBHybrid = await buildRouteBContainer({ editableLogoOverlay: true });
      await routeBHybrid.writeFile({ fileName: routeBHybridPath });
    }
  }

  const manifest = {
    theme: "kintone field feedback improvement loop",
    slideCount: 4,
    sharedInputs: ["work/text-lock.md", "work/storyboard.md"],
    routeA: {
      output: routeAPath,
      rule: "Editable PPT structure; people/helper/object visuals use curated raster assets, not primitive shape drawings.",
      sourceAssets: ["RYO26-189", "RYO26-187", "RYO26-188", "RYO26-219", "RYO26-220", "RYO26-230"],
    },
    routeB: {
      output: routeBPath,
      rule: "Generated full-slide bitmaps; recurring characters may be visually derived but should remain recognizable.",
      expectedImages: ["assets/generated-slides/00_cover.png", "assets/generated-slides/01_pain.png", "assets/generated-slides/02_solution.png", "assets/generated-slides/03_continue.png"],
    },
    routeBHybrid: {
      output: routeBHybridPath,
      rule: "Generated full-slide bitmap background plus separate editable PPT image overlay for identity-locked logo placement.",
      editableOverlays: routeBHybridPath ? [{ slide: 2, asset: "RYO26-242 / image10.png", role: "cybozu logo corner mark" }] : [],
    },
  };
  await writeFile(path.join(distDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`routeA=${routeAPath}`);
  if (routeBPath) console.log(`routeB=${routeBPath}`);
  else console.log("routeB=pending generated images");
  if (routeBHybridPath) console.log(`routeBHybrid=${routeBHybridPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
