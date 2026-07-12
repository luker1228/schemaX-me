import React, { useEffect, useMemo, useState } from "react";

// HowToFrontend is mounted under the /howto/ Astro routes. Flat inputs like
// "lesson-html.html" or "decor/heart.svg" are mapped onto that prefix so they
// resolve against the current base (/aritcles-hub in prod, / in dev).
const HOWTO = "howto/";
export function withBase(path = "") {
  if (!path || path.startsWith("#") || /^[a-z]+:/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  const b = base.endsWith("/") ? base : `${base}/`;
  let mapped;
  if (path === "index.html") {
    mapped = HOWTO;
  } else if (path.endsWith(".html")) {
    mapped = `${HOWTO}${path.slice(0, -5)}/`;
  } else {
    mapped = `${HOWTO}${path.startsWith("/") ? path.slice(1) : path}`;
  }
  return `${b}${mapped}`;
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
    perspectives: [
      { text: "布局第一课：骨架", href: "lesson-layout.html" },
      { text: "布局第二课：排列", href: "lesson-layout-2.html" },
    ],
  },
];

function NavDropdown({ course, currentPath }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

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
      <button
        type="button"
        className="nav-dropdown-trigger"
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
      >
        {course.label}
      </button>
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
          <a key={course.label} href={withBase(course.href)}>
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
