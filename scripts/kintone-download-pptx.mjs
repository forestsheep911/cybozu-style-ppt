import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(rootDir, ".env") });

function requireEnv(name) {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

function makeAuth() {
  const apiToken = process.env.KINTONE_API_TOKEN?.trim();
  if (apiToken) {
    return { apiToken };
  }

  const username = process.env.KINTONE_USERNAME?.trim();
  const password = process.env.KINTONE_PASSWORD?.trim();
  if (username && password) {
    return { username, password };
  }

  throw new Error("Set KINTONE_API_TOKEN, or KINTONE_USERNAME and KINTONE_PASSWORD.");
}

function safeFileName(value) {
  return value
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[. ]+$/g, "");
}

async function fileSizeIfExists(filePath) {
  try {
    return (await stat(filePath)).size;
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function main() {
  const baseUrl = requireEnv("KINTONE_BASE_URL").replace(/\/$/, "");
  const guestSpaceId = Number(requireEnv("KINTONE_GUEST_SPACE_ID"));
  const rawOutputDir = process.env.KINTONE_RAW_OUTPUT_DIR?.trim() || "data/raw/kintone";
  const sourceDir = path.resolve(rootDir, rawOutputDir);
  const manifestPath = path.join(sourceDir, "attachment-manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  const pptxItems = manifest.attachments.filter((item) => /\.pptx$/i.test(item.name));

  const client = new KintoneRestAPIClient({
    baseUrl,
    auth: makeAuth(),
    guestSpaceId,
  });

  const downloadDir = path.join(sourceDir, "pptx");
  await mkdir(downloadDir, { recursive: true });

  const downloaded = [];
  const skipped = [];
  const failed = [];

  for (const [index, item] of pptxItems.entries()) {
    const fileName = safeFileName(
      `record-${item.recordId}__${item.fieldCode}__${item.name}`,
    );
    const outputPath = path.join(downloadDir, fileName);
    const existingSize = await fileSizeIfExists(outputPath);
    if (existingSize === item.size) {
      skipped.push({ ...item, path: path.relative(sourceDir, outputPath) });
      console.log(`[${index + 1}/${pptxItems.length}] skip ${fileName}`);
      continue;
    }

    try {
      console.log(`[${index + 1}/${pptxItems.length}] download ${fileName}`);
      const arrayBuffer = await client.file.downloadFile({ fileKey: item.fileKey });
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(outputPath, buffer);
      downloaded.push({ ...item, path: path.relative(sourceDir, outputPath) });
    } catch (error) {
      failed.push({ ...item, error: error.message });
      console.error(`[${index + 1}/${pptxItems.length}] failed ${fileName}: ${error.message}`);
    }
  }

  const pptxManifest = {
    source: manifest.source,
    generatedAt: new Date().toISOString(),
    pptxCount: pptxItems.length,
    downloadedCount: downloaded.length,
    skippedCount: skipped.length,
    failedCount: failed.length,
    downloaded,
    skipped,
    failed,
  };

  const pptxManifestPath = path.join(sourceDir, "pptx-download-manifest.json");
  await writeFile(pptxManifestPath, `${JSON.stringify(pptxManifest, null, 2)}\n`, "utf8");

  console.log(`pptx=${pptxItems.length}`);
  console.log(`downloaded=${downloaded.length}`);
  console.log(`skipped=${skipped.length}`);
  console.log(`failed=${failed.length}`);
  console.log(`manifest=${pptxManifestPath}`);

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
