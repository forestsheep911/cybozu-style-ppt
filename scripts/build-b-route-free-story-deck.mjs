import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bitmapDir = path.join(rootDir, "plugins", "cybozu-style-ppt", "assets", "bitmap-b");
const outPath = process.env.B_ROUTE_FREE_DECK_PATH
  ? path.resolve(rootDir, process.env.B_ROUTE_FREE_DECK_PATH)
  : path.join(bitmapDir, "cybozu-kintone-loop-b-free-story.pptx");
const textLockPath = path.join(bitmapDir, "cybozu-kintone-loop-b-free-text-lock.md");

const S = {
  chevron: "chevron",
  line: "line",
  rect: "rect",
  roundRect: "roundRect",
  ellipse: "ellipse",
  rightArrow: "rightArrow",
};

const C = {
  yellow: "F8C400",
  yellowDeep: "E8AA00",
  yellowSoft: "FFF0A8",
  cream: "FFF8E6",
  paper: "FFFCF2",
  ink: "121821",
  muted: "606B7D",
  gray: "D9E0EA",
  gray2: "EEF2F6",
  white: "FFFFFF",
  teal: "25A7B8",
  green: "4BAE65",
  orange: "F39A23",
  red: "E65A4F",
  blue: "3E82C7",
};

const font = {
  head: "Yu Gothic",
  body: "Yu Gothic",
  latin: "Aptos",
};

const textLock = [
  {
    claim: "kintone で業務改善を回し続ける",
    support: "改善を一回の導入で終わらせず、現場入力、承認、通知、集計、振り返りが回り続ける状態を見せる。",
    note: "最初に、これは機能紹介ではなく、業務改善が回り続ける状態を描く視覚ストーリーだと定義する。",
    mustKeep: "kintone で業務改善を回し続ける",
    free: "Poster composition, oversized cloud helper, big typography.",
  },
  {
    claim: "散らばった仕事は、毎日少しずつ改善力を奪う",
    support: "紙、Excel、メール、口頭確認が混ざると、現場も管理も正しい状態を追いかけ続ける。",
    note: "ツール批判ではなく、断片化した流れが人の判断時間を削る、という問題にする。",
    mustKeep: "紙 / Excel / メール / 現場 / 管理",
    free: "Paper storm, warning labels, chaotic workbench.",
  },
  {
    claim: "まず一つの業務を、見える流れに変える",
    support: "全社改革ではなく、ひとつの業務を入力から結果確認までつなげる。",
    note: "小さく始めることを前向きに見せる。大規模導入より、最初の循環を作ることが重要。",
    mustKeep: "一つの業務 / 入力 / 承認 / 通知 / 集計",
    free: "Journey map, yellow route, milestone flags.",
  },
  {
    claim: "入力、承認、通知、集計が同じデータの上で回る",
    support: "kintone を中心に、担当者の動きと情報の流れが同じ円環に乗る。",
    note: "ここで初めて中心循環を見せる。機能の羅列ではなく、データが動く円環として説明する。",
    mustKeep: "入力 / 承認 / 通知 / 集計 / kintone",
    free: "Orbit, gravitational system, central hub.",
  },
  {
    claim: "画面ではなく、チームの仕事場を作る",
    support: "入力フォーム、通知、グラフ、コメント、確認の場が一つの仕事場になる。",
    note: "kintone は単なる画面作成ではなく、チームが同じ場所で仕事を進める作業台として語る。",
    mustKeep: "仕事場 / チーム / 入力 / 判断",
    free: "Desk scene, sticky notes, UI fragments.",
  },
  {
    claim: "毎月、データを見て改善点を更新する",
    support: "導入後は、集計、振り返り、改善案、次のアプリ変更を繰り返す。",
    note: "導入後の運用こそ主役。改善はプロジェクトではなく、毎月回す習慣として見せる。",
    mustKeep: "毎月 / データ / 改善点 / 更新",
    free: "Calendar loop, stamps, helper mascot.",
  },
  {
    claim: "改善の型が残ると、別の部署にも広げられる",
    support: "最初の業務で作った流れ、項目、権限、通知、集計の型を横展開する。",
    note: "横展開を『コピーする資料』ではなく、『増えていく改善の型』として見せる。",
    mustKeep: "型 / 横展開 / 別部署",
    free: "Seed/garden or branching map, repeated mini loops.",
  },
  {
    claim: "だから、業務改善は止まらない",
    support: "小さく始め、見える流れを作り、毎月見直し、改善の型を広げる。",
    note: "最後は製品名ではなく状態を残す。kintone があるから改善が回り続ける、という記憶で終える。",
    mustKeep: "業務改善は止まらない / kintone",
    free: "Closing poster, cloud helper, circular path leaving the page.",
  },
];

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

