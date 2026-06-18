import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const bitmapDir = path.join(rootDir, "plugins", "cybozu-style-ppt", "assets", "bitmap-b");
const outPath = process.env.B_ROUTE_FULL_DECK_PATH
  ? path.resolve(rootDir, process.env.B_ROUTE_FULL_DECK_PATH)
  : path.join(bitmapDir, "cybozu-story-demo-b-full.pptx");

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
  yellowPale: "FFF1B6",
  cream: "FFF8E6",
  cream2: "FFFCF3",
  ink: "141A22",
  gray800: "2E3440",
  gray700: "4F5B6B",
  gray500: "8791A2",
  gray300: "D6DDE8",
  gray200: "EBEFF5",
  gray100: "F6F8FA",
  white: "FFFFFF",
  teal: "24A7B7",
  green: "4BAE65",
  orange: "F39A24",
  red: "E65A4F",
  blue: "3D80C2",
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

function addNotes(slide, notes) {
  slide.addNotes(notes.join("\n"));
}

function addFrame(slide, page, kicker = "B ROUTE / VISUAL STORY SYSTEM") {
  slide.background = { color: C.cream };
  slide.addShape(S.rect, { x: 0, y: 0, w: 10, h: 0.13, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.rect, { x: 0, y: 5.48, w: 10, h: 0.14, fill: { color: C.yellow }, line: { color: C.yellow } });
  slide.addShape(S.ellipse, { x: 8.95, y: 0.28, w: 0.18, h: 0.18, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, kicker, { x: 0.72, y: 0.32, w: 3.7, h: 0.14, fontSize: 5.8, bold: true, color: C.yellowDeep, fontFace: font.latin, charSpace: 1.1 });
  addText(slide, String(page).padStart(2, "0"), { x: 9.03, y: 5.17, w: 0.42, h: 0.16, fontSize: 7, color: C.gray500, fontFace: font.latin, align: "right" });
}

function addTitle(slide, title, subtitle) {
  addText(slide, title, { x: 0.72, y: 0.68, w: 7.9, h: 0.42, fontSize: 19.5, bold: true });
  if (subtitle) {
    addText(slide, subtitle, { x: 0.74, y: 1.24, w: 7.25, h: 0.22, fontSize: 8.2, color: C.gray700 });
  }
}

function addImage(slide, file, x, y, w, h, transparency = 0) {
  slide.addImage({ path: path.join(bitmapDir, file), x, y, w, h, transparency });
}

function addPill(slide, label, x, y, w, fill = C.white, color = C.ink) {
  slide.addShape(S.roundRect, { x, y, w, h: 0.34, rectRadius: 0.13, fill: { color: fill }, line: { color: fill === C.white ? C.gray300 : fill, width: 0.8 } });
  addText(slide, label, { x: x + 0.12, y: y + 0.118, w: w - 0.24, h: 0.08, fontSize: 7.2, bold: true, color, align: "center" });
}

function addMiniCard(slide, { x, y, w, h, title, body, accent = C.yellow, num }) {
  slide.addShape(S.roundRect, { x, y, w, h, rectRadius: 0.07, fill: { color: C.white }, line: { color: C.gray300, width: 0.8 } });
  slide.addShape(S.rect, { x, y, w: 0.07, h, fill: { color: accent }, line: { color: accent } });
  if (num) {
    slide.addShape(S.ellipse, { x: x + 0.2, y: y + 0.18, w: 0.32, h: 0.32, fill: { color: accent }, line: { color: accent } });
    addText(slide, num, { x: x + 0.2, y: y + 0.275, w: 0.32, h: 0.09, fontSize: 6.4, bold: true, color: C.white, align: "center", fontFace: font.latin });
  }
  const textX = x + (num ? 0.68 : 0.24);
  addText(slide, title, { x: textX, y: y + 0.18, w: w - (textX - x) - 0.18, h: 0.16, fontSize: 8.8, bold: true });
  addText(slide, body, { x: textX, y: y + 0.48, w: w - (textX - x) - 0.18, h: h - 0.56, fontSize: 5.8, color: C.gray700 });
}

function addCallout(slide, text, x, y, w, color = C.yellowPale) {
  slide.addShape(S.roundRect, { x, y, w, h: 0.5, rectRadius: 0.12, fill: { color }, line: { color: C.gray300, width: 0.7 } });
  addText(slide, text, { x: x + 0.22, y: y + 0.17, w: w - 0.44, h: 0.13, fontSize: 7.2, color: C.gray800, bold: true, align: "center" });
}

function slide01(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 1, "B ROUTE / FULL DECK");
  addImage(slide, "b-cloud-helper.png", 5.45, 0.62, 3.75, 2.5, 18);
  addText(slide, "B方案正式样张", { x: 0.72, y: 0.95, w: 1.8, h: 0.18, fontSize: 9.5, color: C.yellowDeep, bold: true });
  addText(slide, "kintone で業務改善を\n回し続ける", { x: 0.72, y: 1.38, w: 5.1, h: 0.82, fontSize: 28, bold: true });
  addText(slide, "小资产先完成视觉定型，再根据叙事把它们组织成完整 deck。B 方案负责第一印象、章节气氛和客户能快速理解的业务场景。", { x: 0.76, y: 2.72, w: 5.2, h: 0.36, fontSize: 9.2, color: C.gray700 });
  addPill(slide, "story spine", 0.76, 3.42, 1.25, C.yellow);
  addPill(slide, "bitmap motifs", 2.18, 3.42, 1.45);
  addPill(slide, "editable judgment layer", 3.82, 3.42, 1.85);
  slide.addShape(S.roundRect, { x: 6.22, y: 3.25, w: 2.75, h: 1.42, rectRadius: 0.11, fill: { color: C.white }, line: { color: C.gray300 } });
  addText(slide, "B route output", { x: 6.45, y: 3.5, w: 1.4, h: 0.12, fontSize: 7.4, color: C.gray500, fontFace: font.latin });
  addText(slide, "8", { x: 6.45, y: 3.76, w: 0.5, h: 0.3, fontSize: 21, bold: true, fontFace: font.latin });
  addText(slide, "页完整叙事\n含演讲备注", { x: 7.02, y: 3.82, w: 1.45, h: 0.34, fontSize: 8.2, bold: true });
  addCallout(slide, "定位：不是替代 A 方案，而是把关键页面做成更强的视觉层。", 0.92, 4.52, 5.25, C.white);
  addNotes(slide, [
    "讲法：这页先定调，B 方案不是为了每一页都变成大图，而是让封面、章节、概念和客户可见的关键页有一致的视觉母题。",
    "强调：A 方案继续负责可编辑结构和快速交付；B 方案负责把角色、场景、情绪统一成能被复用的视觉系统。",
  ]);
}

function slide02(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 2);
  addTitle(slide, "分散した業務は、現場にも管理にも負荷を残す", "纸、Excel、邮件各自成立，但业务流没有连起来时，改善就会被拖慢。");
  addImage(slide, "b-pain-workers.png", 4.95, 1.38, 3.95, 1.98);
  const pains = [
    ["入力が散在", "最新版と担当者が見えない", C.orange],
    ["承認が止まる", "差戻しと証跡が人に残る", C.red],
    ["集計が遅れる", "判断のタイミングを逃す", C.teal],
    ["横展開できない", "改善の型が部署に残らない", C.green],
  ];
  pains.forEach(([title, body, accent], i) => addMiniCard(slide, { x: 0.86 + (i % 2) * 2.05, y: 1.74 + Math.floor(i / 2) * 1.05, w: 1.74, h: 0.78, title, body, accent, num: String(i + 1) }));
  addCallout(slide, "本当の課題はツール数ではなく、業務の流れが一枚で見えないこと。", 1.0, 4.42, 7.85);
  addNotes(slide, [
    "讲法：不要把痛点讲成工具批判。纸、Excel、邮件都可能是正确的局部选择，问题在于流转关系断开。",
    "视觉说明：右侧位图负责把‘现场和管理都累’这件事先说出来；左侧四张卡保留可编辑文本，方便替换成真实客户行业痛点。",
  ]);
}

