import { readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetDir = path.join(rootDir, "cybozu-style-ppt", "assets");
const assetPath = process.env.COMPONENT_ASSET_PATH
  ? path.resolve(rootDir, process.env.COMPONENT_ASSET_PATH)
  : path.join(assetDir, "cybozu-style-components.pptx");

const S = {
  rect: "rect",
  roundRect: "roundRect",
  line: "line",
  ellipse: "ellipse",
  chevron: "chevron",
  rightArrow: "rightArrow",
  triangle: "triangle",
};

const C = {
  yellow: "F8C400",
  yellowDeep: "E8AA00",
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

const font = {
  head: "Yu Gothic",
  body: "Yu Gothic",
  latin: "Aptos",
};

const characterAssets = JSON.parse(readFileSync(path.join(assetDir, "characters", "manifest.json"), "utf8"));

function addText(slide, text, opts) {
  slide.addText(text, {
    fontFace: font.body,
    color: C.ink,
    margin: 0,
    breakLine: false,
    ...opts,
  });
}

function addRuleChrome(slide, { title, eyebrow = "cybozu-ish component library", page }) {
  slide.background = { color: C.white };
  slide.addShape(S.rect, { x: 0, y: 0.05, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0, y: 5.48, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0.55, y: 0.48, w: 0.14, h: 0.12, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, title, { x: 0.78, y: 0.32, w: 7.6, h: 0.36, fontSize: 17.5, bold: true });
  addText(slide, eyebrow, { x: 0.78, y: 0.72, w: 4.3, h: 0.17, fontSize: 6.8, color: C.gray500, fontFace: font.latin });
  addText(slide, String(page).padStart(2, "0"), { x: 8.95, y: 5.18, w: 0.5, h: 0.18, fontSize: 7.2, bold: true, color: C.gray500, align: "right", fontFace: font.latin });
}

function addPill(slide, text, x, y, w, h, fill = C.yellow, color = C.ink) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
  addText(slide, text, { x: x + 0.12, y: y + h * 0.28, w: w - 0.24, h: h * 0.34, fontSize: 8.5, bold: true, color, align: "center" });
}

function addCloudBadge(slide, x, y, w = 1.25, h = 0.48, label = "kintone") {
  slide.addShape(S.roundRect, { x: x + 0.16, y: y + 0.05, w: w - 0.26, h: h - 0.08, rectRadius: 0.18, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.ellipse, { x, y: y + 0.08, w: 0.42, h: 0.32, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.ellipse, { x: x + w - 0.4, y, w: 0.42, h: 0.4, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, label, { x: x + 0.18, y: y + 0.18, w: w - 0.36, h: 0.16, fontFace: font.latin, fontSize: 8.4, bold: true, align: "center" });
}

function addCard(slide, { x, y, w, h, title, body, accent = C.yellow, num, icon = "" }) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
  slide.addShape(S.rect, { x, y, w: 0.08, h, fill: { color: accent }, line: { color: accent } });
  if (num) {
    slide.addShape(S.ellipse, { x: x + 0.27, y: y + 0.25, w: 0.42, h: 0.42, fill: { color: accent }, line: { color: accent } });
    addText(slide, num, { x: x + 0.27, y: y + 0.36, w: 0.42, h: 0.12, fontSize: 7.4, bold: true, color: C.white, align: "center", fontFace: font.latin });
  } else {
    addText(slide, icon, { x: x + 0.3, y: y + 0.26, w: 0.36, h: 0.22, fontSize: 13, bold: true, color: accent, align: "center" });
  }
  addText(slide, title, { x: x + 0.86, y: y + 0.23, w: w - 1.08, h: 0.24, fontSize: 11.2, bold: true, fit: "shrink" });
  addText(slide, body, { x: x + 0.86, y: y + 0.62, w: w - 1.08, h: h - 0.78, fontSize: 7.3, color: C.gray700, fit: "shrink" });
}

function addAppIcon(slide, { x, y, color, label, glyph, size = 0.64 }) {
  slide.addShape(S.roundRect, { x, y, w: size, h: size, rectRadius: 0.1, fill: { color }, line: { color } });
  slide.addShape(S.rect, { x: x + size * 0.62, y: y + size * 0.68, w: size * 0.22, h: size * 0.06, rotate: 45, fill: { color: C.white, transparency: 35 }, line: { color: C.white, transparency: 100 } });
  addText(slide, glyph, { x, y: y + size * 0.25, w: size, h: size * 0.18, fontSize: 12.5, bold: true, color: C.white, align: "center", fontFace: font.latin });
  addText(slide, label, { x: x - 0.2, y: y + size + 0.08, w: size + 0.4, h: 0.16, fontSize: 6.2, align: "center", fit: "shrink" });
}

function addDashboardFrame(slide, x, y, w, h) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
  slide.addShape(S.rect, { x, y, w, h: 0.36, fill: { color: C.gray100 }, line: { color: C.gray100 } });
  slide.addShape(S.rect, { x: x + 0.18, y: y + 0.13, w: 0.9, h: 0.09, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.roundRect, { x: x + w - 0.78, y: y + 0.1, w: 0.46, h: 0.14, rectRadius: 0.04, fill: { color: C.gray300 }, line: { color: C.gray300 } });
  slide.addShape(S.roundRect, { x: x + 0.22, y: y + 0.58, w: w * 0.42, h: h - 0.82, rectRadius: 0.04, fill: { color: C.gray100 }, line: { color: C.gray200 } });
  for (let i = 0; i < 5; i += 1) {
    const rowY = y + 0.78 + i * 0.35;
    slide.addShape(S.ellipse, { x: x + 0.38, y: rowY, w: 0.13, h: 0.13, fill: { color: [C.yellow, C.teal, C.orange, C.green, C.blue][i] }, line: { color: C.white } });
    slide.addShape(S.rect, { x: x + 0.6, y: rowY + 0.03, w: w * 0.26, h: 0.05, fill: { color: C.gray300 }, line: { color: C.gray300 } });
    slide.addShape(S.rect, { x: x + 0.6, y: rowY + 0.14, w: w * 0.18, h: 0.04, fill: { color: C.gray200 }, line: { color: C.gray200 } });
  }
  for (let i = 0; i < 4; i += 1) {
    slide.addShape(S.roundRect, {
      x: x + w * 0.54 + i * 0.34,
      y: y + h - 0.78 - i * 0.15,
      w: 0.2,
      h: 0.5 + i * 0.15,
      rectRadius: 0.03,
      fill: { color: [C.yellow, C.teal, C.green, C.orange][i] },
      line: { color: C.white },
    });
  }
  slide.addShape(S.ellipse, { x: x + w - 1.08, y: y + h - 1.13, w: 0.68, h: 0.68, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.ellipse, { x: x + w - 0.94, y: y + h - 0.99, w: 0.4, h: 0.4, fill: { color: C.green }, line: { color: C.green } });
}

function addCallout(slide, { x, y, w, h, label, body, color = C.yellow }) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color, width: 1.2 } });
  slide.addShape(S.triangle, { x: x - 0.12, y: y + h * 0.34, w: 0.2, h: 0.18, rotate: 270, fill: { color: C.white }, line: { color } });
  addText(slide, label, { x: x + 0.16, y: y + 0.13, w: w - 0.28, h: 0.18, fontSize: 8.8, bold: true });
  addText(slide, body, { x: x + 0.16, y: y + 0.4, w: w - 0.28, h: h - 0.5, fontSize: 6.8, color: C.gray700, fit: "shrink" });
}

function addRoleChip(slide, { x, y, w = 1.15, label, sub, color = C.yellow }) {
  slide.addShape(S.roundRect, { x, y, w, h: 0.58, rectRadius: 0.14, fill: { color: C.white }, line: { color, width: 1.1 } });
  slide.addShape(S.ellipse, { x: x + 0.14, y: y + 0.15, w: 0.28, h: 0.28, fill: { color }, line: { color } });
  addText(slide, label, { x: x + 0.52, y: y + 0.14, w: w - 0.66, h: 0.12, fontSize: 7.2, bold: true, fit: "shrink" });
  addText(slide, sub, { x: x + 0.52, y: y + 0.34, w: w - 0.66, h: 0.1, fontSize: 5.6, color: C.gray700, fit: "shrink" });
}

function addImageContain(slide, asset, { x, y, w, h }) {
  const ratio = asset.pxW / asset.pxH;
  let drawW = w;
  let drawH = w / ratio;
  if (drawH > h) {
    drawH = h;
    drawW = h * ratio;
  }
  slide.addImage({
    path: path.join(assetDir, "characters", asset.file),
    x: x + (w - drawW) / 2,
    y: y + (h - drawH) / 2,
    w: drawW,
    h: drawH,
  });
}

function addAssetTile(slide, asset, { x, y, w, h }) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.gray300, width: 0.8 } });
  addImageContain(slide, asset, { x: x + 0.1, y: y + 0.12, w: w - 0.2, h: h - 0.42 });
  const title = asset.id ? `${asset.id} ${asset.label}` : asset.label;
  addText(slide, title, { x: x + 0.1, y: y + h - 0.24, w: w - 0.2, h: 0.09, fontSize: 5.6, bold: true, align: "center", fontFace: font.latin, fit: "shrink" });
  addText(slide, asset.group || asset.kind, { x: x + 0.1, y: y + h - 0.12, w: w - 0.2, h: 0.07, fontSize: 4.8, color: C.gray500, align: "center", fontFace: font.latin, fit: "shrink" });
}

