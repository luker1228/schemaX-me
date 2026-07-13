import React from "react";

const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
const withBase = (path = "") => `${baseUrl}${path.replace(/^\//, "")}`;

const lessons = [
  {
    id: "DEP-01",
    title: "从编译产物到镜像",
    href: withBase("howto/deploy/docker-artifact-image/"),
    status: "已解密",
    tags: "Dockerfile · 多阶段构建 · 运行时配置"
  }
];

export function DeployIndexPage() {
  return (
    <section className="shell-wide deploy-manual">
      <div className="deploy-atmosphere" aria-hidden="true"></div>
      <div className="deploy-wrap">
        <div className="deploy-topbar">
          <span>
            luke@human-llm<span>:~/howto/deploy</span>$ ls ./lessons
          </span>
          <a href={withBase("howto/")}>返回手册库</a>
        </div>

        <header className="deploy-hero">
          <span className="deploy-kicker">// FIELD MANUAL · FM-02</span>
          <h1>部署战术手册</h1>
        </header>

        <div className="deploy-lesson-grid">
          {lessons.map((lesson) => (
            <a className="deploy-lesson-file" href={lesson.href} key={lesson.id}>
              <span className="deploy-lesson-status">{lesson.status}</span>
              <span className="deploy-lesson-id">{lesson.id}</span>
              <h2>{lesson.title}</h2>
              <p>{lesson.tags}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
