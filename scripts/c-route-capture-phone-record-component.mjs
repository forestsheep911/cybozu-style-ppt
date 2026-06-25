import { createServer } from "node:http";
import { mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runDir = path.join(rootDir, "outputs", "c-web-first-phone-record");
const webDir = path.join(runDir, "web");
const componentDir = path.join(runDir, "components");
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url ?? "/", "http://127.0.0.1");
      const pathname = decodeURIComponent(url.pathname === "/" ? "/component-call-board.html" : url.pathname);
      const filePath = path.normalize(path.join(webDir, pathname));
      if (!filePath.startsWith(webDir)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const body = await readFile(filePath);
      const type = path.extname(filePath) === ".css" ? "text/css; charset=utf-8" : "text/html; charset=utf-8";
      res.writeHead(200, { "Content-Type": type });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function main() {
  await mkdir(componentDir, { recursive: true });
  const executablePath = existsSync(chromePath) ? chromePath : edgePath;
  const { server, port } = await startServer();
  const browser = await chromium.launch({ executablePath, headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 620 }, deviceScaleFactor: 1, omitBackground: true });
  try {
    await page.goto(`http://127.0.0.1:${port}/component-call-board.html`, { waitUntil: "networkidle" });
    const output = path.join(componentDir, "call-record-board.png");
    await page.screenshot({ path: output, omitBackground: true });
    console.log(`component=${output}`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