function slide03(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 3);
  addTitle(slide, "kintone を中心に、入力から改善までを一つの循環にする", "中心循环不是装饰图，而是 B 方案里可以反复使用的视觉母题。");
  addImage(slide, "b-loop-hub.png", 3.05, 1.43, 3.8, 2.55);
  const nodes = [
    [0.88, 1.88, "入力", "現場から即時登録", C.yellow],
    [1.55, 3.78, "承認", "差戻しも履歴化", C.orange],
    [7.28, 1.88, "通知", "次の担当へ渡す", C.teal],
    [7.72, 3.78, "集計", "判断材料を作る", C.green],
  ];
  nodes.forEach(([x, y, title, body, color]) => {
    slide.addShape(S.roundRect, { x, y, w: 1.42, h: 0.78, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300 } });
    slide.addShape(S.ellipse, { x: x + 0.16, y: y + 0.23, w: 0.28, h: 0.28, fill: { color }, line: { color } });
    addText(slide, title, { x: x + 0.55, y: y + 0.2, w: 0.7, h: 0.11, fontSize: 8.2, bold: true });
    addText(slide, body, { x: x + 0.55, y: y + 0.43, w: 0.72, h: 0.08, fontSize: 5.2, color: C.gray700 });
  });
  addNotes(slide, [
    "讲法：这一页把解决方案从产品功能转成运营循环。客户需要先理解‘输入、承认、通知、集计’是同一条业务数据上的连续动作。",
    "备注：正式项目里，这四个节点可以替换为客户业务里的真实步骤，但中心循环的视觉母题保持不变。",
  ]);
}

