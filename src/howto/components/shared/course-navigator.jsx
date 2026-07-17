import React from "react";

export function CourseNavigator({ previous = null, index, next = null, placement = "bottom", label = "课程导航" }) {
  return (
    <nav className={`lesson-nav lesson-nav-${placement}`} aria-label={label}>
      {previous ? <a href={previous.href}>← {previous.label}</a> : <a href={index.href}>← {index.label}</a>}
      <a href={index.href}>▣ {index.label}</a>
      {next ? <a href={next.href}>{next.label} →</a> : <a href={index.href}>{index.label} →</a>}
    </nav>
  );
}
