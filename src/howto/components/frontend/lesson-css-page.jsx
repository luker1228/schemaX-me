import React from "react";
import html from "./legacy-content/lesson-css.html?raw";
import { LegacyPage } from "./legacy-page.jsx";

export function LessonCssPage() {
  return <LegacyPage title="CSS 第一课 · 后端同学的前端战术手册" html={html} />;
}
