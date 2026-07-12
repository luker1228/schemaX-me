import React from "react";
import html from "./legacy-content/lesson-html-2.html?raw";
import { LegacyPage } from "./legacy-page.jsx";

export function LessonHtml2Page() {
  return <LegacyPage title="HTML 第二课 · 后端同学的前端战术手册" html={html} />;
}