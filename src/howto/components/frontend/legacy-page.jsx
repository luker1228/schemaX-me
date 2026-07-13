import React from "react";
import { withBasePath, withHowtoManualPath } from "../../lib/paths.js";
import { StepNav } from "./site-components.jsx";
import { LegacyPageShell } from "../shared/legacy-page-shell.jsx";

const COURSES = [
  {
    label: "HTML",
    href: "lesson-html.html",
    perspectives: [
      { text: "Markdown 对比", href: "lesson-html.html" },
      { text: "Figma 对比", href: "lesson-html-2.html" },
    ],
  },
  {
    label: "CSS",
    href: "lesson-css.html",
    perspectives: [
      { text: "CSS 基础", href: "lesson-css.html" },
      { text: "Figma 对比", href: "lesson-css-2.html" },
    ],
  },
  { label: "JavaScript", href: "lesson-js.html" },
  { label: "组件", href: "lesson-react.html" },
  {
    label: "布局",
    href: "lesson-layout.html",
    perspectives: [
      { text: "布局第一课：骨架", href: "lesson-layout.html" },
      { text: "布局第二课：排列", href: "lesson-layout-2.html" },
    ],
  },
];

function rewriteLegacyUrl(rawPath) {
  if (!rawPath || rawPath.startsWith("#") || /^[a-z]+:/i.test(rawPath)) return rawPath;
  const normalized = rawPath.startsWith("/") ? rawPath.slice(1) : rawPath;
  if (!normalized || normalized === "index.html") return withHowtoManualPath("frontend");
  if (normalized.endsWith(".html")) return withHowtoManualPath("frontend", normalized);
  return withBasePath(normalized);
}

function rewritePerspectivePayload(attrValue) {
  try {
    const perspectives = JSON.parse(attrValue);
    return JSON.stringify(
      perspectives.map((item) => ({
        ...item,
        href: rewriteLegacyUrl(item.href),
      }))
    );
  } catch {
    return attrValue;
  }
}

function rewriteLegacyHtmlForBase(html) {
  return html
    .replace(/href="([^"]*)"/g, (_, path) => `href="${rewriteLegacyUrl(path)}"`)
    .replace(/src="([^"]*)"/g, (_, path) => `src="${rewriteLegacyUrl(path)}"`)
    .replace(/data-perspectives='([^']*)'/g, (_, payload) => `data-perspectives='${rewritePerspectivePayload(payload)}'`)
    .replace(/"href":"([^"]*)"/g, (_, path) => `"href":"${rewriteLegacyUrl(path)}"`);
}

function StaticSiteNav({ currentPath = "" }) {
  return (
    <nav className="nav-links">
      {COURSES.map((course) => {
        const href = withHowtoManualPath("frontend", course.href);
        const perspectives = course.perspectives
          ? JSON.stringify(
              course.perspectives.map((item) => ({
                ...item,
                href: withHowtoManualPath("frontend", item.href),
                current: item.href === currentPath,
              }))
            )
          : undefined;
        return (
          <a key={course.label} href={href} data-perspectives={perspectives}>
            {course.label}
          </a>
        );
      })}
    </nav>
  );
}

export function LegacyPage({ title, html, currentPath = "", prev = null, next = null }) {
  return (
    <LegacyPageShell
      title={title}
      html={html}
      rewriteHtml={rewriteLegacyHtmlForBase}
      renderHeader={() => (
        <header className="site-header">
          <div className="lesson-shell site-header-inner">
            <a className="brand-mark" href={withHowtoManualPath("frontend")}>
              <span>前端战术</span><span className="brand-pill">FM-01</span>
            </a>
            <StaticSiteNav currentPath={currentPath} />
            <StepNav prev={prev} next={next} />
          </div>
        </header>
      )}
    />
  );
}