function addAvatarCandidate(slide, { x, y, label, role, color = C.yellow, prop = "tablet" }) {
  slide.addShape(S.roundRect, { x, y, w: 1.55, h: 1.72, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.gray300 } });
  slide.addShape(S.ellipse, { x: x + 0.56, y: y + 0.22, w: 0.42, h: 0.42, fill: { color: "FFF7E8" }, line: { color: C.ink, width: 1.1 } });
  slide.addShape(S.ellipse, { x: x + 0.52, y: y + 0.16, w: 0.5, h: 0.22, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addShape(S.ellipse, { x: x + 0.66, y: y + 0.39, w: 0.04, h: 0.04, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addShape(S.ellipse, { x: x + 0.86, y: y + 0.39, w: 0.04, h: 0.04, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addShape(S.line, { x: x + 0.69, y: y + 0.53, w: 0.18, h: 0.02, line: { color: C.ink, width: 0.8 } });
  slide.addShape(S.roundRect, { x: x + 0.38, y: y + 0.72, w: 0.8, h: 0.58, rectRadius: 0.08, fill: { color }, line: { color: C.ink, width: 1 } });
  slide.addShape(S.rect, { x: x + 0.68, y: y + 0.72, w: 0.2, h: 0.58, fill: { color: C.white }, line: { color: C.white } });
  if (prop === "tablet") {
    slide.addShape(S.roundRect, { x: x + 0.18, y: y + 0.95, w: 0.55, h: 0.36, rectRadius: 0.04, fill: { color: C.gray100 }, line: { color: C.ink, width: 0.8 } });
  } else if (prop === "check") {
    slide.addShape(S.ellipse, { x: x + 0.18, y: y + 0.9, w: 0.38, h: 0.38, fill: { color: C.white }, line: { color: C.ink, width: 0.8 } });
    addText(slide, "OK", { x: x + 0.18, y: y + 1.02, w: 0.38, h: 0.08, fontSize: 5.8, bold: true, align: "center", fontFace: font.latin });
  } else if (prop === "pointer") {
    slide.addShape(S.rect, { x: x + 1.13, y: y + 0.78, w: 0.04, h: 0.55, rotate: 25, fill: { color: C.ink }, line: { color: C.ink } });
  }
  addText(slide, label, { x: x + 0.12, y: y + 1.43, w: 1.31, h: 0.1, fontSize: 6.7, bold: true, align: "center", fit: "shrink" });
  addText(slide, role, { x: x + 0.12, y: y + 1.58, w: 1.31, h: 0.08, fontSize: 5.3, color: C.gray700, align: "center", fontFace: font.latin, fit: "shrink" });
}

function addCloudMascotCandidate(slide, { x, y, label, pose = "wave" }) {
  const line = { color: C.ink, width: 1.1 };
  const cloudFill = { color: C.yellow };
  slide.addShape(S.roundRect, { x: x + 0.18, y: y + 0.48, w: 1.1, h: 0.5, rectRadius: 0.2, fill: cloudFill, line });
  [
    [0.16, 0.52, 0.42, 0.38],
    [0.42, 0.28, 0.48, 0.48],
    [0.78, 0.36, 0.46, 0.44],
    [1.08, 0.56, 0.34, 0.32],
  ].forEach(([dx, dy, w, h]) => {
    slide.addShape(S.ellipse, { x: x + dx, y: y + dy, w, h, fill: cloudFill, line });
  });
  slide.addShape(S.ellipse, { x: x + 0.56, y: y + 0.67, w: 0.05, h: 0.08, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addShape(S.ellipse, { x: x + 0.9, y: y + 0.67, w: 0.05, h: 0.08, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addShape(S.line, { x: x + 0.62, y: y + 0.82, w: 0.28, h: 0, line: { color: C.ink, width: 0.9 } });
  slide.addShape(S.rect, { x: x + 0.46, y: y + 1.04, w: 0.04, h: 0.28, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addShape(S.rect, { x: x + 1.02, y: y + 1.04, w: 0.04, h: 0.28, fill: { color: C.ink }, line: { color: C.ink } });
  slide.addShape(S.ellipse, { x: x + 0.34, y: y + 1.28, w: 0.26, h: 0.12, fill: cloudFill, line });
  slide.addShape(S.ellipse, { x: x + 0.9, y: y + 1.28, w: 0.26, h: 0.12, fill: cloudFill, line });
  if (pose === "laptop") {
    slide.addShape(S.roundRect, { x: x + 0.26, y: y + 0.94, w: 0.64, h: 0.36, rectRadius: 0.04, fill: { color: C.gray100 }, line });
    slide.addShape(S.rect, { x: x + 0.9, y: y + 0.86, w: 0.24, h: 0.03, rotate: 340, fill: { color: C.ink }, line: { color: C.ink } });
  } else if (pose === "sign") {
    slide.addShape(S.rect, { x: x + 0.34, y: y + 0.18, w: 0.7, h: 0.34, fill: { color: C.white }, line });
    slide.addShape(S.rect, { x: x + 0.66, y: y + 0.52, w: 0.04, h: 0.32, fill: { color: C.ink }, line: { color: C.ink } });
  } else {
    slide.addShape(S.rect, { x: x + 1.16, y: y + 0.4, w: 0.05, h: 0.5, rotate: 330, fill: { color: C.ink }, line: { color: C.ink } });
    slide.addShape(S.ellipse, { x: x + 1.18, y: y + 0.34, w: 0.16, h: 0.16, fill: { color: C.white }, line });
  }
  addText(slide, label, { x: x + 0.1, y: y + 1.55, w: 1.35, h: 0.1, fontSize: 6.4, bold: true, align: "center", fit: "shrink" });
}

function slideCover(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.cream };
  slide.addShape(S.rect, { x: 0, y: 0.05, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0, y: 5.48, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  addCloudBadge(slide, 0.72, 1.0, 1.24, 0.48, "kintone");
  addText(slide, "cybozu-ish editable PPT components", { x: 0.72, y: 1.72, w: 5.9, h: 0.66, fontFace: font.latin, fontSize: 27, bold: true, color: C.ink });
  addText(slide, "身份识别来自 kintone/cybozu，审美标准重新定义为干净、可编辑、业务导向。", { x: 0.75, y: 2.72, w: 5.4, h: 0.34, fontSize: 11.5, color: C.gray700 });
  addPill(slide, "native shapes", 0.75, 3.34, 1.35, 0.34);
  addPill(slide, "clean hierarchy", 2.28, 3.34, 1.48, 0.34, C.white);
  addPill(slide, "business modules", 3.95, 3.34, 1.64, 0.34, C.white);
  addDashboardFrame(slide, 6.55, 1.15, 2.7, 2.15);
  addRoleChip(slide, { x: 6.85, y: 3.78, w: 1.12, label: "現場", sub: "input", color: C.yellow });
  addRoleChip(slide, { x: 8.15, y: 3.78, w: 1.12, label: "管理", sub: "approve", color: C.teal });
}

function slideChrome(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Title / section chrome patterns", page: 2 });
  slide.addShape(S.roundRect, { x: 0.75, y: 1.25, w: 3.95, h: 2.75, rectRadius: 0.08, fill: { color: C.cream }, line: { color: C.gray300 } });
  slide.addShape(S.rect, { x: 0.75, y: 1.25, w: 3.95, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  addCloudBadge(slide, 1.15, 1.72, 1.15, 0.42, "kintone");
  addText(slide, "大きな主張を先に置く", { x: 1.12, y: 2.35, w: 2.9, h: 0.34, fontSize: 18, bold: true });
  addText(slide, "白 / 浅米色 + 黄色规则线。标题强，说明短。", { x: 1.14, y: 3.05, w: 2.95, h: 0.26, fontSize: 8.2, color: C.gray700 });
  slide.addShape(S.roundRect, { x: 5.25, y: 1.25, w: 3.95, h: 2.75, rectRadius: 0.08, fill: { color: C.yellowPale }, line: { color: C.yellowPale } });
  slide.addShape(S.line, { x: 5.75, y: 2.05, w: 2.4, h: 0, line: { color: C.gray500, width: 1 } });
  addText(slide, "SECTION 01", { x: 5.75, y: 1.58, w: 1.15, h: 0.14, fontSize: 7.2, bold: true, color: C.yellowDeep, fontFace: font.latin });
  addText(slide, "业务改善の全体像", { x: 5.75, y: 2.25, w: 2.8, h: 0.32, fontSize: 18, bold: true });
  addText(slide, "Section slides should feel calm, not decorative.", { x: 5.77, y: 3.02, w: 2.7, h: 0.2, fontSize: 7.5, color: C.gray700, fontFace: font.latin });
}

function slideCards(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Problem / insight card set", page: 3 });
  addPill(slide, "課題整理", 0.72, 1.02, 0.92, 0.34);
  const cards = [
    ["01", "情報が散在", "紙、Excel、メールに分かれ、最新版と担当が見えない。", C.yellow],
    ["02", "承認が遅い", "確認、差戻し、証跡管理が人に依存する。", C.orange],
    ["03", "集計が属人化", "転記と集計が増え、改善の判断が遅れる。", C.teal],
    ["04", "横展開しにくい", "業務ごとに型が違い、成功パターンを再利用できない。", C.green],
  ];
  cards.forEach(([num, title, body, accent], index) => {
    const x = index % 2 === 0 ? 0.72 : 5.15;
    const y = index < 2 ? 1.55 : 3.18;
    addCard(slide, { x, y, w: 4.1, h: 1.18, title, body, accent, num });
  });
}

function slideAppTiles(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "App pack icon tile set", page: 4 });
  slide.addShape(S.roundRect, { x: 0.85, y: 1.35, w: 2.2, h: 2.95, rectRadius: 0.1, fill: { color: C.cream }, line: { color: C.yellow, width: 1.1 } });
  addText(slide, "マスター", { x: 1.45, y: 1.62, w: 1.0, h: 0.22, fontSize: 13, bold: true, align: "center" });
  addAppIcon(slide, { x: 1.25, y: 2.15, color: C.orange, label: "カレンダー", glyph: "31" });
  addAppIcon(slide, { x: 2.02, y: 2.15, color: C.teal, label: "社員", glyph: "ID" });
  slide.addShape(S.chevron, { x: 3.45, y: 2.6, w: 0.6, h: 0.48, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.roundRect, { x: 4.35, y: 1.15, w: 4.65, h: 3.35, rectRadius: 0.1, fill: { color: C.cream }, line: { color: C.yellow, width: 1.1 } });
  addText(slide, "業務アプリ", { x: 5.78, y: 1.42, w: 1.8, h: 0.22, fontSize: 13, bold: true, align: "center" });
  [
    [4.95, 2.02, C.green, "申請", "OK"],
    [5.78, 2.02, C.red, "承認", "!"],
    [6.61, 2.02, C.blue, "報告", "UP"],
    [7.44, 2.02, C.teal, "集計", "DB"],
    [5.35, 3.12, C.orange, "分析", "%"],
    [7.04, 3.12, C.green, "改善", "R"],
  ].forEach(([x, y, color, label, glyph]) => addAppIcon(slide, { x, y, color, label, glyph }));
  slide.addShape(S.rect, { x: 4.7, y: 4.13, w: 3.95, h: 0.18, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, "app pack map: repeatable, editable, not screenshot-first", { x: 4.88, y: 4.17, w: 3.58, h: 0.1, fontSize: 6.3, bold: true, align: "center", fontFace: font.latin });
}

function slideWorkflow(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Workflow / process components", page: 5 });
  const steps = [
    ["申請", "現場が入力", C.yellow],
    ["確認", "担当が確認", C.teal],
    ["承認", "上長が判断", C.orange],
    ["集計", "自動で可視化", C.green],
  ];
  steps.forEach(([title, sub, color], i) => {
    const x = 0.78 + i * 2.25;
    slide.addShape(S.roundRect, { x, y: 1.65, w: 1.62, h: 1.22, rectRadius: 0.08, fill: { color: C.white }, line: { color, width: 1.4 } });
    slide.addShape(S.ellipse, { x: x + 0.54, y: 1.05, w: 0.54, h: 0.54, fill: { color }, line: { color } });
    addText(slide, String(i + 1), { x: x + 0.54, y: 1.19, w: 0.54, h: 0.13, fontSize: 9.2, bold: true, color: C.white, align: "center", fontFace: font.latin });
    addText(slide, title, { x: x + 0.22, y: 1.92, w: 1.18, h: 0.24, fontSize: 15, bold: true, align: "center" });
    addText(slide, sub, { x: x + 0.22, y: 2.32, w: 1.18, h: 0.16, fontSize: 7, color: C.gray700, align: "center" });
    if (i < steps.length - 1) {
      slide.addShape(S.rightArrow, { x: x + 1.76, y: 2.08, w: 0.44, h: 0.26, fill: { color: C.yellow }, line: { color: C.yellow } });
    }
  });
  slide.addShape(S.roundRect, { x: 1.2, y: 3.72, w: 7.6, h: 0.58, rectRadius: 0.16, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, "抜け漏れを減らし、進捗と証跡を同じ画面で確認", { x: 1.4, y: 3.9, w: 7.2, h: 0.18, fontSize: 11.5, bold: true, align: "center" });
}

function slideDashboard(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Dashboard mockup + callout pattern", page: 6 });
  addDashboardFrame(slide, 0.78, 1.25, 4.45, 3.08);
  addCallout(slide, { x: 5.62, y: 1.28, w: 3.45, h: 0.78, label: "状況を一画面で確認", body: "一覧、グラフ、アラートを同じ文脈で見せる。", color: C.yellow });
  addCallout(slide, { x: 5.62, y: 2.38, w: 3.45, h: 0.78, label: "改善ポイントを共有", body: "担当、期限、次アクションを短い言葉で固定する。", color: C.teal });
  addCallout(slide, { x: 5.62, y: 3.48, w: 3.45, h: 0.78, label: "横展開しやすい型", body: "業務ごとに同じ構造を使い回せるようにする。", color: C.orange });
}

function slideSolutionMap(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Solution map / before-after modules", page: 7 });
  addPill(slide, "Before", 0.8, 1.2, 0.86, 0.32, C.gray200, C.gray700);
  addPill(slide, "After", 5.35, 1.2, 0.78, 0.32, C.yellow);
  ["紙", "Excel", "メール", "個別確認"].forEach((text, i) => {
    slide.addShape(S.roundRect, { x: 0.95 + i * 0.86, y: 2.05 + (i % 2) * 0.72, w: 0.78, h: 0.42, rectRadius: 0.07, fill: { color: C.white }, line: { color: C.gray300 } });
    addText(slide, text, { x: 0.95 + i * 0.86, y: 2.18 + (i % 2) * 0.72, w: 0.78, h: 0.12, fontSize: 7.2, align: "center", color: C.gray700 });
  });
  slide.addShape(S.rightArrow, { x: 4.4, y: 2.45, w: 0.58, h: 0.34, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.roundRect, { x: 5.35, y: 1.82, w: 3.78, h: 2.12, rectRadius: 0.1, fill: { color: C.cream }, line: { color: C.yellow, width: 1.2 } });
  [
    [5.75, 2.28, C.yellow, "申請"],
    [6.55, 2.28, C.teal, "承認"],
    [7.35, 2.28, C.green, "集計"],
    [8.15, 2.28, C.orange, "改善"],
  ].forEach(([x, y, color, label]) => {
    slide.addShape(S.ellipse, { x, y, w: 0.42, h: 0.42, fill: { color }, line: { color } });
    addText(slide, label, { x: x - 0.18, y: y + 0.55, w: 0.78, h: 0.12, fontSize: 6.5, align: "center" });
  });
  addText(slide, "One shared kintone work system", { x: 6.05, y: 3.36, w: 2.4, h: 0.16, fontSize: 7.8, bold: true, align: "center", fontFace: font.latin });
}

function slideRoles(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Role / responsibility components", page: 8 });
  addText(slide, "人物插画不作为默认风格。业务场景优先用角色标签、责任分工和流程节点表达，避免粗糙 clip-art 拉低质感。", { x: 0.78, y: 1.13, w: 7.4, h: 0.26, fontSize: 9.2, color: C.gray700 });
  [
    [0.92, 1.86, C.yellow, "現場担当", "input"],
    [2.32, 1.86, C.teal, "承認者", "approve"],
    [3.72, 1.86, C.orange, "管理部門", "control"],
    [5.12, 1.86, C.green, "経営層", "review"],
    [6.52, 1.86, C.blue, "支援担当", "support"],
  ].forEach(([x, y, color, label, sub]) => addRoleChip(slide, { x, y, w: 1.18, label, sub, color }));
  const rows = [
    ["業務入力", "R", "A", "C", "-", "S"],
    ["差戻し確認", "R", "A", "C", "-", "S"],
    ["月次レポート", "C", "A", "R", "I", "S"],
  ];
  addText(slide, "責任分工表", { x: 1.0, y: 2.92, w: 1.4, h: 0.18, fontSize: 10.5, bold: true });
  rows.forEach((row, i) => {
    const y = 3.3 + i * 0.42;
    slide.addShape(S.roundRect, { x: 0.95, y, w: 8.1, h: 0.3, rectRadius: 0.04, fill: { color: i % 2 === 0 ? C.gray100 : C.white }, line: { color: C.gray200 } });
    row.forEach((cell, j) => {
      addText(slide, cell, { x: 1.12 + j * 1.16, y: y + 0.1, w: j === 0 ? 1.35 : 0.5, h: 0.08, fontSize: j === 0 ? 6.8 : 7.5, bold: j > 0, color: j === 0 ? C.gray700 : C.ink, align: j === 0 ? "left" : "center", fontFace: j === 0 ? font.body : font.latin });
    });
  });
  slide.addShape(S.roundRect, { x: 0.92, y: 4.58, w: 8.1, h: 0.28, rectRadius: 0.1, fill: { color: C.yellowPale }, line: { color: C.yellowPale } });
  addText(slide, "Default rule: no people/mascot drawings unless approved visual assets are available.", { x: 1.14, y: 4.68, w: 7.65, h: 0.08, fontSize: 6.4, color: C.gray700, align: "center", fontFace: font.latin });
}

function slideProductIntro(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Product intro page skeleton", page: 9 });
  addPill(slide, "製品紹介", 0.72, 1.05, 0.92, 0.34);
  addText(slide, "現場の情報を一つの業務アプリに集約", { x: 0.78, y: 1.62, w: 4.1, h: 0.48, fontSize: 21, bold: true, fit: "shrink" });
  addText(slide, "Screenshot-first ではなく、必要な画面だけを枠に入れ、周辺説明は editable な callout として残す。", { x: 0.8, y: 2.42, w: 3.9, h: 0.38, fontSize: 8.5, color: C.gray700, fit: "shrink" });
  addDashboardFrame(slide, 5.32, 1.12, 3.72, 2.65);
  addCallout(slide, { x: 1.05, y: 3.42, w: 3.4, h: 0.78, label: "入力・一覧・集計を同じ場所に", body: "提案資料では UI の忠実再現より、何が変わるかを短く示す。", color: C.yellow });
  slide.addShape(S.line, { x: 4.52, y: 3.08, w: 0.76, h: 0.72, line: { color: C.yellowDeep, width: 1.2, beginArrowType: "none", endArrowType: "triangle" } });
  addRoleChip(slide, { x: 7.72, y: 4.05, w: 1.28, label: "利用者", sub: "daily input", color: C.yellow });
}

function slideIndustryProposal(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Industry proposal one-pager", page: 10 });
  addPill(slide, "製造業向け", 0.72, 1.03, 1.05, 0.34);
  addText(slide, "設備・品質・受発注の現場データを横断管理", { x: 0.78, y: 1.56, w: 5.9, h: 0.34, fontSize: 18, bold: true });
  addText(slide, "1 枚で課題、パック構成、導入後の見え方を示す提案骨格。", { x: 0.8, y: 2.02, w: 4.6, h: 0.2, fontSize: 8.4, color: C.gray700 });
  addCard(slide, { x: 0.8, y: 2.58, w: 2.62, h: 1.05, title: "現場入力", body: "設備点検、不良、作業記録を標準フォーム化。", accent: C.yellow, num: "01" });
  addCard(slide, { x: 3.72, y: 2.58, w: 2.62, h: 1.05, title: "承認・通知", body: "異常値や差戻しを担当者へすぐ共有。", accent: C.orange, num: "02" });
  addCard(slide, { x: 6.64, y: 2.58, w: 2.62, h: 1.05, title: "改善分析", body: "月次集計と改善アクションを同じ型で管理。", accent: C.teal, num: "03" });
  slide.addShape(S.roundRect, { x: 0.82, y: 4.12, w: 8.38, h: 0.42, rectRadius: 0.12, fill: { color: C.yellowPale }, line: { color: C.yellowPale } });
  addText(slide, "Proposal rule: fewer screenshots, stronger claim title, editable business structure.", { x: 1.05, y: 4.27, w: 7.9, h: 0.1, fontSize: 6.8, color: C.gray700, align: "center", fontFace: font.latin });
}

function slideImplementationPath(pres) {
  const slide = pres.addSlide();
  addRuleChrome(slide, { title: "Implementation path / next action", page: 11 });
  addPill(slide, "導入ステップ", 0.72, 1.05, 1.18, 0.34);
  const steps = [
    ["現状整理", "対象業務と帳票を確認", C.yellow],
    ["小さく構築", "1 業務からアプリ化", C.teal],
    ["現場検証", "入力負荷と権限を調整", C.orange],
    ["横展開", "成功パターンを他部門へ", C.green],
  ];
  steps.forEach(([title, body, color], i) => {
    const x = 0.82 + i * 2.23;
    slide.addShape(S.ellipse, { x: x + 0.55, y: 1.72, w: 0.52, h: 0.52, fill: { color }, line: { color } });
    addText(slide, String(i + 1), { x: x + 0.55, y: 1.86, w: 0.52, h: 0.13, fontSize: 9, bold: true, color: C.white, align: "center", fontFace: font.latin });
    slide.addShape(S.roundRect, { x, y: 2.44, w: 1.62, h: 1.04, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300 } });
    addText(slide, title, { x: x + 0.2, y: 2.68, w: 1.22, h: 0.18, fontSize: 10.5, bold: true, align: "center" });
    addText(slide, body, { x: x + 0.2, y: 3.0, w: 1.22, h: 0.2, fontSize: 6.5, color: C.gray700, align: "center", fit: "shrink" });
    if (i < steps.length - 1) {
      slide.addShape(S.rightArrow, { x: x + 1.76, y: 2.78, w: 0.38, h: 0.22, fill: { color: C.yellow }, line: { color: C.yellow } });
    }
  });
  slide.addShape(S.roundRect, { x: 1.12, y: 4.25, w: 7.75, h: 0.52, rectRadius: 0.14, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, "次のアクション: 対象業務を 1 つ選び、30 分で画面と運用を確認", { x: 1.34, y: 4.42, w: 7.3, h: 0.16, fontSize: 10.5, bold: true, align: "center" });
}

function slideCharacterAssets(pres) {
  const perPage = 12;
  const pageCount = Math.ceil(characterAssets.length / perPage);
  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const slide = pres.addSlide();
    addRuleChrome(slide, { title: `Approved character / scenario assets ${pageIndex + 1}/${pageCount}`, page: 12 + pageIndex });
    addText(slide, "既存資料から抽出した透明背景 PNG。人物やキャラクターは画像資産として使い、説明・矢印・役割ラベルは editable PPT elements で重ねる。", { x: 0.78, y: 1.08, w: 8.0, h: 0.22, fontSize: 8.4, color: C.gray700, fit: "shrink" });
    characterAssets.slice(pageIndex * perPage, (pageIndex + 1) * perPage).forEach((asset, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      addAssetTile(slide, asset, {
        x: 0.78 + col * 2.16,
        y: 1.52 + row * 1.18,
        w: 1.84,
        h: 0.98,
      });
    });
    slide.addShape(S.roundRect, { x: 0.78, y: 5.02, w: 8.45, h: 0.22, rectRadius: 0.08, fill: { color: C.yellowPale }, line: { color: C.yellowPale } });
    addText(slide, "Use policy: one illustration family per slide; do not mix these with rough native-shape people.", { x: 1.02, y: 5.09, w: 7.9, h: 0.06, fontSize: 5.8, color: C.gray700, align: "center", fontFace: font.latin });
  }
}

async function main() {
  await mkdir(assetDir, { recursive: true });
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt";
  pres.company = "cybozu-style-ppt";
  pres.subject = "Editable cybozu-ish PowerPoint component library";
  pres.title = "cybozu-ish editable PPT components";
  pres.lang = "zh-CN";
  pres.theme = {
    headFontFace: font.head,
    bodyFontFace: font.body,
    lang: "zh-CN",
  };

  [
    slideCover,
    slideChrome,
    slideCards,
    slideAppTiles,
    slideWorkflow,
    slideDashboard,
    slideSolutionMap,
    slideRoles,
    slideProductIntro,
    slideIndustryProposal,
    slideImplementationPath,
    slideCharacterAssets,
  ].forEach((build) => build(pres));

  await pres.writeFile({ fileName: assetPath });
  console.log(`wrote=${assetPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
