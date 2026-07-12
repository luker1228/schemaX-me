import React from "react";
import { PageFrame, PromptLibrary, SiteNav, StepNav, withBase } from "./site-components.jsx";

const filters = [
  { value: "all", label: "All" },
  { value: "generation", label: "页面生成" },
  { value: "edit", label: "页面修改" },
  { value: "breakdown", label: "组件拆分" },
  { value: "api", label: "接口对接" },
];

const prompts = [
  {
    id: "prompt-1",
    category: "generation",
    label: "页面生成",
    title: "React SaaS 功能介绍页",
    text: `你是一名前端工程师。请帮我生成一个 React 页面。

页面目标：展示一个 SaaS 产品的功能介绍页。
页面结构：
1. 顶部导航栏
2. Hero 区域
3. 三个功能卡片
4. 一个价格卡片区
5. FAQ 区域

技术要求：
1. 使用 React + TypeScript
2. 使用 Tailwind CSS
3. 组件拆分为 Navbar、Hero、FeatureCard、Pricing、FAQ
4. 页面风格简洁，适合技术产品
5. 代码要可以直接运行`,
  },
  {
    id: "prompt-2",
    category: "edit",
    label: "页面修改",
    title: "样式增强而不改业务逻辑",
    text: `请修改下面的 React 页面。

修改目标：
1. 让卡片之间的间距更大
2. 让主标题更醒目
3. 按钮增加 hover 效果
4. 移动端下卡片改成单列布局

请只修改样式相关代码，不要改变业务逻辑。`,
  },
  {
    id: "prompt-3",
    category: "breakdown",
    label: "组件拆分",
    title: "后台页面拆组件",
    text: `请帮我分析这个页面应该拆成哪些 React 组件。

请按照以下格式输出：
1. 组件名称
2. 组件职责
3. 接收的 props
4. 内部是否需要 state
5. 可以复用的地方

页面描述：
这是一个后台管理页面，包含用户列表、搜索框、筛选条件、分页、详情抽屉和编辑弹窗。`,
  },
  {
    id: "prompt-4",
    category: "api",
    label: "接口对接",
    title: "静态页改接口版",
    text: `请帮我把这个静态 React 页面改造成可以调用后端接口的版本。

接口信息：
GET /api/users

返回数据：
{
  "list": [
    { "id": 1, "name": "张三", "role": "admin", "status": "active" }
  ]
}

要求：
1. 页面加载时请求接口
2. 增加 loading 状态
3. 请求失败时显示错误提示
4. 空数据时显示空状态
5. 不要引入复杂状态管理库`,
  },
  {
    id: "prompt-5",
    category: "generation",
    label: "页面生成",
    title: "后台管理页描述模板",
    text: "请帮我写一个 React 管理后台页面，顶部是 Navbar，左侧是 Sidebar，中间是用户列表 Table，右侧点击详情后打开 Drawer，表格每一行有编辑按钮，空数据时显示 Empty State，加载时显示 Loading。",
  },
  {
    id: "prompt-6",
    category: "generation",
    label: "页面生成",
    title: "登录页生成",
    text: "请生成一个技术产品的登录页，包含标题、说明、副操作入口、邮箱输入框、密码输入框、错误提示区和主按钮。移动端下表单宽度改为单列，按钮占满宽度。",
  },
  {
    id: "prompt-7",
    category: "edit",
    label: "页面修改",
    title: "响应式修正",
    text: `请检查下面页面的移动端布局问题。
要求：
1. 避免横向滚动
2. 把多列卡片改成单列或双列
3. 缩短过长标题
4. 增加移动端按钮点击区域
5. 保持桌面布局不受影响`,
  },
  {
    id: "prompt-8",
    category: "breakdown",
    label: "组件拆分",
    title: "内容页拆模块",
    text: "请分析一个文章详情页应该拆成哪些前端组件，至少包含 Breadcrumb、ArticleHeader、MetaRow、TableOfContents、CodeBlock、PromptCard、RelatedArticles。",
  },
  {
    id: "prompt-9",
    category: "api",
    label: "接口对接",
    title: "搜索 + 筛选接接口",
    text: `请把这个静态列表页改造成可搜索、可筛选的版本。
接口：
GET /api/articles?q=&category=
要求：
1. 输入框 change 时更新查询参数
2. 点击筛选标签时刷新列表
3. 请求期间显示 loading skeleton
4. 结果为空时显示 Empty State`,
  },
  {
    id: "prompt-10",
    category: "generation",
    label: "页面生成",
    title: "代码对比卡片",
    text: "请生成一个教学页面中的代码对比卡片，左侧展示 Markdown，右侧展示 HTML，两个代码块样式统一，标题清晰，并适合技术博客阅读。",
  },
  {
    id: "prompt-11",
    category: "edit",
    label: "页面修改",
    title: "改文案，不改结构",
    text: "请优化下面页面的文案表达，让它更适合后端工程师阅读。不要修改 HTML 结构，只重写标题、说明、按钮文本和状态文案。",
  },
  {
    id: "prompt-12",
    category: "api",
    label: "接口对接",
    title: "表单提交版",
    text: `请把这个静态表单页改造成提交接口版本。
接口：
POST /api/projects
要求：
1. 点击提交时发送请求
2. 提交中禁用按钮并显示 loading
3. 成功后显示 toast
4. 失败后展示错误信息
5. 校验缺失字段后再允许提交`,
  },
];

export function PromptsPage() {
  return (
    <PageFrame title="Prompt Library · 后端同学的前端战术手册">
      <>
        <header className="site-header">
          <div className="container site-header-inner">
            <a className="brand-mark" href={withBase("index.html")}><span>新前端中心</span><span className="brand-pill">手册</span></a>
            <SiteNav />
            <StepNav prev={{ href: "lesson-layout.html", title: "布局" }} />
          </div>
        </header>
        <main className="container">
          <section className="page-hero">
            <h1 className="page-title">提示词库：把需求讲到 AI 真能执行。</h1>
            <p className="lede">按页面生成、页面修改、组件拆分、接口对接四类任务组织。搜索词可以直接搜 “table”、“drawer”、“登录页”、“loading”。</p>
          </section>
          <section className="section">
            <PromptLibrary prompts={prompts} filterLabels={filters} />
          </section>
        </main>
      </>
    </PageFrame>
  );
}