function addNotes(slide, index) {
  const item = textLock[index];
  slide.addNotes([
    `Claim: ${item.claim}`,
    `Support: ${item.support}`,
    `Speaking angle: ${item.note}`,
    `Editability: Route B hybrid. The visual composition is image-led; only presentation labels, page numbers, and notes should be treated as late-edit objects.`,
  ].join("\n"));
}

function addImage(slide, file, x, y, w, h, transparency = 0) {
  slide.addImage({ path: path.join(bitmapDir, file), x, y, w, h, transparency });
}

function addPage(slide, n, label = "B ROUTE / FREE VISUAL STORY") {
  addText(slide, label, { x: 0.42, y: 0.22, w: 2.6, h: 0.12, fontFace: font.latin, fontSize: 5.4, bold: true, color: C.yellowDeep, charSpace: 1 });
  addText(slide, String(n).padStart(2, "0"), { x: 9.15, y: 5.2, w: 0.42, h: 0.12, fontFace: font.latin, fontSize: 6.2, color: C.muted, align: "right" });
}

function addPaper(slide, text, x, y, w, h, rotate, color = C.white) {
  slide.addShape(S.roundRect, { x, y, w, h, rotate, rectRadius: 0.04, fill: { color }, line: { color: C.gray, width: 0.6 } });
  addText(slide, text, { x: x + 0.08, y: y + h * 0.34, w: w - 0.16, h: 0.08, rotate, fontSize: 5.4, bold: true, color: C.muted, align: "center" });
}

function addRibbon(slide, text, x, y, w, color = C.yellow) {
  slide.addShape(S.roundRect, { x, y, w, h: 0.28, rectRadius: 0.08, fill: { color }, line: { color: color === C.white ? C.gray : color } });
  addText(slide, text, { x: x + 0.1, y: y + 0.09, w: w - 0.2, h: 0.07, fontSize: 6.4, bold: true, color: C.ink, align: "center" });
}

function addDottedField(slide, x, y, cols, rows, color = C.yellow) {
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      slide.addShape(S.ellipse, { x: x + c * 0.08, y: y + r * 0.08, w: 0.018, h: 0.018, fill: { color, transparency: 18 }, line: { color, transparency: 100 } });
    }
  }
}

function slide01(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.cream };
  slide.addShape(S.rect, { x: 0, y: 0, w: 10, h: 5.625, fill: { color: C.cream }, line: { color: C.cream } });
  addDottedField(slide, 0.82, 0.75, 10, 6, C.yellow);
  addImage(slide, "b-cloud-helper.png", 5.35, 0.38, 4.55, 3.55, 0);
  [0, 1, 2, 3].forEach((i) => {
    slide.addShape(S.chevron, { x: 5.05 + i * 0.44, y: 3.86 - i * 0.1, w: 0.38, h: 0.22, fill: { color: C.yellow }, line: { color: C.yellow } });
  });
  addText(slide, "kintone で", { x: 0.75, y: 1.14, w: 4.2, h: 0.38, fontSize: 25, bold: true });
  addText(slide, "業務改善を\n回し続ける", { x: 0.75, y: 1.74, w: 5.2, h: 1.08, fontSize: 32, bold: true, breakLine: false });
  addText(slide, "一回の導入で終わらせず、現場の入力から毎月の見直しまでを同じ流れで回す。", { x: 0.82, y: 3.34, w: 4.45, h: 0.28, fontSize: 9.2, color: C.muted });
  addRibbon(slide, "Text Lock -> Visual Story", 0.82, 4.18, 2.35, C.yellow);
  addRibbon(slide, "bitmap-led", 3.35, 4.18, 1.4, C.white);
  addPage(slide, 1, "B ROUTE / POSTER OPEN");
  addNotes(slide, 0);
}

