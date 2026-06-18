import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetDir = path.join(rootDir, "cybozu-style-ppt", "assets");
const bitmapDir = path.join(assetDir, "bitmap-b");
const outPath = process.env.BITMAP_DEMO_SOURCE_PATH
  ? path.resolve(rootDir, process.env.BITMAP_DEMO_SOURCE_PATH)
  : path.join(bitmapDir, "cybozu-story-demo-b-source.pptx");

const S = {
  rect: "rect",
  roundRect: "roundRect",
  line: "line",
  ellipse: "ellipse",
  chevron: "chevron",
  rightArrow: "rightArrow",
};

const C = {
  yellow: "F8C400",
  yellowDeep: "E8AA00",
  yellowPale: "FFF3BF",
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

function addBg(slide, page) {
  slide.background = { color: C.cream };
  slide.addShape(S.rect, { x: 0, y: 0, w: 10, h: 0.12, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0, y: 5.5, w: 10, h: 0.13, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.ellipse, { x: 8.95, y: 0.28, w: 0.18, h: 0.18, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, String(page).padStart(2, "0"), { x: 9.05, y: 5.18, w: 0.35, h: 0.15, fontSize: 6.8, color: C.gray500, fontFace: font.latin, align: "right" });
}

function addBitmap(slide, name, x, y, w, h) {
  slide.addImage({ path: path.join(bitmapDir, name), x, y, w, h });
}

function addPill(slide, text, x, y, w, fill = C.yellow) {
  slide.addShape(S.roundRect, { x, y, w, h: 0.32, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
  addText(slide, text, { x: x + 0.12, y: y + 0.105, w: w - 0.24, h: 0.08, fontSize: 7.4, bold: true, align: "center", color: C.ink });
}

function addCard(slide, { x, y, w, h, title, body, color }) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white, transparency: 0 }, line: { color: C.gray300, width: 0.8 } });
  slide.addShape(S.rect, { x, y, w: 0.08, h, fill: { color }, line: { color } });
  addText(slide, title, { x: x + 0.24, y: y + 0.2, w: w - 0.42, h: 0.18, fontSize: 10, bold: true });
  addText(slide, body, { x: x + 0.24, y: y + 0.56, w: w - 0.42, h: h - 0.66, fontSize: 6.6, color: C.gray700 });
}

function addDashboard(slide, x, y, w, h) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.1, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
  slide.addShape(S.rect, { x, y, w, h: 0.38, fill: { color: C.gray100 }, line: { color: C.gray100 } });
  slide.addShape(S.rect, { x: x + 0.22, y: y + 0.15, w: 1.05, h: 0.09, fill: { color: C.yellow }, line: { color: C.yellow } });
  [0.42, 0.6, 0.82, 1.04].forEach((barH, i) => {
    slide.addShape(S.roundRect, { x: x + w - 1.25 + i * 0.27, y: y + h - 0.28 - barH, w: 0.18, h: barH, rectRadius: 0.03, fill: { color: [C.yellow, C.teal, C.green, C.orange][i] }, line: { color: C.white } });
  });
  for (let i = 0; i < 4; i += 1) {
    const rowY = y + 0.7 + i * 0.22;
    slide.addShape(S.ellipse, { x: x + 0.3, y: rowY, w: 0.12, h: 0.12, fill: { color: [C.yellow, C.teal, C.orange, C.green][i] }, line: { color: C.white } });
    slide.addShape(S.rect, { x: x + 0.52, y: rowY + 0.03, w: 1.45, h: 0.05, fill: { color: C.gray300 }, line: { color: C.gray300 } });
    slide.addShape(S.rect, { x: x + 0.52, y: rowY + 0.13, w: 0.92, h: 0.04, fill: { color: C.gray200 }, line: { color: C.gray200 } });
  }
}

function slideCover(pres) {
  const slide = pres.addSlide();
  addBg(slide, 1);
  addBitmap(slide, "b-cloud-helper.png", 5.75, 0.7, 3.35, 3.0);
  slide.addShape(S.rect, { x: 0, y: 0.12, w: 10, h: 5.38, fill: { color: C.cream, transparency: 14 }, line: { color: C.cream, transparency: 100 } });
  addText(slide, "B方案视觉样张", { x: 0.72, y: 1.0, w: 2.0, h: 0.2, fontSize: 10, color: C.yellowDeep, bold: true });
  addText(slide, "kintone で業務改善を\n回し続ける", { x: 0.72, y: 1.48, w: 5.1, h: 0.8, fontSize: 27, bold: true, breakLine: false });
  addText(slide, "A方案负责故事骨架，B方案把角色、场景和情绪统一成更完整的视觉系统。", { x: 0.75, y: 2.78, w: 5.0, h: 0.28, fontSize: 10.2, color: C.gray700 });
  addPill(slide, "full-slide bitmap", 0.75, 3.44, 1.45, C.yellow);
  addPill(slide, "generated visual system", 2.38, 3.44, 1.86, C.white);
  addPill(slide, "same story", 4.42, 3.44, 1.08, C.white);
  addDashboard(slide, 6.2, 3.42, 2.85, 1.45);
}

