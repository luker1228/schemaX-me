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
  { slug: "lesson-html", currentPath: "lesson-html.html", title: "HTML 基础 · 前端战术手册", kind: "legacy", htmlKey: "lesson-html" },
  { slug: "lesson-html-2", currentPath: "lesson-html-2.html", title: "HTML 进阶 · 前端战术手册", kind: "legacy", htmlKey: "lesson-html-2" },
  { slug: "lesson-css", currentPath: "lesson-css.html", title: "CSS 基础 · 前端战术手册", kind: "legacy", htmlKey: "lesson-css" },
  { slug: "lesson-css-2", currentPath: "lesson-css-2.html", title: "CSS 进阶 · 前端战术手册", kind: "legacy", htmlKey: "lesson-css-2" },
  { slug: "lesson-js", currentPath: "lesson-js.html", title: "JavaScript · 前端战术手册", kind: "legacy", htmlKey: "lesson-js" },
  { slug: "lesson-layout", currentPath: "lesson-layout.html", title: "布局基础 · 前端战术手册", kind: "legacy", htmlKey: "lesson-layout" },
  { slug: "lesson-layout-2", currentPath: "lesson-layout-2.html", title: "布局进阶 · 前端战术手册", kind: "legacy", htmlKey: "lesson-layout-2" },
  { slug: "lesson-react", currentPath: "lesson-react.html", title: "React · 前端战术手册", kind: "react" },
  { slug: "components", currentPath: "components.html", title: "组件 · 前端战术手册", kind: "components" },
  { slug: "prompts", currentPath: "prompts.html", title: "提示词 · 前端战术手册", kind: "prompts" },
];

export function getFrontendLessonPageBySlug(slug) {
  return frontendLessonPages.find((page) => page.slug === slug);
}