function slide02(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.paper };
  addImage(slide, "b-pain-workers.png", 2.05, 1.12, 7.0, 3.52, 6);
  addPaper(slide, "Excel", 0.5, 0.88, 1.0, 0.42, -8);
  addPaper(slide, "mail", 1.28, 1.48, 0.88, 0.36, 12);
  addPaper(slide, "paper", 0.82, 2.35, 1.0, 0.42, 7);
  addPaper(slide, "latest?", 1.28, 3.28, 1.05, 0.4, -12, C.yellowSoft);
  addPaper(slide, "approval", 7.68, 0.9, 1.1, 0.42, 10);
  addPaper(slide, "who?", 8.35, 2.0, 0.82, 0.36, -8, C.yellowSoft);
  addPaper(slide, "report", 7.62, 3.72, 1.0, 0.42, 9);
  slide.addShape(S.rect, { x: 0.48, y: 4.72, w: 8.6, h: 0.06, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, "散らばった仕事は、毎日少しずつ改善力を奪う", { x: 0.72, y: 0.36, w: 7.25, h: 0.34, fontSize: 19.5, bold: true });
  addText(slide, "紙、Excel、メール、口頭確認。どれも間違いではないが、流れが見えないと判断が遅れる。", { x: 0.78, y: 4.95, w: 7.6, h: 0.18, fontSize: 8.1, color: C.muted });
  addPage(slide, 2, "B ROUTE / PAIN SCENE");
  addNotes(slide, 1);
}

function slide03(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.cream };
  addText(slide, "まず一つの業務を、\n見える流れに変える", { x: 0.68, y: 0.56, w: 4.4, h: 0.72, fontSize: 24, bold: true, breakLine: false });
  addText(slide, "大きな改革ではなく、最初の一周を作る。", { x: 0.72, y: 1.58, w: 3.5, h: 0.16, fontSize: 8.5, color: C.muted });
  [
    [1.52, 3.52],
    [2.45, 3.24],
    [3.38, 2.96],
    [4.32, 2.72],
    [5.28, 2.5],
    [6.22, 2.36],
    [7.14, 2.3],
  ].forEach(([x, y]) => {
    slide.addShape(S.chevron, { x, y, w: 0.34, h: 0.22, fill: { color: C.yellow }, line: { color: C.yellow } });
  });
  const stops = [
    ["入力", 1.05, 3.35, C.yellow],
    ["承認", 2.65, 3.0, C.orange],
    ["通知", 4.3, 2.63, C.teal],
    ["集計", 5.95, 2.35, C.green],
    ["見直し", 7.42, 2.22, C.blue],
  ];
  stops.forEach(([label, x, y, color], i) => {
    slide.addShape(S.ellipse, { x, y, w: 0.5, h: 0.5, fill: { color }, line: { color } });
    addText(slide, String(i + 1), { x, y: y + 0.15, w: 0.5, h: 0.1, fontSize: 7.5, bold: true, color: C.white, align: "center", fontFace: font.latin });
    addText(slide, label, { x: x - 0.18, y: y + 0.62, w: 0.88, h: 0.12, fontSize: 7.2, bold: true, align: "center" });
  });
  addImage(slide, "b-cloud-helper.png", 6.25, 0.58, 2.35, 1.75, 8);
  addDottedField(slide, 5.2, 4.48, 16, 4, C.teal);
  addPage(slide, 3, "B ROUTE / JOURNEY MAP");
  addNotes(slide, 2);
}

function slide04(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.paper };
  addImage(slide, "b-loop-hub.png", 2.28, 0.72, 5.45, 3.64, 0);
  slide.addShape(S.ellipse, { x: 1.16, y: 0.96, w: 7.56, h: 3.6, fill: { color: C.white, transparency: 100 }, line: { color: C.yellow, transparency: 55, width: 2.2 } });
  [0, 1, 2].forEach((i) => {
    slide.addShape(S.chevron, { x: 7.68 + i * 0.16, y: 2.58 + i * 0.08, w: 0.3, h: 0.18, rotate: 42, fill: { color: C.yellow }, line: { color: C.yellow } });
  });
  addText(slide, "入力、承認、通知、集計が\n同じデータの上で回る", { x: 0.72, y: 4.34, w: 5.9, h: 0.52, fontSize: 20.5, bold: true, breakLine: false });
  const labels = [
    ["入力", 1.05, 1.28, C.yellow],
    ["承認", 1.35, 3.38, C.orange],
    ["通知", 8.0, 1.42, C.teal],
    ["集計", 8.08, 3.34, C.green],
  ];
  labels.forEach(([label, x, y, color]) => {
    slide.addShape(S.ellipse, { x, y, w: 0.46, h: 0.46, fill: { color }, line: { color } });
    addText(slide, label, { x: x + 0.58, y: y + 0.16, w: 0.7, h: 0.09, fontSize: 7.8, bold: true });
  });
  addPage(slide, 4, "B ROUTE / ORBIT");
  addNotes(slide, 3);
}

