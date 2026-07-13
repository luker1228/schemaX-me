import React from "react";
import html from "./legacy-content/lesson-html.html?raw";
import { LegacyPage } from "./legacy-page.jsx";

export function LessonHtmlPage() {
  return <LegacyPage title="HTML 第一课 · 后端同学的前端战术手册" html={html} />;
}
