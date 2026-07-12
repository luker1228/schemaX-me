import React from "react";
import { CycleText, PageFrame, SiteNav, withBase } from "./site-components.jsx";

const lessons = [
  {
    label: "HTML · 01",
    title: "HTML vs Markdown",
    copy: "标签就是给内容套一层含义，和 Markdown 的逻辑完全一样。",
    href: "lesson-html.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="20" y="30" width="120" height="114" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="20" y="30" width="120" height="22" fill="#00A8F8" stroke="#000" strokeWidth="2"/>
        <text x="32" y="46" fontSize="11" fontWeight="700" fill="#000" fontFamily="monospace">&lt;h1&gt;</text>
        <rect x="30" y="62" width="80" height="6" fill="#000"/>
        <rect x="30" y="74" width="60" height="5" fill="#6B6355"/>
        <rect x="30" y="84" width="90" height="5" fill="#6B6355"/>
        <rect x="30" y="94" width="50" height="5" fill="#6B6355"/>
        <rect x="30" y="112" width="70" height="16" fill="#FFDC58" stroke="#000" strokeWidth="2"/>
        <rect x="178" y="30" width="120" height="114" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="178" y="30" width="120" height="22" fill="#D030A8" stroke="#000" strokeWidth="2"/>
        <text x="190" y="46" fontSize="11" fontWeight="700" fill="#fff" fontFamily="monospace"># MD</text>
        <rect x="188" y="62" width="80" height="6" fill="#000"/>
        <rect x="188" y="74" width="60" height="5" fill="#6B6355"/>
        <rect x="188" y="84" width="90" height="5" fill="#6B6355"/>
        <rect x="188" y="94" width="50" height="5" fill="#6B6355"/>
        <rect x="188" y="112" width="70" height="16" fill="#FFDC58" stroke="#000" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    label: "HTML · 02",
    title: "HTML vs Figma",
    copy: "图层树就是标签树，每一层 div 对应 Figma 里的一个 Frame。",
    href: "lesson-html-2.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="30" y="20" width="110" height="134" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        {/* Figma layers */}
        <rect x="38" y="30" width="94" height="14" fill="#00A8F8" stroke="#000" strokeWidth="1.5"/>
        <rect x="46" y="50" width="78" height="12" fill="#fff" stroke="#000" strokeWidth="1.5"/>
        <rect x="54" y="68" width="62" height="10" fill="#fff" stroke="#000" strokeWidth="1.5"/>
        <rect x="54" y="84" width="62" height="10" fill="#fff" stroke="#000" strokeWidth="1.5"/>
        <rect x="46" y="100" width="78" height="12" fill="#fff" stroke="#000" strokeWidth="1.5"/>
        {/* arrow */}
        <line x1="148" y1="87" x2="168" y2="87" stroke="#000" strokeWidth="2.5" strokeLinecap="square"/>
        <polyline points="162,81 168,87 162,93" stroke="#000" strokeWidth="2.5" strokeLinecap="square" fill="none"/>
        {/* HTML tree */}
        <rect x="176" y="20" width="112" height="134" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <text x="184" y="36" fontSize="10" fill="#000" fontFamily="monospace" fontWeight="700">&lt;body&gt;</text>
        <text x="196" y="54" fontSize="10" fill="#00A8F8" fontFamily="monospace">&lt;header&gt;</text>
        <text x="208" y="70" fontSize="10" fill="#6B6355" fontFamily="monospace">&lt;h1&gt;</text>
        <text x="208" y="86" fontSize="10" fill="#6B6355" fontFamily="monospace">&lt;nav&gt;</text>
        <text x="196" y="104" fontSize="10" fill="#00A8F8" fontFamily="monospace">&lt;main&gt;</text>
        <text x="196" y="120" fontSize="10" fill="#6B6355" fontFamily="monospace">&lt;/main&gt;</text>
        <text x="184" y="140" fontSize="10" fill="#000" fontFamily="monospace" fontWeight="700">&lt;/body&gt;</text>
      </svg>
    ),
  },
  {
    label: "CSS · 01",
    title: "CSS 属性清单",
    copy: "字号、颜色、间距、方向——四类属性覆盖 80% 的日常样式需求。",
    href: "lesson-css.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="30" y="24" width="258" height="126" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        {/* color swatch row */}
        <rect x="42" y="36" width="22" height="22" fill="#FFDC58" stroke="#000" strokeWidth="2"/>
        <rect x="70" y="36" width="22" height="22" fill="#00A8F8" stroke="#000" strokeWidth="2"/>
        <rect x="98" y="36" width="22" height="22" fill="#D030A8" stroke="#000" strokeWidth="2"/>
        <rect x="126" y="36" width="22" height="22" fill="#00C870" stroke="#000" strokeWidth="2"/>
        <rect x="154" y="36" width="22" height="22" fill="#A088D0" stroke="#000" strokeWidth="2"/>
        {/* font size bars */}
        <rect x="42" y="72" width="200" height="10" fill="#000"/>
        <rect x="42" y="88" width="150" height="8" fill="#000"/>
        <rect x="42" y="102" width="100" height="6" fill="#6B6355"/>
        <rect x="42" y="114" width="70" height="5" fill="#6B6355"/>
        {/* spacing indicator */}
        <rect x="220" y="72" width="4" height="52" fill="#FFDC58" stroke="#000" strokeWidth="1.5"/>
        <rect x="228" y="72" width="40" height="52" fill="none" stroke="#D030A8" strokeWidth="2" strokeDasharray="4 3"/>
        <rect x="232" y="80" width="32" height="36" fill="#fff" stroke="#000" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    label: "CSS · 02",
    title: "CSS vs Figma",
    copy: "属性面板就是 CSS，Figma 的 Inspector 和写样式说的是同一件事。",
    href: "lesson-css-2.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Figma inspector panel */}
        <rect x="20" y="20" width="100" height="134" fill="#1E1E1B" stroke="#000" strokeWidth="2"/>
        <rect x="28" y="30" width="84" height="8" fill="#6B6355"/>
        <rect x="28" y="44" width="30" height="6" fill="#FFDC58"/>
        <rect x="64" y="44" width="40" height="6" fill="#6B6355"/>
        <rect x="28" y="56" width="30" height="6" fill="#FFDC58"/>
        <rect x="64" y="56" width="50" height="6" fill="#6B6355"/>
        <rect x="28" y="68" width="30" height="6" fill="#FFDC58"/>
        <rect x="64" y="68" width="35" height="6" fill="#6B6355"/>
        <rect x="28" y="80" width="30" height="6" fill="#FFDC58"/>
        <rect x="64" y="80" width="45" height="6" fill="#6B6355"/>
        {/* equals arrow */}
        <text x="132" y="95" fontSize="28" fill="#000" fontWeight="900">=</text>
        {/* CSS code */}
        <rect x="162" y="20" width="136" height="134" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <text x="170" y="38" fontSize="9" fill="#00A8F8" fontFamily="monospace">.card {"{"}</text>
        <text x="178" y="54" fontSize="9" fill="#000" fontFamily="monospace">font-size: 16px;</text>
        <text x="178" y="68" fontSize="9" fill="#000" fontFamily="monospace">color: #000;</text>
        <text x="178" y="82" fontSize="9" fill="#000" fontFamily="monospace">padding: 24px;</text>
        <text x="178" y="96" fontSize="9" fill="#000" fontFamily="monospace">gap: 12px;</text>
        <text x="170" y="112" fontSize="9" fill="#00A8F8" fontFamily="monospace">{"}"}</text>
      </svg>
    ),
  },
  {
    label: "JavaScript",
    title: "JavaScript：负责交互。",
    copy: "点击、输入、提交——状态变化就是事件驱动，先认识这个循环。",
    href: "lesson-js.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* button */}
        <rect x="109" y="22" width="100" height="36" fill="#FFDC58" stroke="#000" strokeWidth="3"/>
        <rect x="127" y="33" width="64" height="9" fill="#000"/>
        {/* arrow down */}
        <line x1="159" y1="60" x2="159" y2="84" stroke="#000" strokeWidth="2.5" strokeLinecap="square"/>
        <polyline points="152,78 159,85 166,78" stroke="#000" strokeWidth="2.5" strokeLinecap="square" fill="none"/>
        {/* event label */}
        <rect x="104" y="88" width="110" height="22" fill="#000"/>
        <rect x="100" y="84" width="110" height="22" fill="#D030A8" stroke="#000" strokeWidth="2"/>
        <text x="114" y="99" fontSize="10" fill="#fff" fontFamily="monospace" fontWeight="700">onClick event</text>
        {/* arrow down */}
        <line x1="159" y1="108" x2="159" y2="126" stroke="#000" strokeWidth="2.5" strokeLinecap="square"/>
        <polyline points="152,120 159,127 166,120" stroke="#000" strokeWidth="2.5" strokeLinecap="square" fill="none"/>
        {/* state change */}
        <rect x="89" y="130" width="140" height="26" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="97" y="137" width="60" height="6" fill="#000"/>
        <rect x="163" y="137" width="4" height="6" fill="#FFDC58"/>
        <rect x="171" y="137" width="50" height="6" fill="#00C870"/>
      </svg>
    ),
  },
  {
    label: "组件",
    title: "组件：负责复用。",
    copy: "一段 UI 写一次，到处使用——理解 props 和 children，组件就清楚了。",
    href: "lesson-react.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* master component */}
        <rect x="109" y="14" width="100" height="50" fill="#00C870" stroke="#000" strokeWidth="3"/>
        <rect x="121" y="24" width="40" height="7" fill="#000"/>
        <rect x="121" y="36" width="60" height="5" fill="#000" opacity="0.4"/>
        <rect x="121" y="46" width="50" height="5" fill="#000" opacity="0.4"/>
        {/* line to instances */}
        <line x1="100" y1="64" x2="70" y2="96" stroke="#000" strokeWidth="2" strokeLinecap="square"/>
        <line x1="159" y1="64" x2="159" y2="96" stroke="#000" strokeWidth="2" strokeLinecap="square"/>
        <line x1="218" y1="64" x2="248" y2="96" stroke="#000" strokeWidth="2" strokeLinecap="square"/>
        {/* instances */}
        {[40, 119, 198].map((x, i) => (
          <g key={i}>
            <rect x={x} y={98} width={80} height={44} fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
            <rect x={x+10} y={108} width={40} height={6} fill="#000"/>
            <rect x={x+10} y={120} width={60} height={4} fill="#6B6355"/>
            <rect x={x+10} y={128} width={50} height={4} fill="#6B6355"/>
          </g>
        ))}
      </svg>
    ),
  },
  {
    label: "布局 · 01",
    title: "布局第一课",
    copy: "Flex 和 Grid 是两把尺子，搞懂主轴方向，排列就不再靠猜。",
    href: "lesson-layout.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* flex row demo */}
        <rect x="20" y="22" width="278" height="56" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="28" y="30" width="60" height="40" fill="#A088D0" stroke="#000" strokeWidth="2"/>
        <rect x="96" y="30" width="60" height="40" fill="#A088D0" stroke="#000" strokeWidth="2"/>
        <rect x="164" y="30" width="60" height="40" fill="#A088D0" stroke="#000" strokeWidth="2"/>
        <rect x="232" y="30" width="58" height="40" fill="#000" stroke="#000" strokeWidth="2"/>
        {/* grid demo */}
        <rect x="20" y="96" width="134" height="60" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="26" y="102" width="56" height="22" fill="#FFDC58" stroke="#000" strokeWidth="2"/>
        <rect x="88" y="102" width="60" height="22" fill="#FFDC58" stroke="#000" strokeWidth="2"/>
        <rect x="26" y="128" width="122" height="22" fill="#000" stroke="#000" strokeWidth="2"/>
        <rect x="162" y="96" width="136" height="60" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="168" y="102" width="38" height="52" fill="#00C870" stroke="#000" strokeWidth="2"/>
        <rect x="212" y="102" width="80" height="22" fill="#fff" stroke="#000" strokeWidth="2"/>
        <rect x="212" y="130" width="80" height="22" fill="#fff" stroke="#000" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    label: "布局 · 02",
    title: "布局第二课",
    copy: "常见页面骨架拆解：顶栏、侧边栏、内容区的排列逻辑。",
    href: "lesson-layout-2.html",
    preview: (
      <svg viewBox="0 0 318 174" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* full page skeleton */}
        <rect x="30" y="14" width="258" height="24" fill="#1E1E1B" stroke="#000" strokeWidth="2"/>
        <rect x="38" y="20" width="50" height="12" fill="#FFDC58"/>
        <rect x="200" y="20" width="80" height="12" fill="#6B6355" opacity="0.5"/>
        {/* sidebar + main */}
        <rect x="30" y="44" width="60" height="102" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="36" y="54" width="48" height="8" fill="#A088D0"/>
        <rect x="36" y="68" width="48" height="6" fill="#6B6355"/>
        <rect x="36" y="80" width="48" height="6" fill="#6B6355"/>
        <rect x="36" y="92" width="48" height="6" fill="#6B6355"/>
        <rect x="36" y="104" width="48" height="6" fill="#6B6355"/>
        <rect x="96" y="44" width="192" height="48" fill="#fff" stroke="#000" strokeWidth="2"/>
        <rect x="104" y="54" width="80" height="10" fill="#000"/>
        <rect x="104" y="70" width="170" height="6" fill="#6B6355"/>
        <rect x="96" y="98" width="92" height="48" fill="#FFDC58" stroke="#000" strokeWidth="2"/>
        <rect x="104" y="108" width="60" height="8" fill="#000"/>
        <rect x="104" y="122" width="76" height="6" fill="#000" opacity="0.4"/>
        <rect x="194" y="98" width="94" height="48" fill="#EFE7D6" stroke="#000" strokeWidth="2"/>
        <rect x="202" y="108" width="60" height="8" fill="#000"/>
        <rect x="202" y="122" width="78" height="6" fill="#6B6355"/>
      </svg>
    ),
  },
];

