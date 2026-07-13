import React from "react";
import html from "./legacy-content/lesson-layout-2.html?raw";
import { LegacyPage } from "./legacy-page.jsx";

export function LessonLayout2Page() {
  return <LegacyPage title="布局第二课 · 后端同学的前端战术手册" html={html} />;
}
