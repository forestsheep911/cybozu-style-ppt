import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "c-web-first-phone-record");
const webDir = path.join(runDir, "web");
const fragmentsDir = path.join(runDir, "screenshots", "fragments");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const slides = [
  { hash: "/0", id: "00_pain", steps: 5 },
  { hash: "/1", id: "01_system", steps: 4 },
  { hash: "/2", id: "02_outcome", steps: 4 },
];

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
]);

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const filePath = path.normalize(path.join(webDir, pathname));
      if (!filePath.startsWith(webDir)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const body = await readFile(filePath);
      res.writeHead(200, { "Content-Type": mime.get(path.extname(filePath)) ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({ server, port: address.port });
    });
  });
}

async function setFragmentStep(page, step) {
  await page.evaluate((visibleCount) => {
    const fragments = Array.from(document.querySelectorAll(".present .fragment"));
    fragments.forEach((element, index) => {
      element.classList.toggle("visible", index < visibleCount);
      element.classList.remove("current-fragment");
    });
  }, step);
  await page.waitForTimeout(220);
}

async function main() {
  await mkdir(fragmentsDir, { recursive: true });
  const executablePath = existsSync(chromePath) ? chromePath : edgePath;
  const { server, port } = await startServer();
  const browser = await chromium.launch({ executablePath, headless: true });

  try {
    for (const slide of slides) {
      for (let step = 0; step < slide.steps; step += 1) {
        const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
        await page.goto(`http://127.0.0.1:${port}/index.html#${slide.hash}`, { waitUntil: "networkidle" });
        await page.waitForTimeout(350);
        await page.addStyleTag({ content: ".reveal .controls, .reveal .progress { display: none !important; }" });
        await setFragmentStep(page, step);
        const outPath = path.join(fragmentsDir, `${slide.id}_step-${String(step).padStart(2, "0")}.png`);
        await page.screenshot({ path: outPath, fullPage: false });
        console.log(`fragment=${outPath}`);
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
