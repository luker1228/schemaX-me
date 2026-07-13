import React from "react";
import css from "./legacy-content/lesson-css-2.html?raw";
import { LegacyPage } from "./legacy-page.jsx";

export function LessonCss2Page() {
  return <LegacyPage title="CSS · Figma 属性面板 · 后端同学的前端战术手册" html={css} />;
}