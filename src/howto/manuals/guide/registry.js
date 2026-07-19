export const blogManual = {
  code: "FM-03",
  slug: "guide",
  title: "指导手册",
  description: "说明如何规划、组织和编写一份清晰、可执行、可持续维护的手册。",
  meta: "目标 · 结构 · 章节 · 维护",
  audience: "需要编写教程、规范和知识手册的人",
  focus: "把零散经验整理成别人可以照着完成的指导路径。",
  outcome: "建立一套可复用的手册骨架，再逐章填入真实内容。"
};

export const guideLessons = [
  { slug: "hero", label: "SCENE · 01", title: "课程 Hero 标题区", summary: "课程开始时，用一个完整的标题区交代主题、学习收益和起步动作。", purpose: "读者不需要分别寻找标题、说明和入口，它们应作为一个语义整体同时出现。", html: `<section class="hero">\n  <div class="hero-grid">\n    <div class="hero-copy-block">\n      <h1 class="hero-title-structured">课程 Hero 标题区</h1>\n      <p class="hero-subtitle-structured">课程开始时，用一个完整的标题区交代主题、学习收益和起步动作。</p>\n      <div class="hero-actions">\n        <a class="button" href="#lesson">开始课程 →</a>\n      </div>\n    </div>\n  </div>\n</section>`, css: `.hero { padding: clamp(3.5rem, 8vw, 7rem) 0; }\n.hero-title-structured { font-family: var(--font-display); }\n.hero-subtitle-structured { max-width: 56ch; color: var(--muted); }\n.button { background: var(--ground-yellow); box-shadow: 4px 4px 0 var(--border); }` },
  { slug: "heading", label: "SCENE · 02", title: "课程章节引导区", summary: "每个课程章节以范围、任务和解释组成的引导区开始。", purpose: "章节标题不是独立装饰，而是让读者在进入内容前确认正在解决哪个问题。", html: `<header class="section-header">\n  <div class="section-kicker-wrap">\n    <span class="section-kicker">LESSON / 01</span>\n  </div>\n  <h2 class="section-title">课程章节引导区</h2>\n  <p class="section-subtitle">每个课程章节以范围、任务和解释组成的引导区开始。</p>\n</header>`, css: `.section-header { display: grid; gap: 0.75rem; }\n.section-kicker { font-family: var(--font-mono); font-weight: 700; }\n.section-title { font-family: var(--font-display); line-height: 0.95; }\n.section-subtitle { max-width: 65ch; color: var(--muted); }` },
  { slug: "actions", label: "SCENE · 03", title: "课程行动与状态区", summary: "课程内容结束后，使用行动区让读者继续、返回或确认完成。", purpose: "操作入口应紧贴阅读结果出现，主行动与辅助行动在视觉上有清晰主次。", parts: [[".hero-actions", "将同一阅读节点的操作集中排布。"], [".button", "唯一的主行动，推动读者继续课程。"], [".text-link", "辅助动作，例如查看检查点，不与主按钮竞争。"]], html: `<div class="hero-actions">\n  <a class="button" href="#next">继续下一节 →</a>\n  <a class="text-link" href="#check">查看检查点</a>\n</div>`, css: `.hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }\n.button { border: 1px solid var(--border); padding: 0.85rem 1.05rem; }\n.button:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--border); }\n.text-link { color: var(--fg); font-weight: 700; }` },
  { slug: "metadata", label: "SCENE · 04", title: "课程定位与标签区", summary: "课程标题旁的标签区帮助读者在开始前判断主题、顺序和阅读状态。", purpose: "标签在这里服务于课程定位，短而稳定，不用来承载解释性段落。", parts: [[".hero-search-card.bare", "标签区的轻量容器，不增加额外视觉负担。"], [".hero-tags", "让标签可换行地并列排布。"], [".tag", "单个课程属性，例如难度、时长或顺序。"]], html: `<div class="hero-search-card bare">\n  <div class="hero-tags">\n    <span class="tag">基础</span>\n    <span class="tag">20 分钟</span>\n    <span class="tag">第 1 节</span>\n  </div>\n</div>`, css: `.hero-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }\n.tag { border: 1px solid var(--border); border-radius: 999px; padding: 0.35rem 0.6rem; }\n.hero-search-card.bare { background: transparent; }` },
  { slug: "card", label: "SCENE · 05", title: "课程目录入口", summary: "课程目录用可点击的入口卡片，帮助读者选择下一段可完成的学习任务。", purpose: "整张卡片都应该是入口，并在点击前给出课程名称、阶段编号和收获摘要。", parts: [[".lesson-card", "整张可点击的课程入口。"], [".lesson-card-preview + .micro-label", "课程编号或阶段的快速标记。"], [".lesson-card-body", "课程文字信息的内层容器。"], [".lesson-card-title", "课程任务名称。"], [".lesson-card-copy", "进入前可以获得的结果或摘要。"]], html: `<a class="lesson-card" href="/howto/guide/hero">\n  <div class="lesson-card-preview">\n    <span class="micro-label">LESSON · 01</span>\n  </div>\n  <div class="lesson-card-body">\n    <h3 class="lesson-card-title">课程 Hero 标题区</h3>\n    <p class="lesson-card-copy">了解开场需要交代什么。</p>\n  </div>\n</a>`, css: `.lesson-card { display: flex; flex-direction: column; border: 2px solid var(--ink); color: inherit; text-decoration: none; }\n.lesson-card:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 rgba(40, 30, 15, 0.45); }\n.lesson-card-preview { border-bottom: 2px solid var(--ink); }\n.lesson-card-body { padding: 16px 18px 20px; }` },
  { slug: "faq", label: "SCENE · 06", title: "课程检查与答疑区", summary: "在课程末尾集中处理读者的判断问题，让完成标准变得可验证。", purpose: "答疑区不是附录，它是课程闭环的一部分，应帮助读者决定能否进入下一节。", parts: [[".section.section-spacious", "答疑区本身及其与上文拉开的阅读距离。"], [".faq-grid", "多个问题的垂直排布容器。"], [".faq-item", "一个可展开的检查问题。"], ["summary", "读者需要判断的具体问题。"], [".faq-item p", "判断标准或下一步说明。"]], html: `<section class="section section-spacious" id="faq">\n  <div class="faq-grid">\n    <details class="faq-item" open>\n      <summary>我现在可以进入下一节吗？</summary>\n      <p>完成本节检查项后即可继续。</p>\n    </details>\n  </div>\n</section>`, css: `.faq-grid { display: grid; gap: 0.75rem; }\n.faq-item { border: 2px solid var(--border); background: var(--surface); }\n.faq-item summary { cursor: pointer; font-weight: 700; padding: 1rem; }\n.faq-item p { padding: 0 1rem 1rem; color: var(--muted); }` },
  { slug: "lesson-nav", label: "SCENE · 07", title: "组件课程导航", summary: "在页面顶部与底部提供上一张、全部卡片和下一张的三段式切换器。", purpose: "读者无需回到组件地图才能继续阅读，也能随时打开全部卡片重新选择学习路径。", html: `<nav class="lesson-nav" aria-label="组件课程导航">\n  <a href="/howto/guide/previous">← 上一张卡片</a>\n  <a href="/howto/guide/">▣ 全部卡片</a>\n  <a href="/howto/guide/next">下一张卡片 →</a>\n</nav>`, css: `.lesson-nav {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  border: 2px solid var(--border);\n}\n\n.lesson-nav a + a {\n  border-left: 2px solid var(--border);\n}\n\n.lesson-nav a:hover {\n  background: var(--ground-yellow);\n}` },
  { slug: "html-reading-hero", label: "ARTICLE · 01", title: "教程文章 Hero", summary: "用文章标题与纵向信息卡，让读者在进入正文前判断主题、形式和阅读收益。", purpose: "这是教程文章的首屏标题设计：将文章标题与内容标签并列组织，先建立读者预期再进入正文。", html: `<header class="lesson-article-hero html-reading-hero">\n  <div class="lesson-shell">\n    <div class="lesson-article-hero-meta">\n      <span class="lesson-article-hero-pill lesson-article-hero-pill-fill">Markdown 对照 · COMPARE</span>\n      <span class="lesson-article-hero-pill">HTML 第一课 · 语法对照</span>\n      <span class="lesson-article-hero-label">阅读时长 ≈ 12 分钟</span>\n    </div>\n    <div class="lesson-article-hero-grid">\n      <div class="lesson-article-hero-copy">\n        <h1 class="page-title">\n          <span class="lesson-article-hero-title-line">Markdown</span>\n          <span class="lesson-article-hero-title-line">怎么翻成 <span class="lesson-article-hero-title-em">HTML</span></span>\n        </h1>\n      </div>\n      <div class="lesson-article-hero-side">\n        <div class="lesson-article-hero-row"><span class="lesson-article-hero-key">本页讲什么</span><span class="lesson-article-hero-value">Markdown ↔ HTML</span></div>\n        <div class="lesson-article-hero-row"><span class="lesson-article-hero-key">内容形式</span><span class="lesson-article-hero-value">语法对照 + 实时渲染</span></div>\n        <div class="lesson-article-hero-row"><span class="lesson-article-hero-key">适合谁</span><span class="lesson-article-hero-value">后端 / 新手 / 会 Markdown 的人</span></div>\n        <div class="lesson-article-hero-row"><span class="lesson-article-hero-key">目标</span><span class="lesson-article-hero-value">看见符号就想到标签</span></div>\n      </div>\n    </div>\n  </div>\n</header>`, css: `.lesson-article-hero .lesson-shell {\n  display: grid;\n  grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.8fr);\n  gap: 28px;\n  align-items: end;\n}\n\n.lesson-article-hero-meta {\n  grid-column: 2;\n  grid-row: 1;\n  display: grid;\n  gap: 0;\n  padding: 18px 20px;\n  border: 1.5px solid var(--fg);\n  box-shadow: var(--shadow);\n}\n\n.lesson-article-hero-meta > * {\n  width: 100%;\n  padding: 12px 0;\n  border: 0;\n  border-bottom: 1px solid color-mix(in oklab, var(--fg) 16%, transparent);\n  background: transparent;\n}\n\n.lesson-article-hero-side { display: none; }` },
  { slug: "markdown-headings", label: "WRITING · 01", title: "Markdown 文章标题层级", summary: "用唯一的一级标题定义文章主题，再用二级标题组织主要章节。", purpose: "一篇文章只使用一个 # 一级标题；每个主要论点、步骤或章节使用 ## 二级标题，避免跳级。", language: "markdown", html: `# Docker 多阶段构建：从编译产物到镜像\n\n一句话说明文章解决的问题与读者将获得的结果。\n\n## 为什么需要多阶段构建\n\n先说明单阶段构建的实际限制。\n\n## 构建阶段与运行阶段如何分离\n\n给出核心步骤、示例和检查点。\n\n## 发布前检查\n\n用一个明确的完成标准收束文章。`, css: `article h1 { font-size: clamp(2.25rem, 5vw, 4rem); line-height: 1.05; }\narticle h2 { margin-top: 3rem; font-size: clamp(1.6rem, 3vw, 2.35rem); line-height: 1.2; }\narticle h1 + p { color: var(--muted); }\narticle h2 + p { max-width: 65ch; }` },
];

const articleContentLesson = guideLessons.find((lesson) => lesson.slug === "markdown-headings");
if (articleContentLesson) {
  Object.assign(articleContentLesson, {
    slug: "article-content",
    label: "ARTICLE · 02",
    title: "教程文章内容结构",
    summary: "文章 Hero 承担一级标题，正文依次使用二级、三级、四级标题组织内容。",
    purpose: "这是教程文章 Hero 的正文配套：Hero 是唯一的一级标题；正文使用二级章节、三级小节和四级细分标题，避免重复一级标题。",
    html: `# 文章一级标题（由文章 Hero 承担）

## 文章二级标题

### 文章三级标题

#### 文章四级标题`,
    css: `.lesson-article-hero .page-title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  line-height: 1.05;
}

article h2 {
  margin-top: 3rem;
  font-size: clamp(1.45rem, 3vw, 2.25rem);
  line-height: 1.2;
}

article h3 {
  margin-top: 2rem;
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  line-height: 1.3;
}

article h4 {
  margin-top: 1.5rem;
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  font-weight: 400;
  line-height: 1.4;
}`
  });
}

export function toGuideLesson(entry) {
  return {
    slug: entry.id.replace(/\.md$/, ""),
    ...entry.data,
  };
}
