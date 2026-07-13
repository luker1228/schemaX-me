import React from "react";
import html from "./legacy-content/lesson-layout.html?raw";
import { LegacyPage } from "./legacy-page.jsx";

export function LessonLayoutPage() {
  return <LegacyPage title="布局第一课 · 页面骨架 · 后端同学的前端战术手册" html={html} />;
}
