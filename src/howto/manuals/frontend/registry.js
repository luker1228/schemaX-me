export const frontendLegacyLessons = {
  "lesson-html.html": {
    currentPath: "lesson-html.html",
    prev: null,
    next: { href: "lesson-html-2.html", title: "HTML · Figma 对比" },
  },
  "lesson-html-2.html": {
    currentPath: "lesson-html-2.html",
    prev: { href: "lesson-html.html", title: "HTML · Markdown 对比" },
    next: { href: "lesson-css.html", title: "CSS · 基础" },
  },
  "lesson-css.html": {
    currentPath: "lesson-css.html",
    prev: { href: "lesson-html-2.html", title: "HTML · Figma 对比" },
    next: { href: "lesson-css-2.html", title: "CSS · Figma 对比" },
  },
  "lesson-css-2.html": {
    currentPath: "lesson-css-2.html",
    prev: { href: "lesson-css.html", title: "CSS · 基础" },
    next: { href: "lesson-js.html", title: "JavaScript" },
  },
  "lesson-js.html": {
    currentPath: "lesson-js.html",
    prev: { href: "lesson-css-2.html", title: "CSS · Figma 对比" },
    next: { href: "lesson-react.html", title: "组件" },
  },
  "lesson-layout.html": {
    currentPath: "lesson-layout.html",
    prev: { href: "lesson-react.html", title: "组件" },
    next: { href: "lesson-layout-2.html", title: "布局第二课" },
  },
  "lesson-layout-2.html": {
    currentPath: "lesson-layout-2.html",
    prev: { href: "lesson-layout.html", title: "布局第一课" },
    next: { href: "prompts.html", title: "提示词库" },
  },
  "lesson-react.html": {
    currentPath: "lesson-react.html",
    prev: { href: "lesson-js.html", title: "JavaScript" },
    next: { href: "lesson-layout.html", title: "布局" },
  },
  "components.html": {
    currentPath: "components.html",
    prev: { href: "lesson-react.html", title: "组件：先认词" },
    next: { href: "prompts.html", title: "提示词库" },
  },
  "prompts.html": {
    currentPath: "prompts.html",
    prev: { href: "lesson-layout.html", title: "布局" },
    next: null,
  },
};

export function getFrontendLegacyLesson(path) {
  return frontendLegacyLessons[path];
}

export const frontendLessonPages = [
  { slug: "lesson-html", currentPath: "lesson-html.html", title: "HTML 基础 · 前端课程", kind: "legacy", htmlKey: "lesson-html" },
  { slug: "lesson-html-2", currentPath: "lesson-html-2.html", title: "HTML 进阶 · 前端课程", kind: "legacy", htmlKey: "lesson-html-2" },
  { slug: "lesson-css", currentPath: "lesson-css.html", title: "CSS 基础 · 前端课程", kind: "legacy", htmlKey: "lesson-css" },
  { slug: "lesson-css-2", currentPath: "lesson-css-2.html", title: "CSS 进阶 · 前端课程", kind: "legacy", htmlKey: "lesson-css-2" },
  { slug: "lesson-js", currentPath: "lesson-js.html", title: "JavaScript · 前端课程", kind: "legacy", htmlKey: "lesson-js" },
  { slug: "lesson-layout", currentPath: "lesson-layout.html", title: "布局基础 · 前端课程", kind: "legacy", htmlKey: "lesson-layout" },
  { slug: "lesson-layout-2", currentPath: "lesson-layout-2.html", title: "布局进阶 · 前端课程", kind: "legacy", htmlKey: "lesson-layout-2" },
  { slug: "lesson-react", currentPath: "lesson-react.html", title: "React · 前端课程", kind: "react" },
  { slug: "components", currentPath: "components.html", title: "组件 · 前端课程", kind: "components" },
  { slug: "prompts", currentPath: "prompts.html", title: "提示词 · 前端课程", kind: "prompts" },
];

export const frontendHomeLessons = [
  {
    slug: "lesson-html",
    label: "HTML · 01",
    cardTitle: "HTML vs Markdown",
    copy: "标签就是给内容套一层含义，和 Markdown 的逻辑完全一样。",
    href: "lesson-html.html",
  },
  {
    slug: "lesson-html-2",
    label: "HTML · 02",
    cardTitle: "HTML vs Figma",
    copy: "图层树就是标签树，每一层 div 对应 Figma 里的一个 Frame。",
    href: "lesson-html-2.html",
  },
  {
    slug: "lesson-css",
    label: "CSS · 01",
    cardTitle: "CSS 属性清单",
    copy: "字号、颜色、间距、方向——四类属性覆盖 80% 的日常样式需求。",
    href: "lesson-css.html",
  },
  {
    slug: "lesson-css-2",
    label: "CSS · 02",
    cardTitle: "CSS vs Figma",
    copy: "属性面板就是 CSS，Figma 的 Inspector 和写样式说的是同一件事。",
    href: "lesson-css-2.html",
  },
  {
    slug: "lesson-js",
    label: "JavaScript",
    cardTitle: "JavaScript：负责交互。",
    copy: "点击、输入、提交——状态变化就是事件驱动，先认识这个循环。",
    href: "lesson-js.html",
  },
  {
    slug: "lesson-react",
    label: "组件",
    cardTitle: "组件：负责复用。",
    copy: "一段 UI 写一次，到处使用——理解 props 和 children，组件就清楚了。",
    href: "lesson-react.html",
  },
  {
    slug: "lesson-layout",
    label: "布局 · 01",
    cardTitle: "布局第一课",
    copy: "Flex 和 Grid 是两把尺子，搞懂主轴方向，排列就不再靠猜。",
    href: "lesson-layout.html",
  },
  {
    slug: "lesson-layout-2",
    label: "布局 · 02",
    cardTitle: "布局第二课",
    copy: "常见页面骨架拆解：顶栏、侧边栏、内容区的排列逻辑。",
    href: "lesson-layout-2.html",
  },
];

export function getFrontendLessonPageBySlug(slug) {
  return frontendLessonPages.find((page) => page.slug === slug);
}
