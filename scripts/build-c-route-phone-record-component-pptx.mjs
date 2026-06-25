import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "c-web-first-phone-record");
const componentPath = path.join(runDir, "components", "call-record-board.png");
const logoPath = path.join(runDir, "web", "assets", "cybozu-logo.png");
const output = path.join(runDir, "dist", "c-component-export-phone-record.pptx");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_16x9";
pptx.author = "cybozu-style-ppt";
pptx.company = "cybozu-style-ppt";
pptx.subject = "C-component-export phone record prototype";
pptx.title = "C-component-export phone record prototype";
pptx.lang = "en-US";

const slide = pptx.addSlide();
slide.background = { color: "FFFFFF" };
slide.addShape("rect", { x: 0, y: 0, w: 10, h: 5.625, fill: { color: "FBFCFD" }, line: { color: "FBFCFD" } });
slide.addShape("rect", { x: 0.56, y: 0.64, w: 0.08, h: 1.46, fill: { color: "F8C400" }, line: { color: "F8C400" } });
slide.addText("Web-rendered component inside a native PPT page", {
  x: 0.78,
  y: 0.74,
  w: 4.9,
  h: 0.48,
  fontFace: "Aptos Display",
  fontSize: 24,
  bold: true,
  color: "17202A",
  margin: 0,
  fit: "shrink",
});
slide.addText("The board is a PNG component rendered from HTML/CSS; title, logo, and explanatory copy stay native.", {
  x: 0.8,
  y: 1.48,
  w: 4.9,
  h: 0.24,
  fontFace: "Aptos",
  fontSize: 9.8,
  color: "4A5568",
  margin: 0,
  fit: "shrink",
});
slide.addImage({ path: logoPath, x: 8.42, y: 0.36, w: 1.08, h: 0.31 });
slide.addImage({ path: componentPath, x: 1.18, y: 2.0, w: 7.65, h: 3.35, transparency: 0 });
slide.addNotes("C-component-export: web-rendered call record board inserted as a component PNG inside a mostly native PPT page.");

await pptx.writeFile({ fileName: output });
console.log(`cComponentExport=${output}`);