function slide05(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.cream };
  addImage(slide, "b-style-board.png", 0.52, 1.18, 5.18, 3.1, 3);
  addText(slide, "画面ではなく、\nチームの仕事場を作る", { x: 6.12, y: 0.82, w: 3.12, h: 0.78, fontSize: 23, bold: true, breakLine: false });
  addText(slide, "フォーム、通知、コメント、グラフ、確認の場が一つの作業台になる。", { x: 6.18, y: 1.9, w: 3.05, h: 0.28, fontSize: 8.2, color: C.muted });
  [["フォーム", 6.05, 2.55, C.yellow], ["通知", 7.3, 2.9, C.teal], ["コメント", 6.35, 3.55, C.orange], ["判断", 7.72, 3.92, C.green]].forEach(([t, x, y, color]) => {
    slide.addShape(S.roundRect, { x, y, w: 0.98, h: 0.34, rectRadius: 0.08, fill: { color }, line: { color } });
    addText(slide, t, { x: x + 0.08, y: y + 0.115, w: 0.82, h: 0.08, fontSize: 6.3, bold: true, color: C.white, align: "center" });
  });
  addPage(slide, 5, "B ROUTE / WORKBENCH");
  addNotes(slide, 4);
}

function slide06(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.paper };
  addText(slide, "毎月、データを見て\n改善点を更新する", { x: 0.72, y: 0.56, w: 4.4, h: 0.75, fontSize: 24, bold: true, breakLine: false });
  addImage(slide, "b-cloud-helper.png", 6.1, 0.82, 2.75, 2.18, 8);
  const months = ["1", "2", "3", "4", "5", "6"];
  months.forEach((m, i) => {
    const x = 0.92 + i * 0.8;
    slide.addShape(S.roundRect, { x, y: 2.2, w: 0.58, h: 0.58, rectRadius: 0.05, fill: { color: i === 5 ? C.yellowSoft : C.white }, line: { color: C.gray } });
    addText(slide, m, { x, y: 2.38, w: 0.58, h: 0.1, fontSize: 7.4, bold: true, align: "center", fontFace: font.latin, color: i === 5 ? C.yellowDeep : C.muted });
  });
  [[3.15, 3.46], [3.75, 3.72], [4.42, 3.82], [5.08, 3.72], [5.72, 3.46]].forEach(([x, y], i) => {
    slide.addShape(S.chevron, { x, y, w: 0.34, h: 0.22, rotate: i < 2 ? 20 : i > 2 ? -20 : 0, fill: { color: C.yellow }, line: { color: C.yellow } });
  });
  [["集計", 2.65, 4.02, C.teal], ["振り返り", 4.25, 4.32, C.orange], ["改善案", 5.85, 4.02, C.green]].forEach(([t, x, y, color]) => {
    slide.addShape(S.ellipse, { x, y, w: 0.58, h: 0.58, fill: { color }, line: { color } });
    addText(slide, t, { x: x - 0.2, y: y + 0.72, w: 1.0, h: 0.1, fontSize: 7.1, bold: true, align: "center" });
  });
  addText(slide, "導入後の運用こそ、改善が続くかどうかを決める。", { x: 0.76, y: 1.58, w: 4.0, h: 0.18, fontSize: 8.2, color: C.muted });
  addPage(slide, 6, "B ROUTE / MONTHLY LOOP");
  addNotes(slide, 5);
}

