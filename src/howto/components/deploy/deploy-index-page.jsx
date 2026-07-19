import React from "react";
import { PageFrame } from "../frontend/site-components.jsx";
import { withBasePath, withHowtoManualPath } from "../../lib/paths.js";
import { deployLessons, deployManual } from "../../manuals/deploy/registry.js";

const withBase = withBasePath;

const preview = (
  <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="20" y="26" width="126" height="122" fill="#EFE7D6" stroke="#000" strokeWidth="2" />
    <text x="34" y="48" fontSize="12" fontWeight="700" fill="#00A8F8" fontFamily="monospace">builder</text>
    <rect x="34" y="60" width="98" height="12" fill="#000" />
    <rect x="34" y="80" width="72" height="8" fill="#6B6355" />
    <rect x="34" y="94" width="80" height="8" fill="#6B6355" />
    <rect x="34" y="112" width="56" height="20" fill="#FFDC58" stroke="#000" strokeWidth="2" />
    <path d="M164 86H206" stroke="#000" strokeWidth="3" strokeLinecap="square" />
    <path d="M197 77L206 86L197 95" stroke="#000" strokeWidth="3" strokeLinecap="square" fill="none" />
    <rect x="222" y="42" width="76" height="92" fill="#EFE7D6" stroke="#000" strokeWidth="2" />
    <text x="234" y="62" fontSize="12" fontWeight="700" fill="#00C870" fontFamily="monospace">runtime</text>
    <rect x="236" y="74" width="46" height="46" fill="#fff" stroke="#000" strokeWidth="2" />
    <rect x="244" y="88" width="30" height="6" fill="#000" />
  </svg>
);

const lessons = deployLessons.map((lesson) => ({
  ...lesson,
  href: withHowtoManualPath("deploy", lesson.slug),
  preview,
}));

const homeHref = withBase("/");
export function DeployIndexPage() {
  return (
    <PageFrame title="部署课程">
      <div className="site-shell deploy-manual-page">
        <header className="site-header manual-topbar-header">
          <div className="shell shell-wide manual-global-bar">
            <a className="brand manual-site-brand" href={homeHref}>
              <span className="brand-logo manual-brand-logo">
                <img src={withBase("images/brand/logo-min.svg")} alt="schemaX" width="56" height="56" />
              </span>
              <span className="brand-text manual-brand-text">
                <span className="brand-name manual-brand-name">schemaX</span>
                <span className="brand-tagline manual-brand-tagline">绝密计划 · CLASSIFIED</span>
              </span>
            </a>
            <div className="header-actions" aria-label="固定入口">
              <a className="header-action header-action-manual" href={withBase("howto/")}>课程</a>
              <a className="header-action header-action-github" href="https://github.com/luker1228" target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span>GitHub</a>
            </div>
          </div>
        </header>

        <main className="container">
          <section className="hero">
            <div className="hero-grid">
              <div className="hero-copy-block">
                <div className="hero-title-wrap">
                  <h1 className="hero-title-structured">
                    <span className="hero-title-row1">{deployManual.heroTitle[0]}</span>
                    <span className="accent-text">{deployManual.heroTitle[1]}</span>
                  </h1>
                </div>
                <p className="hero-subtitle-structured">
                  {deployManual.heroSummary}
                </p>
                <div className="hero-actions">
                  <a className="button" href={lessons[0].href}>开始学习 →</a>
                </div>
                <div className="hero-search-card bare">
                  <div className="hero-tags">
                    {deployManual.heroTags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <aside className="hero-note">
                <span className="micro-label hero-note-label">这份手册解决什么</span>
                <p className="hero-note-copy">不是运维大全，而是先帮你建立上线前最核心的判断力：应用在部署时，到底什么该打包，什么该留在外部。</p>
              </aside>
            </div>
          </section>

          <section className="section" id="guides">
            <div className="section-header">
              <div>
                <span className="section-kicker">学习路径</span>
              </div>
            </div>
            <div className="lesson-card-grid">
              {lessons.map((lesson) => (
                <a key={lesson.href} className="lesson-card" href={lesson.href}>
                  <div className="lesson-card-preview">{lesson.preview}</div>
                  <div className="lesson-card-body">
                    <span className="lesson-card-label">{lesson.label}</span>
                    <h3 className="lesson-card-title">{lesson.title}</h3>
                    <p className="lesson-card-copy">{lesson.summary}</p>
                    <p className="lesson-card-copy">{lesson.tags}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="section section-spacious" id="faq">
            <div className="section-header">
              <div>
                <span className="section-kicker">常见问题</span>
                <p className="section-subtitle">先回答最容易把部署学偏的三个问题。</p>
              </div>
            </div>
            <div className="faq-grid">
              {deployManual.faq.map((faq) => (
                <details key={faq.title} className="faq-item" open={faq.open}>
                  <summary>{faq.title}</summary>
                  <p>{faq.copy}</p>
                </details>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="container footer-grid">
            <div className="footer-col">
              <a className="brand-name" href={withHowtoManualPath("deploy")}>
                <span>部署战术</span><span className="brand-badge">{deployManual.code}</span>
              </a>
              <p className="card-copy">从构建产物、镜像到上线配置，先把部署链路里真正重要的边界建立起来。</p>
            </div>
            <div className="footer-col">
              <span className="footer-caption">课程</span>
              <a href={lessons[0].href}>镜像第一课</a>
            </div>
            <div className="footer-col">
              <span className="footer-caption">目录</span>
              <a href="#guides">学习路径</a>
              <a href="#faq">常见问题</a>
            </div>
          </div>
        </footer>
      </div>
    </PageFrame>
  );
}