function slide04(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 4);
  addTitle(slide, "B方案的资产不是单张好看图，而是一组可复用母题", "先把视觉资产按业务角色固定，再根据叙事选择每页使用哪一种。");
  addImage(slide, "b-style-board.png", 0.94, 1.5, 4.65, 2.62);
  const system = [
    ["痛点场景", "用于开场和问题页，让观众先看到业务负荷。", C.orange],
    ["中心循环", "用于方案页和过渡页，承载 kintone 改善逻辑。", C.yellow],
    ["运营辅助", "用于导入后、伴走、AI 辅助和持续改善页。", C.teal],
  ];
  system.forEach(([title, body, accent], i) => addMiniCard(slide, { x: 6.05, y: 1.52 + i * 0.86, w: 2.85, h: 0.65, title, body, accent }));
  addCallout(slide, "生产原则：位图负责情绪和关系，文字、判断、步骤仍保留为可编辑 PPT 对象。", 1.08, 4.46, 7.7, C.white);
  addNotes(slide, [
    "讲法：这页是从实验转向方法。B 方案不是每次临时出图，而是先形成小资产库，再组合成 deck。",
    "强调：真正可以规模化的是母题，而不是某一张图。母题固定后，叙事可以换，页面仍然像同一套视觉系统。",
  ]);
}

