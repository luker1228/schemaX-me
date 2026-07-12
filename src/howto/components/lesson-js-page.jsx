import React from "react";
import html from "./legacy-content/lesson-js.html?raw";
import { LegacyPage } from "./legacy-page.jsx";

export function LessonJsPage() {
  return <LegacyPage title="JavaScript 第一课 · 后端同学的前端战术手册" html={html} />;
}
