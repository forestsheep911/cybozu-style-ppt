import { mkdir, writeFile } from "node:fs/promises";
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

function fileEntries(record, recordId) {
  const entries = [];
  for (const [fieldCode, field] of Object.entries(record)) {
    if (field?.type !== "FILE" || !Array.isArray(field.value)) {
      continue;
    }
    for (const file of field.value) {
      entries.push({
        recordId,
        fieldCode,
        name: file.name,
        contentType: file.contentType,
        size: Number(file.size),
        fileKey: file.fileKey,
      });
    }
  }
  return entries;
}

async function main() {
  const baseUrl = requireEnv("KINTONE_BASE_URL").replace(/\/$/, "");
  const guestSpaceId = Number(requireEnv("KINTONE_GUEST_SPACE_ID"));
  const app = Number(requireEnv("KINTONE_APP_ID"));
  const outputDir = process.env.KINTONE_RAW_OUTPUT_DIR?.trim() || "data/raw/kintone";

  if (!Number.isInteger(guestSpaceId) || guestSpaceId <= 0) {
    throw new Error("KINTONE_GUEST_SPACE_ID must be a positive integer.");
  }
  if (!Number.isInteger(app) || app <= 0) {
    throw new Error("KINTONE_APP_ID must be a positive integer.");
  }

  const client = new KintoneRestAPIClient({
    baseUrl,
    auth: makeAuth(),
    guestSpaceId,
  });

  const records = await client.record.getAllRecords({ app });
  const attachments = records.flatMap((record) => {
    const recordId = record.$id?.value ?? "";
    return fileEntries(record, recordId);
  });

  const manifest = {
    source: {
      baseUrl,
      guestSpaceId,
      app,
    },
    scannedAt: new Date().toISOString(),
    recordCount: records.length,
    attachmentCount: attachments.length,
    attachments,
  };

  const resolvedOutputDir = path.resolve(rootDir, outputDir);
  await mkdir(resolvedOutputDir, { recursive: true });
  const manifestPath = path.join(resolvedOutputDir, "attachment-manifest.json");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

  console.log(`records=${records.length}`);
  console.log(`attachments=${attachments.length}`);
  console.log(`manifest=${manifestPath}`);
  for (const item of attachments.slice(0, 30)) {
    console.log(
      [
        `record=${item.recordId}`,
        `field=${item.fieldCode}`,
        `name=${item.name}`,
        `type=${item.contentType}`,
        `size=${item.size}`,
      ].join("\t"),
    );
  }
  if (attachments.length > 30) {
    console.log(`... ${attachments.length - 30} more attachments omitted from console`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
