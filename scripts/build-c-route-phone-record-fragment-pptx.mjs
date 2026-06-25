import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "c-web-first-phone-record");
const fragmentsDir = path.join(runDir, "screenshots", "fragments");
const distDir = path.join(runDir, "dist");

async function main() {
  const files = (await readdir(fragmentsDir)).filter((file) => file.endsWith(".png")).sort();
  const pptx = new pptxgen();
  pptx.layout = "LAYOUT_16x9";
  pptx.author = "cybozu-style-ppt";
  pptx.company = "cybozu-style-ppt";
  pptx.subject = "C-fragment-export phone record prototype";
  pptx.title = "C-fragment-export phone record prototype";
  pptx.lang = "en-US";

  for (const file of files) {
    const slide = pptx.addSlide();
    slide.addImage({ path: path.join(fragmentsDir, file), x: 0, y: 0, w: 10, h: 5.625 });
    slide.addNotes(`C-fragment-export: screenshot state ${file}.`);
  }

  const output = path.join(distDir, "c-fragment-export-phone-record.pptx");
  await pptx.writeFile({ fileName: output });
  await writeFile(path.join(distDir, "fragment-export-manifest.json"), `${JSON.stringify({ output, slideCount: files.length, files }, null, 2)}\n`, "utf8");
  console.log(`cFragmentExport=${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
