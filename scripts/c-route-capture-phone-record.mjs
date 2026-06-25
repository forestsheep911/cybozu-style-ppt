import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "c-web-first-phone-record");
const webDir = path.join(runDir, "web");
const screenshotsDir = path.join(runDir, "screenshots");
const fullDir = path.join(screenshotsDir, "full");
const backgroundsDir = path.join(screenshotsDir, "backgrounds");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

const slides = [
  { hash: "/0", file: "00_pain.png" },
  { hash: "/1", file: "01_system.png" },
  { hash: "/2", file: "02_outcome.png" },
];

const mime = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
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

async function revealAllFragments(page) {
  await page.evaluate(() => {
    document.querySelectorAll(".present .fragment").forEach((element) => {
      element.classList.add("visible");
      element.classList.remove("current-fragment");
    });
  });
  await page.waitForTimeout(250);
}

async function main() {
  await mkdir(fullDir, { recursive: true });
  await mkdir(backgroundsDir, { recursive: true });

  const executablePath = existsSync(chromePath) ? chromePath : edgePath;
  const { server, port } = await startServer();
  const browser = await chromium.launch({ executablePath, headless: true });

  try {
    for (const slide of slides) {
      const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
      const url = `http://127.0.0.1:${port}/index.html#${slide.hash}`;
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(450);
      await page.addStyleTag({ content: ".reveal .controls, .reveal .progress { display: none !important; }" });
      await revealAllFragments(page);
      await page.screenshot({ path: path.join(fullDir, slide.file), fullPage: false });
      await page.addStyleTag({
        content: ".copy-block, .brand-slot, .page-mark { display: none !important; }",
      });
      await page.screenshot({ path: path.join(backgroundsDir, slide.file), fullPage: false });
      console.log(`fullScreenshot=${path.join(fullDir, slide.file)}`);
      console.log(`backgroundScreenshot=${path.join(backgroundsDir, slide.file)}`);
      await page.close();
    }
    console.log(`liveUrl=http://127.0.0.1:${port}/index.html`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
