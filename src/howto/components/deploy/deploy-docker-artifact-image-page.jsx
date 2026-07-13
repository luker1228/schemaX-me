import React from "react";
import { PageFrame } from "../frontend/site-components.jsx";
import { withHowtoManualPath } from "../../lib/paths.js";

export function DeployDockerArtifactImagePage({ lesson, prev, next }) {
  return (
    <PageFrame title="从编译产物到镜像 · 部署战术手册">
      <>
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

        <header className="html2-hero html-reading-hero">
          <div className="lesson-shell">
            <div className="html2-hero-meta">
              <span className="html2-pill html2-pill-fill">{lesson.heroMeta.eyebrow}</span>
              <span className="html2-pill">{lesson.heroMeta.secondary}</span>
              <span className="html2-label">{lesson.heroMeta.readingTime}</span>
            </div>
            <div className="html2-hero-grid">
              <div className="html2-hero-copy">
                <h1 className="page-title">
                  <span className="html2-title-line">{lesson.heroMeta.lines[0].split(lesson.heroMeta.emphasis)[0]}<span className="html2-title-em">{lesson.heroMeta.emphasis}</span></span>
                  <span className="html2-title-line">{lesson.heroMeta.lines[1]}</span>
                </h1>
              </div>
              <div className="html2-hero-side">
                {lesson.heroMeta.side.map(([k, v]) => (
                  <div className="html2-hero-row" key={k}><span className="html2-hero-k">{k}</span><span className="html2-hero-v">{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="lesson-shell lesson-main">
          <aside className="lesson-aside lesson-floating-toc">
            <button type="button" className="toc-toggle" aria-expanded="true">目录</button>
            <div className="toc-body">
              <span className="micro-label">章节目录</span>
              <ul className="toc-list">
                {lesson.toc.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="lesson-prose">
            <section className="lesson-section" id="deploy-core">
              <div className="section-head">
                <div>
                  <div className="section-num"><strong>01</strong> / 核心</div>
                  <h2 className="section-title">打包镜像，到底在打包什么</h2>
                </div>
              </div>
              <div className="html2-inline-note">
                <span className="html2-inline-note-tag">核心</span>
                <p>代码编译之后会得到一个真正可运行的产物。Go 是二进制，Java 是 JAR，前端通常是 <code>dist/</code>。镜像不是在打包源码，而是在打包 <strong>产物 + 运行时环境</strong>。</p>
              </div>
              <pre className="code-block"><code>{`源码 --编译--> 产物 artifact --打包--> 镜像 image`}</code></pre>
            </section>

            <section className="lesson-section" id="deploy-local-build">
              <h2>本地构建产物为什么经常有坑</h2>
              <div className="comparison-card">
                <div>
                  <span className="micro-label">做法 A</span>
                  <pre className="code-block"><code>{`FROM alpine:3.19
COPY myapp .
CMD ["./myapp"]`}</code></pre>
                  <p>本地编译完直接 COPY 进去，简单，但环境很容易不一致。macOS 编出来的二进制放进 Linux 镜像，就会遇到 <code>exec format error</code>。</p>
                </div>
                <div>
                  <span className="micro-label">做法 B</span>
                  <pre className="code-block"><code>{`FROM golang:1.22
WORKDIR /app
COPY . .
RUN go build -o myapp .
CMD ["./myapp"]`}</code></pre>
                  <p>环境统一了，但把源码和工具链都塞进了生产镜像，体积大、风险高、构建也慢。</p>
                </div>
              </div>
            </section>

            <section className="lesson-section" id="deploy-multi-stage">
              <h2>真正的解法：编译和运行分开</h2>
              <p>多阶段构建的关键，不是“高级语法”，而是把职责拆开。一个阶段负责编译，一个阶段只负责运行，最终镜像只保留最后那个运行阶段。</p>
              <pre className="code-block"><code>{`FROM golang:1.22 AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o myapp .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/myapp .
CMD ["./myapp"]`}</code></pre>
              <div className="preview-section">
                <span className="preview-label">关键动作</span>
                <div className="preview-content">
                  <p><code>COPY --from=builder</code> 只把产物从前一个阶段拿过来，不把 Go、Node、源码和构建缓存带进最终镜像。</p>
                </div>
              </div>
            </section>

            <section className="lesson-section" id="deploy-runtime">
              <h2>不同产物，对应不同运行阶段</h2>
              <div className="comparison-card">
                <div>
                  <span className="micro-label">静态二进制</span>
                  <p>Go / Rust 这种尽量编成静态二进制的产物，运行阶段通常只需要 <code>scratch</code> 或 <code>alpine</code>。</p>
                </div>
                <div>
                  <span className="micro-label">有运行时依赖</span>
                  <p>Java 需要 JVM，前端静态包需要 Web 服务器，所以最终镜像应当显式选成 <code>eclipse-temurin:21-jre</code> 或 <code>nginx:alpine</code> 这类运行时镜像。</p>
                </div>
              </div>
              <pre className="code-block"><code>{`FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html`}</code></pre>
            </section>

            <section className="lesson-section" id="deploy-habits">
              <h2>打包好镜像的几个默认习惯</h2>
              <ul>
                <li><strong>.dockerignore</strong>：把 <code>node_modules</code>、<code>.git</code>、测试数据排除在构建上下文之外。</li>
                <li><strong>小基础镜像</strong>：优先 <code>alpine</code>、<code>-slim</code>、<code>distroless</code>。</li>
                <li><strong>依赖先拷，源码后拷</strong>：让层缓存真正发挥作用。</li>
                <li><strong>非 root 运行</strong>：用 <code>USER appuser</code> 降低运行风险。</li>
              </ul>
            </section>

            <section className="lesson-section" id="deploy-config">
              <h2>配置不要打进镜像</h2>
              <p>同一个镜像应该能跑 dev、test、prod。环境差异来自外部注入，而不是打出三份镜像。</p>
              <pre className="code-block"><code>{`docker run -e CONFIG_FILE=/app/config.yaml \\
  -v ./config.yaml:/app/config.yaml \\
  myapp:1.0`}</code></pre>
              <p>复杂配置走文件挂载，简单配置走环境变量。镜像只负责应用本体，不负责把环境写死。</p>
            </section>

            <section className="lesson-section" id="deploy-summary">
              <h2>一句话总结</h2>
              <div className="html2-inline-note">
                <span className="html2-inline-note-tag">结论</span>
                <p>镜像的本质是: <strong>只把运行时真正需要的东西带进去，其余全部留在构建阶段或运行环境外部。</strong></p>
              </div>
            </section>
          </article>
        </main>
      </>
    </PageFrame>
  );
}
