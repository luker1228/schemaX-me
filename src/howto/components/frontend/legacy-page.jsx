import React, { useEffect, useRef } from "react";
import { initLegacyEnhancements } from "./legacy-enhancements.js";
import { withBasePath, withHowtoManualPath } from "../../lib/paths.js";
import { PageFrame, SiteNav, StepNav } from "./site-components.jsx";

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

function stripEmbeddedHeader(html) {
  return html.replace(/^\s*<header class="site-header"[\s\S]*?<\/header>\s*/i, "");
}

export function LegacyPage({ title, html, currentPath = "", prev = null, next = null }) {
  const rootRef = useRef(null);
  const renderedHtml = stripEmbeddedHeader(rewriteLegacyHtmlForBase(html));

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (!rootRef.current) return undefined;
    return initLegacyEnhancements(rootRef.current);
  }, [renderedHtml]);

  return (
    <PageFrame title={title}>
      <>
        <header className="site-header">
          <div className="lesson-shell site-header-inner">
            <a className="brand-mark" href={withHowtoManualPath("frontend")}>
              <span>前端战术</span><span className="brand-pill">FM-01</span>
            </a>
            <SiteNav currentPath={currentPath} />
            <StepNav prev={prev} next={next} />
          </div>
        </header>
        <div ref={rootRef} dangerouslySetInnerHTML={{ __html: renderedHtml }} />
      </>
    </PageFrame>
  );
}