function slide05(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 5);
  addTitle(slide, "从故事骨架到 B 方案 deck，可以拆成五步", "这样既保留 A 方案的信息结构，也避免 B 方案变成不可控的单页美术。");
  const steps = [
    ["1", "锁定叙事", "先写每页 claim 和证明对象", C.yellow],
    ["2", "选择母题", "痛点、循环、运营三类中选一类", C.orange],
    ["3", "生成/挑选视觉", "只让位图承担场景和情绪", C.teal],
    ["4", "叠加判断层", "标题、卡片、步骤、结论保持可编辑", C.green],
    ["5", "打包和备注", "导出 PPTX，并写好讲稿提示", C.blue],
  ];
  steps.forEach(([num, title, body, color], i) => {
    const x = 0.82 + i * 1.76;
    slide.addShape(S.ellipse, { x: x + 0.52, y: 1.7, w: 0.54, h: 0.54, fill: { color }, line: { color } });
    addText(slide, num, { x: x + 0.52, y: 1.86, w: 0.54, h: 0.13, fontSize: 9, bold: true, color: C.white, align: "center", fontFace: font.latin });
    slide.addShape(S.roundRect, { x, y: 2.52, w: 1.45, h: 1.12, rectRadius: 0.08, fill: { color: C.white }, line: { color: C.gray300 } });
    addText(slide, title, { x: x + 0.15, y: 2.83, w: 1.15, h: 0.14, fontSize: 8.5, bold: true, align: "center" });
    addText(slide, body, { x: x + 0.16, y: 3.17, w: 1.13, h: 0.18, fontSize: 5.5, color: C.gray700, align: "center" });
    if (i < steps.length - 1) slide.addShape(S.rightArrow, { x: x + 1.52, y: 2.98, w: 0.25, h: 0.16, fill: { color: C.yellow }, line: { color: C.yellow } });
  });
  addImage(slide, "b-cloud-helper.png", 6.35, 3.72, 2.18, 1.2, 8);
  addCallout(slide, "关键控制点：先定叙事，再定视觉；不要反过来让图片决定故事。", 0.98, 4.56, 5.25);
  addNotes(slide, [
    "讲法：这是未来插件技能应该执行的生产顺序。先有叙事 spine，再调用 B 方案资产，而不是看到哪张图好看就硬塞进去。",
    "交付口径：正式 deck 至少输出两个版本，一个保留可编辑判断层，一个在需要时把页面打包成位图容器。",
  ]);
}

function slide06(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 6);
  addTitle(slide, "导入后，故事要落到持续运营", "B 方案适合把工具说明处理成运营场景，让客户看到导入之后怎么继续跑。");
  addImage(slide, "b-cloud-helper.png", 5.86, 1.18, 3.05, 2.62);
  const ops = [
    ["先选一个业务", "不要从全公司改造开始", C.yellow],
    ["画出流转关系", "谁输入、谁审批、谁看结果", C.teal],
    ["用数据复盘", "每月更新改善点", C.green],
  ];
  ops.forEach(([title, body, color], i) => {
    const y = 1.75 + i * 0.92;
    slide.addShape(S.ellipse, { x: 1.02, y, w: 0.44, h: 0.44, fill: { color }, line: { color } });
    addText(slide, String(i + 1), { x: 1.02, y: y + 0.13, w: 0.44, h: 0.1, fontSize: 7.4, bold: true, color: C.white, align: "center", fontFace: font.latin });
    addText(slide, title, { x: 1.72, y: y + 0.03, w: 2.35, h: 0.14, fontSize: 10, bold: true });
    addText(slide, body, { x: 1.72, y: y + 0.32, w: 2.55, h: 0.1, fontSize: 6.3, color: C.gray700 });
  });
  addCallout(slide, "B 方案最强的使用点：客户提案首页、章节视觉、故事过渡页、导入后运营页。", 1.02, 4.55, 7.65);
  addNotes(slide, [
    "讲法：这页把故事从‘导入一个工具’拉回‘持续运营一套改善方式’。这也是 B 方案比纯组件页更容易打动客户的地方。",
    "注意：如果页面需要精确数字、表格、法务脚注，就不要用整页位图主导，应该回到 A 方案的原生可编辑组件。",
  ]);
}