function slide07(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.cream };
  addText(slide, "改善の型が残ると、\n別の部署にも広げられる", { x: 0.72, y: 0.56, w: 5.0, h: 0.76, fontSize: 23, bold: true, breakLine: false });
  addImage(slide, "b-loop-hub.png", 0.86, 2.18, 2.4, 1.6, 10);
  const branches = [
    [3.42, 1.62, "営業", C.yellow],
    [5.08, 2.3, "人事", C.teal],
    [6.62, 3.02, "製造", C.orange],
    [4.28, 4.05, "管理", C.green],
  ];
  branches.forEach(([x, y, label, color]) => {
    slide.addShape(S.roundRect, { x: 2.92, y: 2.82, w: Math.max(0.42, x - 2.92), h: 0.06, rectRadius: 0.02, fill: { color: C.yellow, transparency: 25 }, line: { color: C.yellow, transparency: 100 } });
    slide.addShape(S.roundRect, { x, y: Math.min(y + 0.34, 2.84), w: 0.06, h: Math.abs(y + 0.34 - 2.84), rectRadius: 0.02, fill: { color: C.yellow, transparency: 25 }, line: { color: C.yellow, transparency: 100 } });
    slide.addShape(S.roundRect, { x, y, w: 1.28, h: 0.68, rectRadius: 0.16, fill: { color: C.white }, line: { color: C.gray } });
    slide.addShape(S.ellipse, { x: x + 0.12, y: y + 0.2, w: 0.28, h: 0.28, fill: { color }, line: { color } });
    addText(slide, label, { x: x + 0.5, y: y + 0.23, w: 0.55, h: 0.1, fontSize: 7.6, bold: true });
  });
  addText(slide, "最初の一周が、次の部署の出発点になる。", { x: 0.78, y: 1.58, w: 4.1, h: 0.16, fontSize: 8.2, color: C.muted });
  addPage(slide, 7, "B ROUTE / BRANCHING");
  addNotes(slide, 6);
}

function slide08(pres) {
  const slide = pres.addSlide();
  slide.background = { color: C.paper };
  addImage(slide, "b-cloud-helper.png", 5.35, 0.72, 3.85, 2.92, 3);
  addText(slide, "だから、\n業務改善は止まらない", { x: 0.76, y: 0.9, w: 5.0, h: 0.86, fontSize: 29, bold: true, breakLine: false });
  addText(slide, "小さく始める。流れを見える化する。毎月見直す。型を広げる。", { x: 0.82, y: 2.38, w: 4.6, h: 0.18, fontSize: 8.8, color: C.muted });
  [[1.15, 3.72], [2.05, 3.88], [2.95, 3.98], [3.86, 3.98], [4.76, 3.88], [5.66, 3.72]].forEach(([x, y], i) => {
    slide.addShape(S.chevron, { x, y, w: 0.36, h: 0.24, rotate: i < 3 ? 10 : -10, fill: { color: C.yellow }, line: { color: C.yellow } });
  });
  ["start small", "visible flow", "monthly review", "spread the pattern"].forEach((t, i) => {
    addRibbon(slide, t, 0.98 + i * 1.72, 4.32 - (i % 2) * 0.32, 1.38, i === 0 ? C.yellow : C.white);
  });
  addPage(slide, 8, "B ROUTE / CLOSING POSTER");
  addNotes(slide, 7);
}

async function writeTextLock() {
  const body = [
    "# Text Lock: kintone で業務改善を回し続ける / Route B Free Story",
    "",
    "This Text Lock is the shared content final draft for the free-composition B-route deck. It intentionally avoids layout instructions.",
    "",
    ...textLock.flatMap((item, index) => [
      `## ${index + 1}. ${item.claim}`,
      "",
      `- support: ${item.support}`,
      `- speaker note: ${item.note}`,
      `- must keep: ${item.mustKeep}`,
      `- free to change: ${item.free}`,
      "",
    ]),
  ].join("\n");
  await writeFile(textLockPath, body, "utf8");
}

async function main() {
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeTextLock();
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt";
  pres.company = "cybozu-style-ppt";
  pres.subject = "Route B free visual-story deck from Text Lock";
  pres.title = "kintone loop B free story";
  pres.lang = "zh-CN";
  pres.theme = {
    headFontFace: font.head,
    bodyFontFace: font.body,
    lang: "zh-CN",
  };
  pres.defineLayout({ name: "LAYOUT_16x9", width: 10, height: 5.625 });

  [slide01, slide02, slide03, slide04, slide05, slide06, slide07, slide08].forEach((build) => build(pres));
  await pres.writeFile({ fileName: outPath });
  console.log(`text_lock=${textLockPath}`);
  console.log(`wrote=${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
