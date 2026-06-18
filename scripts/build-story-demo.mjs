import { readFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetDir = path.join(rootDir, "plugins", "cybozu-style-ppt", "assets");
const outPath = process.env.STORY_DEMO_PATH
  ? path.resolve(rootDir, process.env.STORY_DEMO_PATH)
  : path.join(assetDir, "cybozu-story-demo-kintone-loop.pptx");

const manifest = JSON.parse(readFileSync(path.join(assetDir, "characters", "manifest.json"), "utf8"));
const byId = Object.fromEntries(manifest.map((asset) => [asset.id, asset]));

const S = {
  rect: "rect",
  roundRect: "roundRect",
  line: "line",
  ellipse: "ellipse",
  chevron: "chevron",
  rightArrow: "rightArrow",
  arc: "arc",
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

function addChrome(slide, title, page, eyebrow = "story demo / reusable character assets") {
  slide.background = { color: C.white };
  slide.addShape(S.rect, { x: 0, y: 0.05, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0, y: 5.48, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0.55, y: 0.48, w: 0.14, h: 0.12, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, title, { x: 0.78, y: 0.32, w: 7.9, h: 0.36, fontSize: 17.5, bold: true });
  addText(slide, eyebrow, { x: 0.78, y: 0.72, w: 4.8, h: 0.16, fontSize: 6.8, color: C.gray500, fontFace: font.latin });
  addText(slide, String(page).padStart(2, "0"), { x: 8.95, y: 5.18, w: 0.5, h: 0.18, fontSize: 7.2, bold: true, color: C.gray500, align: "right", fontFace: font.latin });
}

function addAsset(slide, id, { x, y, w, h }) {
  const asset = byId[id];
  if (!asset) throw new Error(`Unknown asset id: ${id}`);
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

function addPill(slide, text, x, y, w, h, fill = C.yellow, color = C.ink) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
  addText(slide, text, { x: x + 0.12, y: y + h * 0.27, w: w - 0.24, h: h * 0.35, fontSize: 8, bold: true, color, align: "center" });
}

function addCard(slide, { x, y, w, h, title, body, accent = C.yellow, num }) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
  slide.addShape(S.rect, { x, y, w: 0.08, h, fill: { color: accent }, line: { color: accent } });
  if (num) {
    slide.addShape(S.ellipse, { x: x + 0.22, y: y + 0.22, w: 0.38, h: 0.38, fill: { color: accent }, line: { color: accent } });
    addText(slide, num, { x: x + 0.22, y: y + 0.33, w: 0.38, h: 0.1, fontSize: 7, bold: true, color: C.white, align: "center", fontFace: font.latin });
  }
  addText(slide, title, { x: x + 0.75, y: y + 0.2, w: w - 0.95, h: 0.2, fontSize: 10.5, bold: true });
  addText(slide, body, { x: x + 0.75, y: y + 0.54, w: w - 0.95, h: h - 0.65, fontSize: 6.8, color: C.gray700 });
}

function addRoleChip(slide, { x, y, w = 1.2, label, sub, color = C.yellow }) {
  slide.addShape(S.roundRect, { x, y, w, h: 0.48, rectRadius: 0.13, fill: { color: C.white }, line: { color, width: 1.1 } });
  slide.addShape(S.ellipse, { x: x + 0.13, y: y + 0.13, w: 0.22, h: 0.22, fill: { color }, line: { color } });
  addText(slide, label, { x: x + 0.45, y: y + 0.12, w: w - 0.55, h: 0.1, fontSize: 6.5, bold: true });
  addText(slide, sub, { x: x + 0.45, y: y + 0.29, w: w - 0.55, h: 0.08, fontSize: 5, color: C.gray700, fontFace: font.latin });
}

function addDashboard(slide, x, y, w, h) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
  slide.addShape(S.rect, { x, y, w, h: 0.34, fill: { color: C.gray100 }, line: { color: C.gray100 } });
  slide.addShape(S.rect, { x: x + 0.18, y: y + 0.13, w: 0.92, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  for (let i = 0; i < 4; i += 1) {
    const rowY = y + 0.58 + i * 0.18;
    slide.addShape(S.ellipse, { x: x + 0.28, y: rowY, w: 0.12, h: 0.12, fill: { color: [C.yellow, C.teal, C.orange, C.green, C.blue][i] }, line: { color: C.white } });
    slide.addShape(S.rect, { x: x + 0.48, y: rowY + 0.03, w: w * 0.38, h: 0.05, fill: { color: C.gray300 }, line: { color: C.gray300 } });
    slide.addShape(S.rect, { x: x + 0.48, y: rowY + 0.14, w: w * 0.24, h: 0.04, fill: { color: C.gray200 }, line: { color: C.gray200 } });
  }
  [0.45, 0.65, 0.88, 1.05].forEach((barH, i) => {
    slide.addShape(S.roundRect, {
      x: x + w - 1.2 + i * 0.25,
      y: y + h - 0.34 - barH,
      w: 0.16,
      h: barH,
      rectRadius: 0.03,
      fill: { color: [C.yellow, C.teal, C.green, C.orange][i] },
      line: { color: C.white },
    });
  });
}

function slideCover(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.cream };
  slide.addShape(S.rect, { x: 0, y: 0.05, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0, y: 5.48, w: 10, h: 0.08, fill: { color: C.yellow }, line: { color: C.yellow } });
  addAsset(slide, "CHAR-021", { x: 0.72, y: 0.95, w: 1.25, h: 0.78 });
  addText(slide, "kintone で業務改善を回し続ける", { x: 0.72, y: 1.88, w: 5.7, h: 0.52, fontSize: 24, bold: true });
  addText(slide, "分散した入力、承認、集計をひとつの流れに変える 6 枚のデモストーリー。", { x: 0.75, y: 2.72, w: 5.1, h: 0.28, fontSize: 10.2, color: C.gray700 });
  addPill(slide, "native PPT structure", 0.75, 3.28, 1.62, 0.34);
  addPill(slide, "approved assets", 2.55, 3.28, 1.35, 0.34, C.white);
  addPill(slide, "story rhythm", 4.08, 3.28, 1.2, 0.34, C.white);
  addAsset(slide, "CHAR-019", { x: 6.2, y: 1.1, w: 2.35, h: 2.25 });
  addDashboard(slide, 6.62, 3.55, 2.45, 1.48);
  addText(slide, "01", { x: 8.95, y: 5.18, w: 0.5, h: 0.18, fontSize: 7.2, bold: true, color: C.gray500, align: "right", fontFace: font.latin });
}

function slidePain(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "紙・Excel・メールが分かれるほど、改善は遅くなる", 2);
  addText(slide, "現場は入力に追われ、管理部門は確認に追われる。問題はツールの数ではなく、業務の流れが一枚につながっていないこと。", { x: 0.8, y: 1.08, w: 6.9, h: 0.3, fontSize: 8.8, color: C.gray700 });
  addAsset(slide, "CHAR-032", { x: 0.82, y: 1.66, w: 1.48, h: 1.38 });
  addAsset(slide, "CHAR-030", { x: 7.54, y: 1.55, w: 1.35, h: 1.48 });
  addCard(slide, { x: 2.45, y: 1.55, w: 2.1, h: 1.18, title: "入力が散在", body: "紙、Excel、メールで最新版と担当者が見えない。", accent: C.orange, num: "1" });
  addCard(slide, { x: 4.72, y: 1.55, w: 2.1, h: 1.18, title: "承認が止まる", body: "差戻し、確認、証跡が人の記憶に残る。", accent: C.red, num: "2" });
  addCard(slide, { x: 2.45, y: 3.15, w: 2.1, h: 1.18, title: "集計が遅れる", body: "転記と集計で判断のタイミングを逃す。", accent: C.teal, num: "3" });
  addCard(slide, { x: 4.72, y: 3.15, w: 2.1, h: 1.18, title: "型が残らない", body: "改善できても、別部署に横展開しにくい。", accent: C.green, num: "4" });
  addAsset(slide, "CHAR-031", { x: 7.2, y: 3.28, w: 1.55, h: 1.35 });
}

function slideRoles(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "まず、誰が何を回すのかを見える化する", 3);
  addText(slide, "人物イラストは主役ではなく、業務上の責任を読むための視線誘導として使う。役割は chip と表で editable に残す。", { x: 0.8, y: 1.08, w: 7.4, h: 0.25, fontSize: 8.7, color: C.gray700 });
  const roles = [
    ["CHAR-038", "現場", "input", C.yellow],
    ["CHAR-039", "管理", "approve", C.teal],
    ["CHAR-035", "部門", "share", C.orange],
    ["CHAR-036", "会議", "decide", C.green],
  ];
  roles.forEach(([asset, label, sub, color], i) => {
    const x = 0.95 + i * 2.1;
    slide.addShape(S.roundRect, { x, y: 1.65, w: 1.55, h: 1.18, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
    addAsset(slide, asset, { x: x + 0.3, y: 1.82, w: 0.95, h: 0.55 });
    addRoleChip(slide, { x: x + 0.16, y: 2.32, w: 1.22, label, sub, color });
  });
  addText(slide, "責任分担の読み方", { x: 1.05, y: 3.2, w: 1.5, h: 0.18, fontSize: 10.5, bold: true });
  [
    ["業務入力", "R", "A", "C", "I"],
    ["差戻し対応", "R", "A", "C", "-"],
    ["月次改善", "C", "A", "R", "I"],
  ].forEach((row, i) => {
    const y = 3.55 + i * 0.42;
    slide.addShape(S.roundRect, { x: 1.0, y, w: 7.9, h: 0.3, rectRadius: 0.04, fill: { color: i % 2 ? C.white : C.gray100 }, line: { color: C.gray200 } });
    row.forEach((cell, j) => {
      addText(slide, cell, { x: 1.18 + j * 1.45, y: y + 0.1, w: j === 0 ? 1.2 : 0.4, h: 0.08, fontSize: j === 0 ? 6.5 : 7.4, bold: j > 0, color: j === 0 ? C.gray700 : C.ink, fontFace: j === 0 ? font.body : font.latin, align: j === 0 ? "left" : "center" });
    });
  });
}

function slideSolution(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "kintone を中心に、入力から改善までを一つの循環にする", 4);
  addText(slide, "画面を作ることが目的ではない。入力、承認、通知、集計、改善が同じ業務データの上で回る状態を作る。", { x: 0.8, y: 1.08, w: 7.15, h: 0.25, fontSize: 8.7, color: C.gray700 });
  addAsset(slide, "CHAR-021", { x: 4.2, y: 2.05, w: 1.38, h: 0.8 });
  const nodes = [
    [0.95, 1.85, "入力", "現場から即時登録", C.yellow],
    [2.75, 1.85, "承認", "差戻しも履歴化", C.orange],
    [6.0, 1.85, "通知", "次の担当へ渡す", C.teal],
    [7.82, 1.85, "集計", "判断材料を作る", C.green],
  ];
  nodes.forEach(([x, y, title, body, color]) => {
    slide.addShape(S.roundRect, { x, y, w: 1.28, h: 0.95, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
    slide.addShape(S.ellipse, { x: x + 0.43, y: y + 0.16, w: 0.4, h: 0.4, fill: { color }, line: { color } });
    addText(slide, title, { x: x + 0.18, y: y + 0.62, w: 0.92, h: 0.1, fontSize: 7.5, bold: true, align: "center" });
    addText(slide, body, { x: x + 0.12, y: y + 0.77, w: 1.04, h: 0.08, fontSize: 5.1, color: C.gray700, align: "center" });
  });
  [2.33, 3.48, 5.72, 7.15].forEach((x) => {
    slide.addShape(S.chevron, { x, y: 2.2, w: 0.45, h: 0.34, fill: { color: C.yellow }, line: { color: C.yellow } });
  });
  addDashboard(slide, 1.25, 3.35, 3.1, 1.42);
  addAsset(slide, "CHAR-044", { x: 5.05, y: 3.28, w: 3.55, h: 1.55 });
}

function slideLoop(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "改善は一回の導入ではなく、毎月の運用で強くなる", 5);
  addText(slide, "承認済みの状態、AI/自動化の補助、データ蓄積を同じストーリーに並べると、導入後の運用イメージが伝わりやすい。", { x: 0.8, y: 1.08, w: 7.4, h: 0.25, fontSize: 8.7, color: C.gray700 });
  const items = [
    ["CHAR-042", "承認済みの型を作る", "承認や証跡をルール化し、属人運用から抜ける。", C.yellow],
    ["CHAR-043", "AI と人が補助する", "入力補助、分類、確認を組み合わせて運用負荷を下げる。", C.teal],
    ["CHAR-023", "改善ループを回す", "課題発見、アプリ化、業務改善を同じ循環に載せる。", C.green],
  ];
  items.forEach(([asset, title, body, color], i) => {
    const x = 0.88 + i * 3.0;
    slide.addShape(S.roundRect, { x, y: 1.68, w: 2.48, h: 2.55, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300, width: 1 } });
    addAsset(slide, asset, { x: x + 0.22, y: 1.88, w: 2.05, h: 1.05 });
    slide.addShape(S.rect, { x, y: 4.0, w: 2.48, h: 0.06, fill: { color }, line: { color } });
    addText(slide, title, { x: x + 0.22, y: 3.17, w: 2.05, h: 0.17, fontSize: 10.2, bold: true, align: "center" });
    addText(slide, body, { x: x + 0.28, y: 3.53, w: 1.92, h: 0.25, fontSize: 6.2, color: C.gray700, align: "center" });
  });
  addText(slide, "Asset rule: scene images carry the visual story; proof text stays editable.", { x: 2.8, y: 4.72, w: 4.4, h: 0.12, fontSize: 6.3, color: C.gray500, align: "center", fontFace: font.latin });
}

function slideNext(pres) {
  const slide = pres.addSlide();
  addChrome(slide, "次は、対象業務を一つ選んで 30 分で流れを描く", 6);
  addText(slide, "このデモでは、キャラクターは雰囲気づくりではなく、業務ストーリーの入口として使った。最後は具体的な次アクションに戻す。", { x: 0.8, y: 1.08, w: 7.3, h: 0.25, fontSize: 8.7, color: C.gray700 });
  const steps = [
    ["対象業務", "紙・Excel が残る業務を選ぶ", C.yellow],
    ["流れを書く", "入力、承認、集計、通知を並べる", C.teal],
    ["画面を見る", "kintone で最小構成を確認", C.orange],
    ["運用を決める", "誰が更新し、誰が見るか決める", C.green],
  ];
  steps.forEach(([title, body, color], i) => {
    const x = 0.92 + i * 2.1;
    slide.addShape(S.ellipse, { x: x + 0.58, y: 1.82, w: 0.5, h: 0.5, fill: { color }, line: { color } });
    addText(slide, String(i + 1), { x: x + 0.58, y: 1.96, w: 0.5, h: 0.12, fontSize: 8.5, bold: true, color: C.white, align: "center", fontFace: font.latin });
    slide.addShape(S.roundRect, { x, y: 2.55, w: 1.66, h: 1.02, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300 } });
    addText(slide, title, { x: x + 0.16, y: 2.8, w: 1.34, h: 0.16, fontSize: 9.5, bold: true, align: "center" });
    addText(slide, body, { x: x + 0.18, y: 3.13, w: 1.3, h: 0.18, fontSize: 5.8, color: C.gray700, align: "center" });
    if (i < steps.length - 1) {
      slide.addShape(S.rightArrow, { x: x + 1.77, y: 2.95, w: 0.28, h: 0.18, fill: { color: C.yellow }, line: { color: C.yellow } });
    }
  });
  addShapeCta(slide);
  addAsset(slide, "CHAR-024", { x: 7.68, y: 3.75, w: 0.9, h: 1.0 });
}

function addShapeCta(slide) {
  slide.addShape(S.roundRect, { x: 1.12, y: 4.28, w: 7.15, h: 0.5, rectRadius: 0.14, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, "Demo conclusion: assets can work when each slide keeps one visual family and one clear claim.", { x: 1.34, y: 4.45, w: 6.72, h: 0.12, fontSize: 8.6, bold: true, align: "center", fontFace: font.latin });
}

async function main() {
  await mkdir(path.dirname(outPath), { recursive: true });
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt";
  pres.company = "cybozu-style-ppt";
  pres.subject = "kintone story demo with reusable character assets";
  pres.title = "kintone loop story demo";
  pres.lang = "zh-CN";
  pres.theme = {
    headFontFace: font.head,
    bodyFontFace: font.body,
    lang: "zh-CN",
  };

  [slideCover, slidePain, slideRoles, slideSolution, slideLoop, slideNext].forEach((build) => build(pres));
  await pres.writeFile({ fileName: outPath });
  console.log(`wrote=${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