function slide07(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 7);
  addTitle(slide, "B方案需要明确边界，才能进入真实生产", "哪些页面适合做视觉加成，哪些页面必须回到可编辑和可维护。");
  const rows = [
    ["适合", "封面 / 章节页 / 概念页 / 客户提案首页 / 故事过渡页", C.yellowPale],
    ["谨慎", "方案页可以用 B 视觉，但业务标签、步骤和判断必须 editable", C.white],
    ["不适合", "频繁改数字、长表格、报价、法务脚注、需要逐字审查的页面", C.white],
    ["生产方式", "先用 A 方案确定结构，再用 B 方案加工关键页，最后打包成 PPTX", C.white],
  ];
  rows.forEach(([key, value, fill], i) => {
    const y = 1.55 + i * 0.75;
    slide.addShape(S.roundRect, { x: 0.95, y, w: 8.1, h: 0.48, rectRadius: 0.07, fill: { color: fill }, line: { color: C.gray300 } });
    addText(slide, key, { x: 1.18, y: y + 0.16, w: 1.0, h: 0.1, fontSize: 8.3, bold: true });
    addText(slide, value, { x: 2.28, y: y + 0.16, w: 6.3, h: 0.1, fontSize: 7.2, color: C.gray700 });
  });
  addImage(slide, "b-loop-hub.png", 6.63, 4.15, 1.7, 0.96);
  addText(slide, "Decision rule: visual pages sell the idea; editable pages protect the work.", { x: 1.0, y: 4.68, w: 4.8, h: 0.12, fontSize: 7.1, bold: true, fontFace: font.latin });
  addNotes(slide, [
    "讲法：边界讲清楚，B 方案才不会被误用成所有页面都位图化。我们只把需要第一印象和场景理解的页面做得更强。",
    "给使用者的判断：如果一个页面的主要风险是内容维护，就走 A；如果主要风险是客户看不懂或不记得，就考虑 B。",
  ]);
}

function slide08(pres) {
  const slide = pres.addSlide();
  addFrame(slide, 8, "B ROUTE / NEXT STEP");
  addText(slide, "结论：B方案可以成为一套稳定的视觉生产层", { x: 0.72, y: 0.82, w: 6.95, h: 0.42, fontSize: 20, bold: true });
  addText(slide, "只要小资产先定型，叙事 spine 明确，就可以持续产出同一视觉系统下的完整 deck。", { x: 0.75, y: 1.46, w: 6.25, h: 0.22, fontSize: 8.4, color: C.gray700 });
  addImage(slide, "b-style-board.png", 5.72, 1.9, 3.2, 1.8);
  const bullets = [
    ["保留", "A 方案的信息结构和可编辑组件"],
    ["加强", "封面、章节、概念、运营页的视觉吸引力"],
    ["沉淀", "母题选择、备注写法、打包方式进入 plugin skill"],
  ];
  bullets.forEach(([k, v], i) => {
    const y = 2.1 + i * 0.7;
    slide.addShape(S.ellipse, { x: 1.0, y, w: 0.25, h: 0.25, fill: { color: [C.yellow, C.teal, C.green][i] }, line: { color: [C.yellow, C.teal, C.green][i] } });
    addText(slide, k, { x: 1.45, y: y - 0.01, w: 0.62, h: 0.11, fontSize: 8.4, bold: true });
    addText(slide, v, { x: 2.18, y: y - 0.01, w: 3.1, h: 0.11, fontSize: 7.4, color: C.gray700 });
  });
  slide.addShape(S.roundRect, { x: 1.02, y: 4.42, w: 7.6, h: 0.5, rectRadius: 0.14, fill: { color: C.yellow }, line: { color: C.yellow } });
  addText(slide, "Next: 用真实客户提案选 3-5 张关键页，验证 B 方案是否能稳定提高第一眼质量。", { x: 1.28, y: 4.59, w: 7.05, h: 0.12, fontSize: 8.2, bold: true, align: "center" });
  addNotes(slide, [
    "讲法：最后收束到生产判断。B 方案已经可以作为关键页视觉增强流程，而不是一次性的试验。",
    "下一步建议：拿真实提案做小范围验证。优先选封面、问题页、方案概念页、导入后运营页，而不是数字表格页。",
  ]);
}

async function main() {
  await mkdir(path.dirname(outPath), { recursive: true });
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt";
  pres.company = "cybozu-style-ppt";
  pres.subject = "B route full visual-story deck";
  pres.title = "cybozu story demo B full";
  pres.lang = "zh-CN";
  pres.theme = {
    headFontFace: font.head,
    bodyFontFace: font.body,
    lang: "zh-CN",
  };
  pres.defineLayout({ name: "LAYOUT_16x9", width: 10, height: 5.625 });

  [slide01, slide02, slide03, slide04, slide05, slide06, slide07, slide08].forEach((build) => build(pres));
  await pres.writeFile({ fileName: outPath });
  console.log(`wrote=${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
