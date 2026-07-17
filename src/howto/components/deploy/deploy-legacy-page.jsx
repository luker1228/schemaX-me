import React from "react";
import { withBasePath, withHowtoManualPath } from "../../lib/paths.js";
import { LegacyPageShell } from "../shared/legacy-page-shell.jsx";

function rewriteHtmlForBase(html) {
  const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  return html
    .replace(/href="\/(?!\/)/g, `href="${baseUrl}`)
    .replace(/src="\/(?!\/)/g, `src="${baseUrl}`);
}

function DeployCourseStepNav({ prev, next }) {
  return (
    <footer className="course-step-nav" aria-label="课程翻页">
      {prev ? <a href={withHowtoManualPath("deploy", prev.slug)}>← {prev.title}</a> : <a href={withHowtoManualPath("deploy")}>← 返回目录</a>}
      {next ? <a className="is-next" href={withHowtoManualPath("deploy", next.slug)}>下一节：{next.title} →</a> : <span>已完成本路线</span>}
    </footer>
  );
}

export function DeployLegacyPage({ title, html, prev = null, next = null }) {
  return (
    <LegacyPageShell
      title={title}
      html={html}
      rewriteHtml={rewriteHtmlForBase}
      renderHeader={() => (
        <header className="site-header manual-topbar-header">
          <div className="shell shell-wide manual-global-bar">
            <a className="brand-mark" href={withHowtoManualPath("deploy")}>
              <span>部署战术</span><span className="brand-pill">FM-02</span>
            </a>
            <div className="header-actions" aria-label="固定入口">
              <a className="header-action header-action-manual" href={withBasePath("howto/")}>战术手册</a>
              <a className="header-action header-action-github" href="https://github.com/luker1228" target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span>GitHub</a>
            </div>
          </div>
        </header>
      )}
      renderFooter={() => <DeployCourseStepNav prev={prev} next={next} />}
    />
  );
}
