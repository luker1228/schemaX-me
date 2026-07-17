import React, { useEffect, useMemo, useState } from "react";
import { withBasePath, withHowtoManualPath } from "../../lib/paths.js";
import { CourseNavigator } from "../shared/course-navigator.jsx";

export function withBase(path = "") {
  return withHowtoManualPath("frontend", path);
}

export function CopyButton({ text, className = "" }) {
  const [label, setLabel] = useState("复制");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setLabel("已复制");
      window.setTimeout(() => setLabel("复制"), 1200);
    } catch {
      setLabel("失败");
    }
  }

  return (
    <button className={`copy-button${className ? ` ${className}` : ""}`} type="button" onClick={handleCopy}>
      {label}
    </button>
  );
}

export function PageFrame({ title, children }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return children;
}

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

function NavDropdown({ course, currentPath }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);
  const parentHref = withBase(course.href || course.perspectives?.[0]?.href || "");

  useEffect(() => {
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className={`nav-dropdown${open ? " is-open" : ""}`} ref={ref}>
      <a href={parentHref} className={`nav-dropdown-link${currentPath === course.href ? " is-current" : ""}`}>
        {course.label}
      </a>
      <button
        type="button"
        className="nav-dropdown-trigger"
        aria-label={`展开${course.label}子菜单`}
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      />
      <div className="nav-dropdown-menu">
        {course.perspectives.map((p) => (
          <a
            key={p.href}
            href={withBase(p.href)}
            className={currentPath === p.href ? "is-current" : ""}
            onClick={() => setOpen(false)}
          >
            {p.text}
          </a>
        ))}
      </div>
    </div>
  );
}

export function SiteNav({ currentPath = "" }) {
  return (
    <nav className="nav-links">
      {COURSES.map((course) =>
        course.perspectives ? (
          <NavDropdown key={course.label} course={course} currentPath={currentPath} />
        ) : (
          <a key={course.label} href={withBase(course.href)} className={currentPath === course.href ? "is-current" : ""} aria-current={currentPath === course.href ? "page" : undefined}>
            {course.label}
          </a>
        )
      )}
    </nav>
  );
}

export function StepNav({ prev, next }) {
  return (
    <div className="step-nav">
      {prev ? (
        <a className="step-nav-btn" href={withBase(prev.href)} title={prev.title}>
          ← 上一节
        </a>
      ) : (
        <a className="step-nav-btn" aria-disabled="true">
          ← 上一节
        </a>
      )}
      {next ? (
        <a className="step-nav-btn is-next" href={withBase(next.href)} title={next.title}>
          下一节 →
        </a>
      ) : (
        <a className="step-nav-btn is-next" aria-disabled="true">
          下一节 →
        </a>
      )}
    </div>
  );
}

export function CourseStepNav({ prev, next, placement = "bottom" }) {
  return <CourseNavigator
    placement={placement}
    label="课程翻页"
    previous={prev ? { href: withBase(prev.href), label: prev.title } : null}
    index={{ href: withBasePath("howto/frontend/"), label: "全部课程" }}
    next={next ? { href: withBase(next.href), label: next.title } : null}
  />;
}

export function ManualCourseLayout({ prev = null, next = null, children }) {
  return (
    <>
      {children}
      <CourseStepNav prev={prev} next={next} />
    </>
  );
}

export function ManualLessonHeader({ currentPath = "" }) {
  return (
    <header className="site-header manual-topbar-header">
      <div className="shell shell-wide manual-global-bar">
        <a className="brand manual-site-brand" href={withBasePath("/")}>
          <span className="brand-avatar manual-brand-avatar">
            <img src={withBasePath("images/brand/logo-min.svg")} alt="schemaX" width="56" height="56" />
          </span>
          <span className="brand-copy manual-brand-copy">
            <span className="brand-mark manual-brand-mark">schemaX</span>
            <span className="brand-subtitle manual-brand-subtitle">绝密计划 · CLASSIFIED</span>
          </span>
        </a>
        <div className="manual-global-actions manual-index-chapters">
          <SiteNav currentPath={currentPath} />
        </div>
        <div className="header-actions" aria-label="固定入口">
          <a className="header-action header-action-manual" href={withBasePath("howto/")}>战术手册</a>
          <a className="header-action header-action-github" href="https://github.com/luker1228" target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span>GitHub</a>
        </div>
      </div>
    </header>
  );
}

export function CycleText({ items, interval = 1800 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [items, interval]);

  return (
    <span className="cycle-container">
      {items.map((item, itemIndex) => (
        <span key={item} className={`cycle-item${itemIndex === index ? " active" : ""}`}>
          {item}
        </span>
      ))}
    </span>
  );
}

export function PromptLibrary({ prompts, filterLabels }) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const visiblePrompts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return prompts.filter((prompt) => {
      const categoryMatch = activeFilter === "all" || prompt.category === activeFilter;
      const queryMatch = !normalized || `${prompt.label} ${prompt.title} ${prompt.text}`.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [activeFilter, prompts, query]);

  return (
    <>
      <div className="prompt-toolbar">
        <input
          className="prompt-search"
          type="search"
          placeholder="Search prompts by page, component, state, or stack..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="filter-row">
        {filterLabels.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button${activeFilter === filter.value ? " active" : ""}`}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="prompt-grid">
        {visiblePrompts.map((prompt) => (
          <article key={prompt.id} className="prompt-card">
            <span className="micro-label">{prompt.label}</span>
            <h3>{prompt.title}</h3>
            <div className="prompt-block" id={prompt.id}>{prompt.text}</div>
            <CopyButton text={prompt.text} />
          </article>
        ))}
      </div>
    </>
  );
}