function slidePain(pres) {
  const slide = pres.addSlide();
  addBg(slide, 2);
  addBitmap(slide, "b-pain-workers.png", 5.72, 0.82, 3.25, 2.3);
  addText(slide, "分散した業務は、現場にも管理にも負荷を残す", { x: 0.72, y: 0.55, w: 6.7, h: 0.36, fontSize: 19, bold: true });
  addText(slide, "紙、Excel、メールがそれぞれ正しいままでも、流れとしてつながっていなければ改善は遅くなる。", { x: 0.75, y: 1.12, w: 6.2, h: 0.22, fontSize: 8.4, color: C.gray700 });
  const cards = [
    ["入力が散在", "最新版と担当者が見えない", C.orange],
    ["承認が止まる", "確認・差戻し・証跡が人に残る", C.red],
    ["集計が遅れる", "判断のタイミングを逃す", C.teal],
  ];
  cards.forEach(([title, body, color], i) => addCard(slide, { x: 0.82 + i * 2.05, y: 3.05, w: 1.72, h: 1.28, title, body, color }));
  slide.addShape(S.roundRect, { x: 6.35, y: 3.32, w: 2.2, h: 0.56, rectRadius: 0.14, fill: { color: C.yellowPale }, line: { color: C.yellowPale } });
  addText(slide, "問題はツール数ではなく、業務の流れが一枚に見えないこと。", { x: 6.58, y: 3.5, w: 1.75, h: 0.15, fontSize: 6.4, color: C.gray700, align: "center" });
}

function slideTheme(pres) {
  const slide = pres.addSlide();
  addBg(slide, 3);
  addText(slide, "kintone を中心に、入力から改善までを一つの循環にする", { x: 0.72, y: 0.55, w: 7.4, h: 0.36, fontSize: 19, bold: true });
  addText(slide, "B方案中，中心循环不再只是线和框，而是一个可持续复用的视觉母题。", { x: 0.75, y: 1.12, w: 6.0, h: 0.22, fontSize: 8.4, color: C.gray700 });
  addBitmap(slide, "b-loop-hub.png", 3.02, 1.38, 3.7, 2.55);
  const nodes = [
    [0.82, 2.0, "入力", "现 场 登 录", C.yellow],
    [2.05, 3.85, "承認", "差戻しも履歴化", C.orange],
    [6.98, 2.0, "通知", "次の担当へ渡す", C.teal],
    [7.72, 3.85, "集計", "判断材料を作る", C.green],
  ];
  nodes.forEach(([x, y, title, sub, color]) => {
    slide.addShape(S.roundRect, { x, y, w: 1.35, h: 0.76, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 0.8 } });
    slide.addShape(S.ellipse, { x: x + 0.12, y: y + 0.23, w: 0.25, h: 0.25, fill: { color }, line: { color } });
    addText(slide, title, { x: x + 0.48, y: y + 0.18, w: 0.72, h: 0.11, fontSize: 8, bold: true });
    addText(slide, sub, { x: x + 0.48, y: y + 0.42, w: 0.72, h: 0.08, fontSize: 4.9, color: C.gray700 });
  });
}

function slideSystem(pres) {
  const slide = pres.addSlide();
  addBg(slide, 4);
  addText(slide, "改善の流れを、ひと目で分かる一枚に変える", { x: 0.72, y: 0.55, w: 6.8, h: 0.36, fontSize: 19, bold: true });
  addText(slide, "位图插画负责氛围和关系，结构化文本负责业务判断。两者分工后，页面会比纯 PPT 拼图更完整。", { x: 0.75, y: 1.12, w: 7.0, h: 0.22, fontSize: 8.4, color: C.gray700 });
  addBitmap(slide, "b-style-board.png", 0.9, 1.56, 8.2, 2.75);
  slide.addShape(S.roundRect, { x: 1.08, y: 4.58, w: 7.85, h: 0.34, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.gray300, width: 0.8 } });
  addText(slide, "固定视觉建议：痛点场景 / 中心循环 / 改善运营 三类母题先沉淀，再进入正式生产。", { x: 1.28, y: 4.69, w: 7.45, h: 0.08, fontSize: 7.2, color: C.gray700, align: "center" });
}

