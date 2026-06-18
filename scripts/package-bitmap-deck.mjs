import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pptxgen from "pptxgenjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSlideDir = path.join(rootDir, "data", "processed", "style-analysis", "bitmap-b-preview", "cybozu-story-demo-b-source");
const slideDir = process.env.BITMAP_SLIDE_DIR ? path.resolve(rootDir, process.env.BITMAP_SLIDE_DIR) : defaultSlideDir;
const outPath = process.env.BITMAP_DECK_PATH
  ? path.resolve(rootDir, process.env.BITMAP_DECK_PATH)
  : path.join(rootDir, "cybozu-style-ppt", "assets", "bitmap-b", "cybozu-story-demo-bitmap-only.pptx");
const slideCount = Number.parseInt(process.env.BITMAP_SLIDE_COUNT || "6", 10);

const notePresets = {
  "b-route-full": [
    [
      "讲法：这页先定调，B 方案不是为了每一页都变成大图，而是让封面、章节、概念和客户可见的关键页有一致的视觉母题。",
      "强调：A 方案继续负责可编辑结构和快速交付；B 方案负责把角色、场景、情绪统一成能被复用的视觉系统。",
    ],
    [
      "讲法：不要把痛点讲成工具批判。纸、Excel、邮件都可能是正确的局部选择，问题在于流转关系断开。",
      "视觉说明：右侧位图负责把‘现场和管理都累’这件事先说出来；左侧四张卡保留可编辑文本，方便替换成真实客户行业痛点。",
    ],
    [
      "讲法：这一页把解决方案从产品功能转成运营循环。客户需要先理解‘输入、承认、通知、集计’是同一条业务数据上的连续动作。",
      "备注：正式项目里，这四个节点可以替换为客户业务里的真实步骤，但中心循环的视觉母题保持不变。",
    ],
    [
      "讲法：这页是从实验转向方法。B 方案不是每次临时出图，而是先形成小资产库，再组合成 deck。",
      "强调：真正可以规模化的是母题，而不是某一张图。母题固定后，叙事可以换，页面仍然像同一套视觉系统。",
    ],
    [
      "讲法：这是未来插件技能应该执行的生产顺序。先有叙事 spine，再调用 B 方案资产，而不是看到哪张图好看就硬塞进去。",
      "交付口径：正式 deck 至少输出两个版本，一个保留可编辑判断层，一个在需要时把页面打包成位图容器。",
    ],
    [
      "讲法：这页把故事从‘导入一个工具’拉回‘持续运营一套改善方式’。这也是 B 方案比纯组件页更容易打动客户的地方。",
      "注意：如果页面需要精确数字、表格、法务脚注，就不要用整页位图主导，应该回到 A 方案的原生可编辑组件。",
    ],
    [
      "讲法：边界讲清楚，B 方案才不会被误用成所有页面都位图化。我们只把需要第一印象和场景理解的页面做得更强。",
      "给使用者的判断：如果一个页面的主要风险是内容维护，就走 A；如果主要风险是客户看不懂或不记得，就考虑 B。",
    ],
    [
      "讲法：最后收束到生产判断。B 方案已经可以作为关键页视觉增强流程，而不是一次性的试验。",
      "下一步建议：拿真实提案做小范围验证。优先选封面、问题页、方案概念页、导入后运营页，而不是数字表格页。",
    ],
  ],
};
const notes = process.env.BITMAP_NOTES_PRESET ? notePresets[process.env.BITMAP_NOTES_PRESET] : null;

async function main() {
  if (!Number.isInteger(slideCount) || slideCount < 1) {
    throw new Error(`Invalid BITMAP_SLIDE_COUNT: ${process.env.BITMAP_SLIDE_COUNT}`);
  }
  if (process.env.BITMAP_NOTES_PRESET && !notes) {
    throw new Error(`Unknown BITMAP_NOTES_PRESET: ${process.env.BITMAP_NOTES_PRESET}`);
  }
  await mkdir(path.dirname(outPath), { recursive: true });
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "cybozu-style-ppt";
  pres.company = "cybozu-style-ppt";
  pres.subject = "Bitmap-only B-route story demo";
  pres.title = "B route bitmap-only story demo";
  pres.lang = "zh-CN";

  for (let i = 1; i <= slideCount; i += 1) {
    const slide = pres.addSlide();
    slide.background = { color: "FFFFFF" };
    slide.addImage({
      path: path.join(slideDir, `slide-${String(i).padStart(2, "0")}.png`),
      x: 0,
      y: 0,
      w: 10,
      h: 5.625,
    });
    if (notes?.[i - 1]) slide.addNotes(notes[i - 1].join("\n"));
  }

  await pres.writeFile({ fileName: outPath });
  console.log(`wrote=${outPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
