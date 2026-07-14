import React from "react";
import { withBasePath, withHowtoManualPath } from "../../lib/paths.js";
import { SiteNav, StepNav } from "./site-components.jsx";
import { LegacyPageShell } from "../shared/legacy-page-shell.jsx";

function rewriteLegacyUrl(rawPath) {
  if (!rawPath || rawPath.startsWith("#") || /^[a-z]+:/i.test(rawPath)) return rawPath;
  const normalized = rawPath.startsWith("/") ? rawPath.slice(1) : rawPath;
  if (!normalized || normalized === "index.html") return withHowtoManualPath("frontend");
  if (normalized.endsWith(".html")) return withHowtoManualPath("frontend", normalized);
  return withBasePath(normalized);
}

function rewriteLegacyHtmlForBase(html) {
  return html
    .replace(/href="([^"]*)"/g, (_, path) => `href="${rewriteLegacyUrl(path)}"`)
    .replace(/src="([^"]*)"/g, (_, path) => `src="${rewriteLegacyUrl(path)}"`);
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
            <SiteNav currentPath={currentPath} />
            <StepNav prev={prev} next={next} />
          </div>
        </header>
      )}
    />
  );
}