function slideOperation(pres) {
  const slide = pres.addSlide();
  addBg(slide, 5);
  addText(slide, "导入后，故事要落到持续运营", { x: 0.72, y: 0.55, w: 5.0, h: 0.36, fontSize: 19, bold: true });
  addText(slide, "B方案可以把“工具说明”处理成“运营场景”，更适合封面、章节页、客户提案首页和演示过渡页。", { x: 0.75, y: 1.12, w: 6.9, h: 0.22, fontSize: 8.4, color: C.gray700 });
  addBitmap(slide, "b-cloud-helper.png", 5.85, 1.22, 3.1, 2.75);
  [
    ["1", "先选一个业务", "不要从全公司改造开始", C.yellow],
    ["2", "画出流转关系", "谁输入、谁审批、谁看结果", C.teal],
    ["3", "用数据复盘", "每月更新改善点", C.green],
  ].forEach(([num, title, body, color], i) => {
    const y = 1.7 + i * 0.9;
    slide.addShape(S.ellipse, { x: 1.02, y, w: 0.42, h: 0.42, fill: { color }, line: { color } });
    addText(slide, num, { x: 1.02, y: y + 0.12, w: 0.42, h: 0.1, fontSize: 7.6, bold: true, color: C.white, align: "center", fontFace: font.latin });
    addText(slide, title, { x: 1.68, y: y + 0.03, w: 2.3, h: 0.14, fontSize: 10.2, bold: true });
    addText(slide, body, { x: 1.68, y: y + 0.32, w: 2.5, h: 0.1, fontSize: 6.6, color: C.gray700 });
  });
  slide.addShape(S.roundRect, { x: 1.0, y: 4.55, w: 7.7, h: 0.38, rectRadius: 0.13, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, "B方案定位：少量固定视觉资产 + 主题页位图生成 + 可复用故事结构", { x: 1.25, y: 4.68, w: 7.18, h: 0.08, fontSize: 8.2, bold: true, align: "center" });
}

function slideVerdict(pres) {
  const slide = pres.addSlide();
  addBg(slide, 6);
  addText(slide, "判断：B方案适合做“更好看的一层”", { x: 0.72, y: 0.55, w: 5.6, h: 0.36, fontSize: 19, bold: true });
  addText(slide, "A方案负责信息结构、可编辑组件和快速产出；B方案负责高表现力页面、章节视觉、封面和客户可见的第一印象。", { x: 0.75, y: 1.12, w: 7.2, h: 0.22, fontSize: 8.4, color: C.gray700 });
  const rows = [
    ["适合", "封面、章节页、概念页、客户提案首页、故事过渡页"],
    ["不适合", "需要频繁改数字、表格、法务脚注的页面"],
    ["生产方式", "先定故事骨架，再用 B 方案生成视觉，最后整页位图封装"],
  ];
  rows.forEach(([k, v], i) => {
    const y = 1.82 + i * 0.75;
    slide.addShape(S.roundRect, { x: 0.95, y, w: 7.8, h: 0.45, rectRadius: 0.08, fill: { color: i === 0 ? C.yellowPale : C.white }, line: { color: C.gray300, width: 0.8 } });
    addText(slide, k, { x: 1.18, y: y + 0.14, w: 1.0, h: 0.1, fontSize: 8.4, bold: true });
    addText(slide, v, { x: 2.22, y: y + 0.14, w: 6.0, h: 0.1, fontSize: 7.4, color: C.gray700 });
  });
  addBitmap(slide, "b-loop-hub.png", 6.55, 3.48, 2.15, 1.55);
  addText(slide, "Next: 把这套视觉母题做成稳定资产库，再对真实提案页做 B 加工。", { x: 1.02, y: 4.72, w: 5.3, h: 0.12, fontSize: 8.2, bold: true });
}

async function main() {
  await mkdir(bitmapDir, { recursive: true });
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt";
  pres.company = "cybozu-style-ppt";
  pres.subject = "Bitmap B-route story demo source";
  pres.title = "B route bitmap story demo";
  pres.lang = "zh-CN";
  pres.theme = {
    headFontFace: "Yu Gothic",
    bodyFontFace: "Yu Gothic",
    lang: "zh-CN",
  };

  [slideCover, slidePain, slideTheme, slideSystem, slideOperation, slideVerdict].forEach((build) => build(pres));
  await pres.writeFile({ fileName: outPath });
  console.log(`wrote=${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