const faqs = [
  {
    title: "智能助手都能写代码了，为什么还要学这些？",
    copy: `因为问题不在"能不能生成"，而在"你能不能描述清楚要生成什么"。组件、状态和页面结构，是你和智能助手对齐的语言。`,
    open: true,
  },
  {
    title: "是不是应该一开始就学组件化框架？",
    copy: "不是。先搞懂结构、布局和状态，再看组件化组织方式，理解会扎实很多。",
  },
  {
    title: "我没有设计感，能做出能看的页面吗？",
    copy: "可以。你不需要先成为设计师，但要先知道页面由哪些块组成、块之间怎么排，以及每个状态长什么样。",
  },
];

export function IndexPage() {
  return (
    <PageFrame title="非前端人的前端战术手册">
      <div className="site-shell">
        <header className="site-header">
          <div className="container site-header-inner">
            <a className="brand-mark" href={withBase("index.html")}>
              <span>新前端中心</span>
              <span className="brand-pill">手册</span>
            </a>
            <SiteNav />
            <div className="header-actions">
              <div className="header-search">
                <input className="search-input" type="search" placeholder="搜索前端战术手册..." aria-label="搜索前端战术手册" />
              </div>
              <a className="button" href={withBase("lesson-html.html")}>开始学习 →</a>
            </div>
          </div>
        </header>

        <main className="container">
          <section className="hero">
            <div className="hero-grid">
              <div className="hero-copy-block">
                <div className="hero-title-wrap">
                  <h1 className="hero-title-structured">
                    <span className="hero-title-row1">
                      非前端人的
                      <img aria-hidden="true" className="hero-decor hero-decor-heart" src={withBase("decor/heart.svg")} alt="" />
                    </span>
                    <span className="accent-text">前端战术手册</span>
                  </h1>
                </div>
                <p className="hero-subtitle-structured">
                  默认你已经有一点互联网基础。从 HTML、CSS、JavaScript、组件到布局，用 AI 写出看得见的页面，适合
                  <CycleText items={["设计师", "产品", "运营", "后端"]} />
                  同学一起看。
                </p>
                <div className="hero-actions">
                  <a className="button" href={withBase("lesson-html.html")}>开始学习 →</a>
                </div>
                <div className="hero-search-card bare">
                  <div className="hero-tags">
                    {["结构与标签", "布局与样式", "状态与事件", "组件化基础", "排列与分列", "后端转前端"].map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <aside className="hero-note">
                <span className="micro-label">这份手册解决什么</span>
                <p className="hero-note-copy">不是系统培养前端工程师，而是帮设计师、产品、运营和后端快速获得"能看懂页面、能拆组件、能让智能助手改对前端"的表达能力。</p>
              </aside>
            </div>
          </section>

          <section className="section" id="guides">
            <div className="section-header">
              <div className="section-kicker-wrap">
                <img aria-hidden="true" className="section-decor-compas" src={withBase("decor/compas.svg")} alt="" />
                <span className="section-kicker">学习路径</span>
              </div>
            </div>
            <div className="lesson-card-grid">
              {lessons.map((lesson) => (
                <a key={lesson.href} className="lesson-card" href={withBase(lesson.href)}>
                  <div className="lesson-card-preview">
                    {lesson.preview}
                  </div>
                  <div className="lesson-card-body">
                    <span className="lesson-card-label">{lesson.label}</span>
                    <h3 className="lesson-card-title">{lesson.title}</h3>
                    <p className="lesson-card-copy">{lesson.copy}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="section section-spacious" id="faq">
            <div className="section-header">
              <div>
                <div className="section-kicker-wrap">
                  <img aria-hidden="true" className="section-decor-pen" src={withBase("decor/pen_design.svg")} alt="" />
                  <span className="section-kicker">常见问题</span>
                </div>
                <p className="section-subtitle">剩下只回答三个最常见的问题，然后就开始动手。</p>
              </div>
            </div>
            <div className="faq-grid">
              {faqs.map((faq) => (
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
              <a className="brand-mark" href={withBase("index.html")}>
                <span>新前端中心</span>
                <span className="brand-pill">手册</span>
              </a>
              <p className="card-copy">给设计师、产品、运营和后端的前端战术手册：理解结构、样式、交互与组件语言。</p>
            </div>
            <div className="footer-col">
              <span className="footer-caption">课程</span>
              <a href={withBase("lesson-html.html")}>结构课</a>
              <a href={withBase("lesson-css.html")}>样式课</a>
              <a href={withBase("lesson-js.html")}>交互课</a>
              <a href={withBase("lesson-react.html")}>先认词</a>
              <a href={withBase("lesson-layout.html")}>布局第一课</a>
              <a href={withBase("lesson-layout-2.html")}>布局第二课</a>
            </div>
            <div className="footer-col">
              <span className="footer-caption">资料库</span>
              <a href={withBase("lesson-react.html")}>组件课</a>
              <a href={withBase("prompts.html")}>提示词页</a>
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
