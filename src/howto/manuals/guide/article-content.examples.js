const codeBlockPreview = `const topic = "HTML + CSS";
const message = "用代码说明一个可复用的结构。";`;

const codeBlockHtml = `<pre class="guide-code" tabindex="0">
  <code>
    const topic = "HTML + CSS";
    const message = "用代码说明一个可复用的结构。";
  </code>
</pre>`;

const cssRulePattern = /([^{}]+)\{([^{}]*)\}/g;

function indentLines(value, spaces) {
  const padding = " ".repeat(spaces);
  return value.split("\n").map((line) => `${padding}${line}`).join("\n");
}

export function extractCssRules(cssSource, selectors) {
  const normalizedCssSource = cssSource.replace(/\/\*[\s\S]*?\*\//g, "");
  const expected = new Set(selectors);
  const found = new Map();

  for (const match of normalizedCssSource.matchAll(cssRulePattern)) {
    const selector = match[1].trim();
    if (expected.has(selector)) {
      found.set(selector, `${selector} {${match[2]}}`);
    }
  }

  const missing = selectors.filter((selector) => !found.has(selector));
  if (missing.length > 0) {
    throw new Error(`Missing article-content CSS contract selectors: ${missing.join(", ")}`);
  }

  return selectors.map((selector) => found.get(selector)).join("\n\n");
}

export function createArticleContentExamples(cssSource) {
  const css = (selectors) => extractCssRules(cssSource, selectors);

  return {
    headings: {
      html: `<article class="lesson-article-preview-card">
  <h2>文章二级标题</h2>
  <h3>文章三级标题</h3>
  <h4>文章四级标题</h4>
</article>`,
      css: css([
        ".lesson-article-preview-card h2",
        ".lesson-article-preview-card h3",
        ".lesson-article-preview-card h4",
      ]),
    },
    previewCard: {
      html: `<article class="lesson-article-preview-card">
  <p>这是一块预览区。</p>
</article>`,
      css: css([".lesson-article-preview-card"]),
    },
    articleBody: {
      html: `<article class="lesson-article-preview-card">
  <p>这是一段正文，用来说明当前章节要解决的问题。</p>
  <p>第二段补充关键判断或下一步动作。</p>
</article>`,
      css: css([
        ".lesson-article-preview-card p",
        ".lesson-article-preview-card p + p",
      ]),
    },
    toc: {
      html: `<nav class="lesson-article-toc" aria-label="文章目录">
  <span class="lesson-article-toc-label">目录</span>
  <ol class="lesson-article-toc-list">
    <li>
      <a href="#why">为什么需要多阶段构建</a>
      <ol class="lesson-article-toc-sub">
        <li><a href="#problem">单阶段构建的局限</a></li>
        <li><a href="#idea">分阶段的思路</a></li>
      </ol>
    </li>
    <li>
      <a href="#how">如何分离构建与运行</a>
    </li>
    <li>
      <a href="#check">发布前检查</a>
    </li>
  </ol>
</nav>`,
      css: css([
        ".lesson-article-toc",
        ".lesson-article-toc-label",
        ".lesson-article-toc-list",
        ".lesson-article-toc-list > li > a",
        ".lesson-article-toc-list > li > a:hover",
        ".lesson-article-toc-sub",
        ".lesson-article-toc-sub a",
        ".lesson-article-toc-sub a:hover",
      ]),
    },
    navToc: {
      html: `<nav class="lesson-article-nav" aria-label="导航目录">
  <span class="lesson-article-nav-title">导航目录</span>
  <ul class="lesson-article-nav-group">
    <li class="lesson-article-nav-group-label">SECTIONS</li>
    <li><a class="lesson-article-nav-item is-active" href="#hero">课程 Hero 标题区</a></li>
    <li><a class="lesson-article-nav-item" href="#heading">课程章节引导区</a></li>
    <li><a class="lesson-article-nav-item" href="#actions">行动与状态区</a></li>
  </ul>
  <ul class="lesson-article-nav-group">
    <li class="lesson-article-nav-group-label">COMPONENTS</li>
    <li><a class="lesson-article-nav-item" href="#card">课程目录入口</a></li>
    <li><a class="lesson-article-nav-item" href="#faq">检查与答疑区</a></li>
  </ul>
</nav>`,
      css: css([
        ".lesson-article-nav",
        ".lesson-article-nav-title",
        ".lesson-article-nav-group",
        ".lesson-article-nav-group + .lesson-article-nav-group",
        ".lesson-article-nav-group-label",
        ".lesson-article-nav-item",
        ".lesson-article-nav-item:hover",
        ".lesson-article-nav-item.is-active",
      ]),
    },
    blockquote: {
      html: `<blockquote class="lesson-article-inline-note">
  <p><code>p + p</code> 为连续段落建立稳定的阅读间距。</p>
</blockquote>`,
      css: css([
        ".lesson-article-inline-note",
        ".lesson-article-inline-note::before",
        ".lesson-article-inline-note p",
        ".lesson-article-inline-note code",
      ]),
    },
    codeBlock: {
      preview: codeBlockPreview,
      html: codeBlockHtml,
      css: `.guide-code {
  position: relative;
  margin: 0;
  padding: 0.875rem 1rem;
  overflow: auto;
  background: #f0e7d6;
  color: #1f2328;
  font-family: var(--font-mono);
  font-size: clamp(0.78rem, 1.5vw, 1rem);
  line-height: 1.7;
}`,
    },
    basicPreviewCode: {
      html: `<article class="lesson-article-preview-card">
  <pre class="guide-code" tabindex="0">
    <code>
      const topic = "HTML + CSS";
      const message = "用代码说明一个可复用的结构。";
    </code>
  </pre>
</article>`,
      css: `${css([".lesson-article-preview-card"])}

.guide-code {
  position: relative;
  margin: 0;
  padding: 0.875rem 1rem;
  overflow: auto;
  background: #f0e7d6;
  color: #1f2328;
  font-family: var(--font-mono);
  font-size: clamp(0.78rem, 1.5vw, 1rem);
  line-height: 1.7;
}`,
    },
    fileCodeBlock: {
      code: `{
  "registries": {
    "@retroui": "https://retroui.dev/r/radix/{name}.json",
    "@retroui-base": "https://retroui.dev/r/base/{name}.json"
  }
}`,
      html: `<figure class="file-code-block">
  <figcaption class="file-code-header">
    <span class="file-code-file">
      <svg class="file-code-mark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="..."></path>
      </svg>
      components.json
    </span>

    <button class="file-code-copy" type="button" data-copy-code aria-label="复制 components.json 代码">
      <span class="sr-only">复制</span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="12" height="12" rx="2"></rect>
        <path d="M5 15V5a2 2 0 0 1 2-2h10"></path>
      </svg>
    </button>
  </figcaption>

  <pre data-language="json">
    <code data-language="json">
      {
        "registries": {
          "@retroui": "https://retroui.dev/r/radix/{name}.json",
          "@retroui-base": "https://retroui.dev/r/base/{name}.json"
        }
      }
    </code>
  </pre>
</figure>`,
      css: css([
        ".file-code-block",
        ".file-code-header",
        ".file-code-file",
        ".file-code-mark",
        ".file-code-copy",
        ".file-code-copy svg",
        ".file-code-copy:hover, .file-code-copy:focus-visible",
        ".file-code-copy[data-copied]",
        ".file-code-copy[data-copied] svg",
        ".file-code-copy[data-copied]::after",
        ".file-code-block pre",
        ".file-code-block code",
        ".file-code-block code > span",
        ".file-code-key",
        ".file-code-url",
      ]),
    },
    previewCodePair: {
      html: `<div class="lesson-preview-code-pair is-code-collapsed">
  <article class="lesson-article-preview-card">
    <p>这是一块预览区。</p>
  </article>

  <div class="lesson-preview-code-panel">
    <figure class="guide-code-figure">
${indentLines(codeBlockHtml, 6)}
    </figure>
  </div>

  <button class="lesson-preview-code-toggle" type="button" data-toggle-preview-code aria-expanded="false">
    <span>展开代码</span>
    <span aria-hidden="true">↓</span>
  </button>
</div>`,
      css: css([
        ".lesson-preview-code-pair",
        ".lesson-preview-code-pair .lesson-article-preview-card",
        ".lesson-preview-code-panel",
        ".lesson-preview-code-pair .guide-code-figure",
        ".lesson-preview-code-toggle",
        ".lesson-preview-code-toggle:hover,\n.lesson-preview-code-toggle:focus-visible",
        ".lesson-preview-code-pair.is-code-collapsed .lesson-preview-code-panel",
        ".lesson-preview-code-pair.is-code-collapsed .guide-code-copy",
        ".lesson-preview-code-pair.is-code-collapsed .lesson-preview-code-panel::after",
      ]),
    },
  };
}
