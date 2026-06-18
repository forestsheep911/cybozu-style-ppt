import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(rootDir, "data", "processed", "style-analysis", "validation");
const outPath = path.join(outDir, "cybozu-style-route-a-validation.pptx");

const rect = "rect";
const roundRect = "roundRect";
const line = "line";
const ellipse = "ellipse";
const chevron = "chevron";
const rightArrow = "rightArrow";

const C = {
  yellow: "F8C400",
  yellow2: "FFE89A",
  pale: "FFF6D8",
  ink: "1F2933",
  navy: "16324F",
  gray: "D9DEE3",
  gray2: "F3F5F7",
  teal: "35B7C7",
  orange: "F49B21",
  green: "58B36B",
  red: "E85C4A",
  white: "FFFFFF",
};

function addChrome(slide, title, page) {
  slide.background = { color: C.white };
  slide.addShape(rect, {
    x: 0,
    y: 0.05,
    w: 10,
    h: 0.07,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  slide.addShape(rect, {
    x: 0,
    y: 5.48,
    w: 10,
    h: 0.07,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  slide.addShape(rect, {
    x: 0.45,
    y: 0.5,
    w: 0.12,
    h: 0.08,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  slide.addText(title, {
    x: 0.65,
    y: 0.36,
    w: 7.8,
    h: 0.38,
    fontFace: "Yu Gothic",
    fontSize: 18,
    bold: true,
    color: C.ink,
    margin: 0,
  });
  slide.addText(`route A validation / ${page}`, {
    x: 7.7,
    y: 5.25,
    w: 1.9,
    h: 0.2,
    fontSize: 7,
    color: "8A8F98",
    align: "right",
    margin: 0,
  });
}

function addBadge(slide, text, x, y, w = 1.25, h = 0.42) {
  slide.addShape(roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.12,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  slide.addText(text, {
    x: x + 0.1,
    y: y + 0.09,
    w: w - 0.2,
    h: h - 0.15,
    fontFace: "Arial",
    fontSize: 11,
    bold: true,
    color: C.ink,
    align: "center",
    margin: 0,
  });
}

function addCard(slide, { x, y, w, h, title, body, accent = C.yellow, icon = "●" }) {
  slide.addShape(roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.gray, width: 1 },
  });
  slide.addShape(rect, {
    x,
    y,
    w: 0.08,
    h,
    fill: { color: accent },
    line: { color: accent },
  });
  slide.addText(icon, {
    x: x + 0.25,
    y: y + 0.24,
    w: 0.35,
    h: 0.35,
    fontSize: 18,
    color: accent,
    margin: 0,
  });
  slide.addText(title, {
    x: x + 0.7,
    y: y + 0.23,
    w: w - 0.95,
    h: 0.32,
    fontFace: "Yu Gothic",
    fontSize: 13,
    bold: true,
    color: C.ink,
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.7,
    y: y + 0.72,
    w: w - 0.95,
    h: h - 0.95,
    fontFace: "Yu Gothic",
    fontSize: 9,
    color: "4B5563",
    breakLine: false,
    fit: "shrink",
    margin: 0.02,
  });
}

function addMascotPlaceholder(slide, x, y, scale = 1) {
  slide.addShape(ellipse, {
    x,
    y,
    w: 0.75 * scale,
    h: 0.65 * scale,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  slide.addShape(ellipse, {
    x: x + 0.07 * scale,
    y: y + 0.1 * scale,
    w: 0.62 * scale,
    h: 0.54 * scale,
    fill: { color: C.yellow },
    line: { color: C.yellow },
  });
  slide.addShape(ellipse, {
    x: x + 0.23 * scale,
    y: y + 0.27 * scale,
    w: 0.07 * scale,
    h: 0.07 * scale,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addShape(ellipse, {
    x: x + 0.48 * scale,
    y: y + 0.27 * scale,
    w: 0.07 * scale,
    h: 0.07 * scale,
    fill: { color: C.white },
    line: { color: C.white },
  });
  slide.addShape(line, {
    x: x + 0.2 * scale,
    y: y + 0.73 * scale,
    w: 0.42 * scale,
    h: 0,
    line: { color: C.orange, width: 2 },
  });
}

function addAppIcon(slide, x, y, color, label, glyph) {
  slide.addShape(roundRect, {
    x,
    y,
    w: 0.62,
    h: 0.62,
    rectRadius: 0.08,
    fill: { color },
    line: { color },
  });
  slide.addText(glyph, {
    x,
    y: y + 0.13,
    w: 0.62,
    h: 0.2,
    fontSize: 15,
    bold: true,
    color: C.white,
    align: "center",
    margin: 0,
  });
  slide.addText(label, {
    x: x - 0.18,
    y: y + 0.68,
    w: 1,
    h: 0.18,
    fontFace: "Yu Gothic",
    fontSize: 6.5,
    color: C.ink,
    align: "center",
    margin: 0,
  });
}

function addDashboardMock(slide, x, y, w, h) {
  slide.addShape(roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: C.white },
    line: { color: C.gray, width: 1 },
  });
  slide.addShape(rect, { x, y, w, h: 0.32, fill: { color: C.gray2 }, line: { color: C.gray2 } });
  slide.addShape(rect, { x: x + 0.15, y: y + 0.1, w: 0.9, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(rect, { x: x + 0.2, y: y + 0.55, w: w * 0.38, h: h - 0.75, fill: { color: "F6F7F9" }, line: { color: "F6F7F9" } });
  for (let i = 0; i < 5; i++) {
    slide.addShape(ellipse, { x: x + 0.35, y: y + 0.72 + i * 0.33, w: 0.12, h: 0.12, fill: { color: "B9DDF2" }, line: { color: "B9DDF2" } });
    slide.addShape(rect, { x: x + 0.55, y: y + 0.75 + i * 0.33, w: 1.0, h: 0.06, fill: { color: "D6DADE" }, line: { color: "D6DADE" } });
  }
  for (let i = 0; i < 4; i++) {
    slide.addShape(rect, {
      x: x + w * 0.5 + i * 0.32,
      y: y + h - 0.8 - i * 0.18,
      w: 0.18,
      h: 0.55 + i * 0.18,
      fill: { color: ["94CDE3", "75C1DA", "A3D9E9", "65B8D6"][i] },
      line: { color: C.white },
    });
  }
  slide.addShape(ellipse, { x: x + w - 1.0, y: y + h - 1.2, w: 0.65, h: 0.65, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(ellipse, { x: x + w - 0.93, y: y + h - 1.13, w: 0.5, h: 0.5, fill: { color: C.green }, line: { color: C.green } });
  slide.addShape(ellipse, { x: x + w - 0.83, y: y + h - 1.03, w: 0.3, h: 0.3, fill: { color: C.white }, line: { color: C.white } });
}

function slideTitle(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.pale };
  slide.addShape(rect, { x: 0, y: 0.05, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(line, { x: 0.75, y: 2.82, w: 4.5, h: 0, line: { color: "A2A8B0", width: 1 } });
  addBadge(slide, "style route A", 0.75, 1.35, 1.5, 0.4);
  slide.addText("cybozu-style PPT validation", {
    x: 0.75,
    y: 1.9,
    w: 5.2,
    h: 0.6,
    fontFace: "Arial",
    fontSize: 28,
    bold: true,
    color: C.ink,
    margin: 0,
  });
  slide.addText("Editable native elements, not image-first slides", {
    x: 0.78,
    y: 2.95,
    w: 4.6,
    h: 0.3,
    fontFace: "Yu Gothic",
    fontSize: 12,
    color: "4B5563",
    margin: 0,
  });
  addDashboardMock(slide, 6.0, 1.15, 3.2, 2.45);
  addMascotPlaceholder(slide, 7.95, 3.75, 0.8);
  slide.addText("Prototype built from observed deck grammar", {
    x: 6.0,
    y: 4.72,
    w: 3.2,
    h: 0.22,
    fontSize: 8,
    color: "6B7280",
    align: "center",
    margin: 0,
  });
}

function slideProblems(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "紙・EXCELで起こりがちな業務課題", "02");
  addBadge(slide, "課題", 0.65, 0.96, 0.78, 0.36);
  addCard(slide, { x: 0.65, y: 1.55, w: 4.1, h: 1.35, title: "情報が散在している", body: "紙、Excel、メール、チャットに業務情報が分かれ、最新版と担当が見えにくい。", icon: "□", accent: C.yellow });
  addCard(slide, { x: 5.2, y: 1.55, w: 4.1, h: 1.35, title: "承認に時間がかかる", body: "申請・確認・差戻しが人に依存し、ボトルネックと抜け漏れが発生する。", icon: "○", accent: C.orange });
  addCard(slide, { x: 0.65, y: 3.25, w: 4.1, h: 1.35, title: "集計が属人化している", body: "表計算の転記と集計が増え、報告資料の作成に毎回時間がかかる。", icon: "▲", accent: C.teal });
  addCard(slide, { x: 5.2, y: 3.25, w: 4.1, h: 1.35, title: "改善サイクルが遅い", body: "現場の課題が見える化されず、次の改善アクションにつながりにくい。", icon: "●", accent: C.green });
  addMascotPlaceholder(slide, 8.55, 4.62, 0.55);
}

function slidePack(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "kintoneで業務の「こうしたい」を形にする", "03");
  addBadge(slide, "パック構成", 0.65, 0.98, 1.15, 0.36);
  slide.addShape(roundRect, { x: 0.8, y: 1.65, w: 2.1, h: 2.65, rectRadius: 0.1, fill: { color: "FFFDF5" }, line: { color: C.yellow, width: 1.2 } });
  slide.addText("マスター", { x: 1.2, y: 1.85, w: 1.3, h: 0.25, fontSize: 14, bold: true, align: "center", margin: 0, color: C.ink });
  addAppIcon(slide, 1.25, 2.35, C.orange, "カレンダー", "31");
  addAppIcon(slide, 2.05, 2.35, C.teal, "社員", "人");
  slide.addShape(chevron, { x: 3.2, y: 2.65, w: 0.6, h: 0.5, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(roundRect, { x: 4.0, y: 1.25, w: 4.8, h: 3.55, rectRadius: 0.1, fill: { color: "FFFDF5" }, line: { color: C.yellow, width: 1.2 } });
  slide.addText("業務アプリ", { x: 5.45, y: 1.48, w: 1.8, h: 0.28, fontSize: 14, bold: true, align: "center", margin: 0, color: C.ink });
  const apps = [
    [4.6, 2.0, C.green, "申請", "✓"],
    [5.45, 2.0, C.red, "承認", "!"],
    [6.3, 2.0, C.yellow, "報告", "↗"],
    [7.15, 2.0, C.teal, "集計", "▥"],
    [5.0, 3.1, C.orange, "分析", "□"],
    [6.75, 3.1, C.green, "改善", "↻"],
  ];
  for (const [x, y, color, label, glyph] of apps) addAppIcon(slide, x, y, color, label, glyph);
  slide.addShape(rect, { x: 4.35, y: 4.38, w: 4.1, h: 0.22, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addText("マルチ言語対応・スマホ対応・集計の見える化", { x: 4.5, y: 4.42, w: 3.8, h: 0.16, fontSize: 7.5, bold: true, align: "center", margin: 0, color: C.ink });
  addMascotPlaceholder(slide, 8.95, 3.84, 0.65);
}

function slideWorkflow(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "申請から承認までを一つの流れで管理", "04");
  const steps = [
    ["申請", "現場が入力", C.yellow],
    ["確認", "担当が内容確認", C.teal],
    ["承認", "上長が判断", C.orange],
    ["集計", "自動で一覧化", C.green],
  ];
  steps.forEach(([title, sub, color], i) => {
    const x = 0.75 + i * 2.25;
    slide.addShape(roundRect, { x, y: 1.55, w: 1.65, h: 1.35, rectRadius: 0.08, fill: { color: "FFFDF5" }, line: { color, width: 1.5 } });
    slide.addShape(ellipse, { x: x + 0.55, y: 1.0, w: 0.55, h: 0.55, fill: { color }, line: { color } });
    slide.addText(String(i + 1), { x: x + 0.55, y: 1.13, w: 0.55, h: 0.16, fontSize: 11, bold: true, color: C.white, align: "center", margin: 0 });
    slide.addText(title, { x: x + 0.2, y: 1.83, w: 1.25, h: 0.25, fontFace: "Yu Gothic", fontSize: 16, bold: true, align: "center", color: C.ink, margin: 0 });
    slide.addText(sub, { x: x + 0.2, y: 2.24, w: 1.25, h: 0.2, fontFace: "Yu Gothic", fontSize: 8, align: "center", color: "4B5563", margin: 0 });
    if (i < steps.length - 1) {
      slide.addShape(rightArrow, { x: x + 1.75, y: 1.95, w: 0.45, h: 0.28, fill: { color: C.yellow }, line: { color: C.yellow } });
    }
  });
  slide.addShape(roundRect, { x: 1.2, y: 3.75, w: 7.6, h: 0.55, rectRadius: 0.12, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addText("抜け漏れを減らし、進捗と証跡を同じ画面で確認", { x: 1.35, y: 3.92, w: 7.3, h: 0.18, fontFace: "Yu Gothic", fontSize: 12, bold: true, color: C.ink, align: "center", margin: 0 });
}

function slideDashboard(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "現場データを見える化して改善につなげる", "05");
  addDashboardMock(slide, 0.75, 1.25, 4.45, 3.1);
  const rows = [
    ["01", "状況を一画面で確認", "一覧、グラフ、アラートを同じ文脈で確認。", C.yellow],
    ["02", "改善ポイントを共有", "担当・期限・次アクションを明確にする。", C.teal],
    ["03", "部門別に横展開", "同じ型を業務パックとして再利用する。", C.orange],
  ];
  rows.forEach(([num, title, body, color], index) => {
    const y = 1.32 + index * 1.05;
    slide.addShape(roundRect, {
      x: 5.55,
      y,
      w: 3.75,
      h: 0.75,
      rectRadius: 0.08,
      fill: { color: C.white },
      line: { color: C.gray, width: 1 },
    });
    slide.addShape(ellipse, {
      x: 5.78,
      y: y + 0.19,
      w: 0.35,
      h: 0.35,
      fill: { color },
      line: { color },
    });
    slide.addText(num, {
      x: 5.78,
      y: y + 0.28,
      w: 0.35,
      h: 0.1,
      fontSize: 6.5,
      bold: true,
      color: C.white,
      align: "center",
      margin: 0,
    });
    slide.addText(title, {
      x: 6.28,
      y: y + 0.17,
      w: 2.65,
      h: 0.18,
      fontFace: "Yu Gothic",
      fontSize: 11,
      bold: true,
      color: C.ink,
      margin: 0,
    });
    slide.addText(body, {
      x: 6.28,
      y: y + 0.43,
      w: 2.65,
      h: 0.16,
      fontFace: "Yu Gothic",
      fontSize: 7,
      color: "4B5563",
      margin: 0,
    });
  });
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt validation";
  pres.subject = "Route A validation prototype";
  pres.title = "cybozu-style Route A validation";
  pres.company = "cybozu-style-ppt";
  pres.lang = "ja-JP";
  pres.theme = {
    headFontFace: "Yu Gothic",
    bodyFontFace: "Yu Gothic",
    lang: "ja-JP",
  };

  const builders = [slideTitle, slideProblems, slidePack, slideWorkflow, slideDashboard];
  const slideLimit = Number(process.env.VALIDATION_SLIDES || builders.length);
  for (const build of builders.slice(0, slideLimit)) {
    build(pres);
  }

  await pres.writeFile({ fileName: outPath });
  console.log(`wrote=${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

