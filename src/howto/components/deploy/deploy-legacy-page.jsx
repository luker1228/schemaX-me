import React from "react";
import { withHowtoManualPath } from "../../lib/paths.js";
import { LegacyPageShell } from "../shared/legacy-page-shell.jsx";

function rewriteHtmlForBase(html) {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  return html
    .replace(/href="\/(?!\/)/g, `href="${baseUrl}`)
    .replace(/src="\/(?!\/)/g, `src="${baseUrl}`);
}

export function DeployLegacyPage({ title, html, prev = null, next = null }) {
  return (
    <LegacyPageShell
      title={title}
      html={html}
      rewriteHtml={rewriteHtmlForBase}
      renderHeader={() => (
        <header className="site-header">
          <div className="lesson-shell site-header-inner">
            <a className="brand-mark" href={withHowtoManualPath("deploy")}>
              <span>部署战术</span><span className="brand-pill">FM-02</span>
            </a>
            <nav className="nav-links">
              <a href={withHowtoManualPath("deploy")}>部署首页</a>
            </nav>
            <div className="step-nav">
              {prev ? (
                <a className="step-nav-btn" href={withHowtoManualPath("deploy", prev.slug)} title={prev.title}>
                  ← 上一节
                </a>
              ) : (
                <a className="step-nav-btn" href={withHowtoManualPath("deploy")} title="部署战术手册">
                  ← 返回目录
                </a>
              )}
              {next ? (
                <a className="step-nav-btn is-next" href={withHowtoManualPath("deploy", next.slug)} title={next.title}>
                  下一节 →
                </a>
              ) : (
                <a className="step-nav-btn is-next" aria-disabled="true">
                  下一节 →
                </a>
              )}
            </div>
          </div>
        </header>
      )}
    />
  );
}
