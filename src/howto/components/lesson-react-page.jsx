import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Layout, Menu, Button, Input, Select, Tabs, Table, Modal, Drawer, Pagination, Space, Tag, Avatar, Card, Form, Checkbox, Radio, Switch, Dropdown, Empty, message } from "antd";
import { UserOutlined, ShoppingCartOutlined, SearchOutlined, DashboardOutlined, TeamOutlined, SettingOutlined } from "@ant-design/icons";
import { CopyButton, SiteNav, StepNav, withBase } from "./site-components.jsx";

const { Header, Sider, Content } = Layout;

const tocItems = [
  { id: "atlas-why", label: "这章讲什么" },
  { id: "atlas-hero", label: "首屏 Hero" },
  { id: "atlas-navbar", label: "导航栏 Navbar" },
  { id: "atlas-sidebar-comp", label: "侧边栏 Sidebar" },
  { id: "atlas-card", label: "卡片 Card" },
  { id: "atlas-button", label: "按钮 Button" },
  { id: "atlas-cta", label: "CTA" },
  { id: "atlas-input", label: "输入框 Input" },
  { id: "atlas-textarea", label: "多行输入框 Textarea" },
  { id: "atlas-form", label: "表单 Form" },
  { id: "atlas-checkbox", label: "复选框 Checkbox" },
  { id: "atlas-radio", label: "单选框 Radio" },
  { id: "atlas-switch", label: "开关 Switch" },
  { id: "atlas-select", label: "选择器 Select" },
  { id: "atlas-dropdown", label: "下拉菜单 Dropdown" },
  { id: "atlas-tabs", label: "标签页 Tabs" },
  { id: "atlas-table", label: "表格 Table" },
  { id: "atlas-empty", label: "空状态 Empty State" },
  { id: "atlas-modal", label: "弹窗 Modal" },
  { id: "atlas-drawer", label: "抽屉 Drawer" },
  { id: "atlas-pagination", label: "分页 Pagination" },
  { id: "atlas-toast", label: "轻提示 Toast" },
  { id: "atlas-writing", label: "提示词怎么写" },
];

function PreviewTabs({ prompt, children }) {
  const [view, setView] = useState("preview");

  return (
    <div className="atlas-stack">
      <div className="atlas-switch" role="tablist" aria-label="组件查看方式">
        <button className={`atlas-switch-btn${view === "preview" ? " is-active" : ""}`} type="button" onClick={() => setView("preview")}>
          预览
        </button>
        <button className={`atlas-switch-btn${view === "prompt" ? " is-active" : ""}`} type="button" onClick={() => setView("prompt")}>
          提示词
        </button>
      </div>
      <div className={`atlas-view${view === "preview" ? " is-active" : ""}`}>{children}</div>
      <div className={`atlas-view${view === "prompt" ? " is-active" : ""}`}>
        <div className="atlas-prompt">
          <CopyButton text={prompt} className="atlas-copy-button" />
          <div className="atlas-prompt-text">{prompt}</div>
        </div>
      </div>
    </div>
  );
}

function ComponentSection({ id, category, name, what, terms, uses, prompt, children }) {
  return (
    <section className="lesson-section atlas-item" id={id}>
      <span className="micro-label">{category}</span>
      <PreviewTabs prompt={prompt}>{children}</PreviewTabs>
      <h3 className="atlas-name">{name}</h3>
      <p className="atlas-copy">这是啥？ {what}</p>
      <p className="atlas-copy">前端术语： {terms}</p>
      <p className="atlas-copy">常用来干嘛： {uses}</p>
    </section>
  );
}

function NavbarPreview() {
  return (
    <div className="atlas-demo">
      <div className="atlas-surface">
        <Layout style={{ minHeight: 64, borderRadius: 12, overflow: "hidden" }}>
          <Header style={{ display: "flex", alignItems: "center", gap: 24, padding: "0 24px", background: "#fff", borderBottom: "1px solid #eee" }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#ef7627" }}>Acme Admin</div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["dashboard"]}
              style={{ flex: 1, minWidth: 0, borderBottom: "none", background: "transparent" }}
              items={[
                { key: "dashboard", icon: <DashboardOutlined />, label: "控制台" },
                { key: "users", icon: <UserOutlined />, label: "用户" },
                { key: "orders", icon: <ShoppingCartOutlined />, label: "订单" },
              ]}
            />
            <Input prefix={<SearchOutlined />} placeholder="搜索..." style={{ width: 180 }} />
            <Button type="primary">登录</Button>
          </Header>
        </Layout>
      </div>
    </div>
  );
}

function HeroPreview() {
  return (
    <div className="atlas-demo">
      <div
        className="atlas-surface"
        style={{
          padding: 0,
          overflow: "hidden",
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "#fff",
        }}
      >
        <div style={{ padding: "28px 28px 32px", display: "grid", gap: 16 }}>
          <Tag color="orange" style={{ width: "fit-content", margin: 0 }}>Landing Hero</Tag>
          <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
            <h4 style={{ margin: 0, fontSize: 30, lineHeight: 1.15, color: "#fff" }}>
              把数据后台的操作路径，整理成一块能立即理解的首屏。
            </h4>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.74)", lineHeight: 1.7 }}>
              Hero 通常由 headline、supporting copy、primary CTA 和辅助信息组成。用户一进页面，先看这里。
            </p>
          </div>
          <Space wrap>
            <Button type="primary" size="large">开始试用</Button>
            <Button size="large">查看 Demo</Button>
          </Space>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", color: "rgba(255,255,255,0.64)", fontSize: 12 }}>
            <span>headline</span>
            <span>supporting copy</span>
            <span>primary CTA</span>
            <span>social proof</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarPreview() {
  return (
    <div className="atlas-demo">
      <div className="atlas-surface">
        <Layout style={{ minHeight: 280, borderRadius: 12, overflow: "hidden", background: "#fff" }}>
          <Sider width={200} style={{ background: "#fff", borderRight: "1px solid #eee" }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["overview"]}
              style={{ borderRight: "none", paddingTop: 12 }}
              items={[
                { key: "overview", icon: <DashboardOutlined />, label: "概览" },
                { key: "users", icon: <TeamOutlined />, label: "用户管理" },
                { key: "orders", icon: <ShoppingCartOutlined />, label: "订单管理" },
                { key: "settings", icon: <SettingOutlined />, label: "系统设置" },
              ]}
            />
          </Sider>
          <Content style={{ padding: 24, color: "#999", background: "#fafafa" }}>主内容区</Content>
        </Layout>
      </div>
    </div>
  );
}

function CardPreview() {
  return (
    <div className="atlas-demo">
      <Card
        style={{ maxWidth: 360, width: "100%" }}
        title="专业版套餐"
        extra={<Tag color="orange">推荐</Tag>}
      >
        <div style={{ display: "grid", gap: 12 }}>
          <p style={{ margin: 0, color: "#666" }}>适合需要多人协作和权限管理的团队。</p>
          <div style={{ fontSize: 28, fontWeight: 700 }}>¥199<span style={{ fontSize: 14, fontWeight: 400, color: "#777" }}>/月</span></div>
          <Button type="primary">立即开通</Button>
        </div>
      </Card>
    </div>
  );
}

function ButtonPreview() {
  const [message, setMessage] = useState("点击一个按钮试试。");
  const messages = useMemo(
    () => ({
      save: "你点击了主按钮，通常会触发提交或保存。",
      cancel: "你点击了次按钮，通常会回退当前操作。",
      delete: "你点击了危险按钮，通常要再弹一次确认。",
    }),
    []
  );

  return (
    <div className="atlas-demo">
      <Space wrap>
        <Button type="primary" onClick={() => setMessage(messages.save)}>保存</Button>
        <Button onClick={() => setMessage(messages.cancel)}>取消</Button>
        <Button danger onClick={() => setMessage(messages.delete)}>删除</Button>
      </Space>
      <p className="atlas-feedback">{message}</p>
    </div>
  );
}

function CtaPreview() {
  return (
    <div className="atlas-demo">
      <div
        className="atlas-surface"
        style={{
          display: "grid",
          gap: 16,
          background: "#fff7ed",
          borderColor: "#fdba74",
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <h4 style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>把试用用户转成正式开通</h4>
          <p style={{ margin: 0, color: "#7c5a42", lineHeight: 1.7 }}>
            CTA 是 call to action，核心是明确告诉用户下一步做什么。
          </p>
        </div>
        <Space wrap>
          <Button type="primary">立即开通</Button>
          <Button>联系销售</Button>
        </Space>
      </div>
    </div>
  );
}

function InputPreview() {
  const [value, setValue] = useState("zhangsan@example.com");

  return (
    <div className="atlas-demo">
      <div style={{ maxWidth: 320 }}>
        <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "#666" }}>用户名</label>
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <p className="atlas-feedback">当前输入：<span>{value || "(空)"}</span></p>
      </div>
    </div>
  );
}

function TextareaPreview() {
  const [value, setValue] = useState("请把首页 hero 改成双列布局，左边文案，右边插画，下方保留主 CTA。");

  return (
    <div className="atlas-demo">
      <div style={{ maxWidth: 520, width: "100%" }}>
        <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "#666" }}>需求描述</label>
        <Input.TextArea rows={5} value={value} onChange={(e) => setValue(e.target.value)} placeholder="输入多行文案或说明" />
        <p className="atlas-feedback">适合放较长内容、备注、评论、Prompt 草稿。</p>
      </div>
    </div>
  );
}

function FormPreview() {
  const [form] = Form.useForm();

  return (
    <div className="atlas-demo">
      <div className="atlas-surface" style={{ maxWidth: 460, width: "100%" }}>
        <Form form={form} layout="vertical" initialValues={{ name: "张三", role: "admin" }}>
          <Form.Item label="姓名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Select
              options={[
                { value: "admin", label: "管理员" },
                { value: "editor", label: "编辑" },
                { value: "guest", label: "访客" },
              ]}
            />
          </Form.Item>
          <Space>
            <Button type="primary">保存表单</Button>
            <Button>重置</Button>
          </Space>
        </Form>
      </div>
    </div>
  );
}

function CheckboxPreview() {
  const [value, setValue] = useState(["email"]);

  return (
    <div className="atlas-demo">
      <div className="atlas-surface" style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ marginBottom: 12, fontWeight: 600 }}>通知方式</div>
        <Checkbox.Group
          value={value}
          onChange={setValue}
          options={[
            { label: "邮件通知", value: "email" },
            { label: "短信通知", value: "sms" },
            { label: "站内消息", value: "site" },
          ]}
        />
        <p className="atlas-feedback">已选：<span>{value.join(" / ") || "(空)"}</span></p>
      </div>
    </div>
  );
}

function RadioPreview() {
  const [value, setValue] = useState("public");

  return (
    <div className="atlas-demo">
      <div className="atlas-surface" style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ marginBottom: 12, fontWeight: 600 }}>可见范围</div>
        <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
          <Space direction="vertical">
            <Radio value="public">公开</Radio>
            <Radio value="team">仅团队可见</Radio>
            <Radio value="private">仅自己可见</Radio>
          </Space>
        </Radio.Group>
        <p className="atlas-feedback">当前选择：<span>{value}</span></p>
      </div>
    </div>
  );
}

function SwitchPreview() {
  const [checked, setChecked] = useState(true);

  return (
    <div className="atlas-demo">
      <div className="atlas-surface" style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>允许公开访问</div>
            <div style={{ color: "#666", fontSize: 13 }}>关闭后，未登录用户将无法查看此页面。</div>
          </div>
          <Switch checked={checked} onChange={setChecked} />
        </div>
        <p className="atlas-feedback">当前状态：<span>{checked ? "开启" : "关闭"}</span></p>
      </div>
    </div>
  );
}

function SelectPreview() {
  const [value, setValue] = useState("all");

  return (
    <div className="atlas-demo">
      <div style={{ width: 200 }}>
        <Select
          value={value}
          onChange={setValue}
          style={{ width: "100%" }}
          options={[
            { value: "all", label: "全部角色" },
            { value: "admin", label: "管理员" },
            { value: "user", label: "普通用户" },
            { value: "guest", label: "访客" },
          ]}
        />
        <p className="atlas-feedback">当前选择：<span>{value}</span></p>
      </div>
    </div>
  );
}

function DropdownPreview() {
  return (
    <div className="atlas-demo">
      <Space>
        <Dropdown
          menu={{
            items: [
              { key: "edit", label: "编辑" },
              { key: "duplicate", label: "复制" },
              { key: "archive", label: "归档" },
            ],
          }}
        >
          <Button>更多操作</Button>
        </Dropdown>
        <p className="atlas-feedback" style={{ margin: 0 }}>点按钮后弹出一组补充操作。</p>
      </Space>
    </div>
  );
}

function TabsPreview() {
  const [value, setValue] = useState("all");

  return (
    <div className="atlas-demo">
      <Tabs
        activeKey={value}
        onChange={setValue}
        items={[
          { key: "all", label: "全部" },
          { key: "published", label: "已发布" },
          { key: "draft", label: "草稿" },
        ]}
      />
      <p className="atlas-feedback">当前面板：<span>{value}</span></p>
    </div>
  );
}

function TablePreview() {
  const columns = [
    { title: "姓名", dataIndex: "name", key: "name", render: (t, r) => <Space><Avatar size="small" style={{ backgroundColor: "#ef7627" }}>{t[0]}</Avatar>{t}</Space> },
    { title: "角色", dataIndex: "role", key: "role", render: (r) => <Tag color={r === "管理员" ? "orange" : "default"}>{r}</Tag> },
    { title: "状态", dataIndex: "status", key: "status", render: (s) => <Tag color={s === "启用" ? "green" : "red"}>{s}</Tag> },
    { title: "操作", key: "action", render: () => <a>查看</a> },
  ];
  const data = [
    { key: "1", name: "张三", role: "管理员", status: "启用" },
    { key: "2", name: "李四", role: "访客", status: "禁用" },
    { key: "3", name: "王五", role: "普通用户", status: "启用" },
  ];

  return (
    <div className="atlas-demo">
      <Table columns={columns} dataSource={data} pagination={false} size="middle" />
    </div>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="atlas-demo">
      <Button type="primary" onClick={() => setOpen(true)}>打开确认框</Button>
      <Modal
        open={open}
        title="确认删除？"
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        okText="确认"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <p>删除后不可恢复。</p>
      </Modal>
    </div>
  );
}

function DrawerPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="atlas-demo">
      <Button type="primary" onClick={() => setOpen(true)}>打开详情</Button>
      <Drawer
        title="用户详情"
        open={open}
        onClose={() => setOpen(false)}
        width={360}
        extra={<Button onClick={() => setOpen(false)}>关闭</Button>}
      >
        <p style={{ color: "#666", marginBottom: 12 }}>手机号、角色、最后登录时间</p>
        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ height: 12, background: "#eee", borderRadius: 6 }} />
          <div style={{ height: 12, background: "#eee", borderRadius: 6, width: "70%" }} />
        </div>
      </Drawer>
    </div>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(1);

  return (
    <div className="atlas-demo">
      <Pagination current={page} pageSize={5} total={30} onChange={setPage} />
      <p className="atlas-feedback">当前页：<span>{page}</span></p>
    </div>
  );
}

function EmptyPreview() {
  return (
    <div className="atlas-demo">
      <div className="atlas-surface" style={{ width: "100%" }}>
        <Empty
          description="当前还没有筛选结果"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        >
          <Button type="primary">清空筛选</Button>
        </Empty>
      </div>
    </div>
  );
}

function ToastPreview() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className="atlas-demo">
      {contextHolder}
      <Space>
        <Button type="primary" onClick={() => messageApi.success("保存成功")}>成功提示</Button>
        <Button onClick={() => messageApi.warning("网络有点慢，正在重试")}>警告提示</Button>
      </Space>
      <p className="atlas-feedback">Toast / Message 是短暂浮现的轻提示，不会打断页面流程。</p>
    </div>
  );
}

function Toc({ activeId }) {
  const [open, setOpen] = useState(true);

  return (
    <aside className={`lesson-aside lesson-floating-toc${open ? "" : " is-collapsed"}`}>
      <button type="button" className="toc-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        目录
      </button>
      <div className="toc-body">
        <span className="micro-label">章节目录</span>
        <ul className="toc-list">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={activeId === item.id ? "is-active" : ""}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function LessonReactApp() {
  const [activeId, setActiveId] = useState(tocItems[0].id);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".lesson-prose .lesson-section[id]"));
    if (!sections.length) return undefined;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId = tocItems[0].id;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActiveId(bestId);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0, 0.1, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ef7627",
          borderRadius: 8,
          fontFamily: "inherit",
        },
      }}
    >
      <>
        <header className="site-header">
          <div className="lesson-shell site-header-inner">
            <a className="brand-mark" href={withBase("index.html")}><span>新前端中心</span><span className="brand-pill">手册</span></a>
            <SiteNav currentPath="lesson-react.html" />
            <StepNav prev={{ href: "lesson-js.html", title: "JavaScript" }} next={{ href: "lesson-layout.html", title: "布局" }} />
          </div>
        </header>
        <header className="html2-hero html-reading-hero">
          <div className="lesson-shell">
            <div className="html2-hero-meta">
              <span className="html2-pill html2-pill-fill">先认词 · COMPONENTS</span>
              <span className="html2-pill">组件课 · 词汇认知</span>
              <span className="html2-label">阅读时长 ≈ 10 分钟</span>
            </div>
            <div className="html2-hero-grid">
              <div className="html2-hero-copy">
                <h1 className="page-title">
                  <span className="html2-title-line">先认<span className="html2-title-em">组件</span></span>
                  <span className="html2-title-line">再会写提示词</span>
                </h1>
              </div>
              <div className="html2-hero-side">
                <div className="html2-hero-row"><span className="html2-hero-k">本页讲什么</span><span className="html2-hero-v">组件词汇表</span></div>
                <div className="html2-hero-row"><span className="html2-hero-k">内容形式</span><span className="html2-hero-v">真实组件 + 提示词</span></div>
                <div className="html2-hero-row"><span className="html2-hero-k">适合谁</span><span className="html2-hero-v">后端 / 新手 / 非前端</span></div>
                <div className="html2-hero-row"><span className="html2-hero-k">目标</span><span className="html2-hero-v">看到块就知道怎么叫</span></div>
              </div>
            </div>
          </div>
        </header>

        <main className="lesson-shell lesson-main">

          <section className="lesson-layout">
            <article className="lesson-prose">
              <section className="lesson-section" id="atlas-why">
                <h2>这章讲什么</h2>
                <p>这章只做两件事：认识常见组件，学会用正确的前端词写提示词。先看长相，再记名字，写提示词时直接用这些词。</p>
              </section>

              <ComponentSection
                id="atlas-hero"
                category="Marketing"
                name="首屏 Hero"
                what="页面首屏最醒目的那一大块。通常在首页最上方，用来先讲价值，再给动作。"
                terms="hero、headline、CTA。"
                uses="官网首页首屏、活动页开头、产品介绍页、功能发布页。"
                prompt="页面顶部做一个 Hero，左侧是 headline 和 supporting copy，下面放主 CTA“开始试用”和次 CTA“查看 Demo”。"
              >
                <HeroPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-navbar"
                category="Navigation"
                name="顶部栏 Topbar / 导航栏 Navbar"
                what="页面最上面那一条常被叫 Topbar；如果这条顶部区域主要负责导航，也会叫 Navbar。"
                terms="topbar、navbar、nav。"
                uses="放 Logo、一级菜单、搜索、登录入口、头像菜单。"
                prompt="页面顶部放一个 Topbar / Navbar，左侧是 Logo，中间是导航，右侧是搜索和用户头像。"
              >
                <NavbarPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-sidebar-comp"
                category="Navigation"
                name="侧边栏 Sidebar"
                what="侧边栏。通常竖着放在页面左边，用来切换主功能区。"
                terms="sidebar、sider、menu。"
                uses="管理后台导航、工作台入口、系统菜单切换。"
                prompt="左侧放一个 Sidebar，支持当前菜单高亮，适合后台系统。"
              >
                <SidebarPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-card"
                category="Content"
                name="卡片 Card"
                what="卡片。把一组相关内容包成独立信息块，常见于列表、仪表盘、定价页。"
                terms="card、cover、actions。"
                uses="统计卡片、商品卡、套餐卡、文章摘要卡。"
                prompt="列表区用 Card 展示每个套餐，卡片里包含标题、价格、说明和 CTA。"
              >
                <CardPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-button"
                category="Action"
                name="按钮 Button"
                what="按钮。页面里最常见的动作触发器。"
                terms="button、primary、danger。"
                uses="提交表单、保存修改、删除数据、打开弹窗。"
                prompt="右上角放一个主按钮“新建用户”，旁边放次按钮“导出”。"
              >
                <ButtonPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-cta"
                category="Action"
                name="行动按钮 CTA"
                what="CTA 是 call to action，指引用户采取下一步动作的按钮或动作区。"
                terms="CTA、primary CTA、secondary CTA。"
                uses="注册、购买、预约、下载、提交申请、开始试用。"
                prompt="模块底部加一个 CTA 区域，主按钮写“立即开通”，次按钮写“联系销售”。"
              >
                <CtaPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-input"
                category="Input"
                name="输入框 Input"
                what="输入框。用户往里面填文字。"
                terms="input、placeholder、disabled。"
                uses="搜索、录入名称、输入邮箱、填写参数。"
                prompt="顶部放一个搜索输入框，placeholder 是“搜索用户名 / 手机号”。"
              >
                <InputPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-textarea"
                category="Input"
                name="多行输入框 Textarea"
                what="多行输入框。和 Input 不同，它是给较长文字准备的。"
                terms="textarea、rows、maxlength。"
                uses="意见反馈、需求描述、评论内容、工单说明、Prompt 编辑。"
                prompt="表单里放一个 Textarea 作为需求描述输入区，支持 5 行高度，显示 placeholder。"
              >
                <TextareaPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-form"
                category="Input"
                name="表单 Form"
                what="表单。它不是单个控件，而是一整组输入、校验、提交动作的组合。"
                terms="form、field、label。"
                uses="登录、注册、资料编辑、创建记录、设置页。"
                prompt="右侧放一个编辑 Form，包含姓名 Input、角色 Select 和底部保存按钮。"
              >
                <FormPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-checkbox"
                category="Input"
                name="复选框 Checkbox"
                what="复选框。适合多个选项同时成立的场景。"
                terms="checkbox、checked、indeterminate。"
                uses="权限选择、筛选条件、通知设置、批量操作。"
                prompt="表单里放一组 Checkbox，用来配置通知方式，支持多选。"
              >
                <CheckboxPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-radio"
                category="Input"
                name="单选框 Radio"
                what="单选框。一组里只能选一个值。"
                terms="radio、group、checked。"
                uses="状态切换、可见范围选择、支付方式选择。"
                prompt="设置区放一个 Radio Group，让用户在公开、团队可见、私有之间单选。"
              >
                <RadioPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-switch"
                category="Input"
                name="开关 Switch"
                what="开关。通常表示一个状态的开和关。"
                terms="switch、toggle、checked。"
                uses="启用功能、开关配置、是否公开、是否通知。"
                prompt="设置项右侧放一个 Switch，用来控制该功能是否启用。"
              >
                <SwitchPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-select"
                category="Select"
                name="选择器 Select"
                what="选择器。点一下展开选项，再选一个值。"
                terms="select、option、multiple。"
                uses="筛选角色、切换状态、选时间范围、选部门。"
                prompt="表格上方放一个角色 Select，可选“全部 / 管理员 / 普通用户 / 访客”。"
              >
                <SelectPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-dropdown"
                category="Action"
                name="下拉菜单 Dropdown"
                what="下拉菜单。点一个触发点，再弹出一组操作项。"
                terms="dropdown、trigger、menu。"
                uses="更多操作、用户头像菜单、列表行操作、快捷入口。"
                prompt="卡片右上角加一个 Dropdown，包含编辑、复制、归档三个操作。"
              >
                <DropdownPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-tabs"
                category="Navigation"
                name="标签页 Tabs"
                what="标签页。几块内容之间的平级切换。"
                terms="tabs、tab、activeKey。"
                uses="切换分类、切换状态、切换不同内容视图。"
                prompt="列表上方加 Tabs，支持“全部 / 进行中 / 已完成”切换。"
              >
                <TabsPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-table"
                category="Data"
                name="表格 Table"
                what="表格。后台系统里最常见的数据展示方式。"
                terms="table、column、row。"
                uses="用户列表、订单列表、任务列表、日志列表。"
                prompt="主内容区放一个用户 Table，列有姓名、角色、状态、创建时间、操作。"
              >
                <TablePreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-empty"
                category="Feedback"
                name="空状态 Empty State"
                what="空状态。当前没有数据、没有结果、还没开始时显示的占位界面。"
                terms="empty、empty state、description。"
                uses="搜索无结果、列表为空、首次进入还没创建内容。"
                prompt="列表为空时显示 Empty State，包含说明文案和一个“去创建”按钮。"
              >
                <EmptyPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-modal"
                category="Feedback"
                name="弹窗 Modal"
                what="弹窗。内容浮在页面中间，通常要先处理它。"
                terms="modal、mask、footer。"
                uses="删除确认、二次确认、关键设置、补充说明。"
                prompt="点击删除按钮后弹出确认 Modal，包含标题、说明、取消和确认按钮。"
              >
                <ModalPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-drawer"
                category="Overlay"
                name="抽屉 Drawer"
                what="抽屉。从侧边滑出来的一层，常见于右侧。"
                terms="drawer、placement、close。"
                uses="看详情、改资料、补表单，不想跳页面时很常见。"
                prompt="点击表格行后，从右侧打开一个 Drawer 展示用户详情。"
              >
                <DrawerPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-pagination"
                category="Paging"
                name="分页 Pagination"
                what="分页器。数据太多时，用它切到下一页。"
                terms="pagination、current、total。"
                uses="表格翻页、文章列表翻页、搜索结果翻页。"
                prompt="表格底部加 Pagination，显示当前页、总条数和上一页下一页。"
              >
                <PaginationPreview />
              </ComponentSection>

              <ComponentSection
                id="atlas-toast"
                category="Feedback"
                name="轻提示 Toast"
                what="短暂出现又自动消失的轻提示，也常叫 message 或 toast。"
                terms="toast、message、success。"
                uses="保存成功、复制成功、网络警告、操作完成反馈。"
                prompt="点击保存后弹一个 Toast，文案是“保存成功”，2 秒后自动消失。"
              >
                <ToastPreview />
              </ComponentSection>

              <section className="lesson-section" id="atlas-writing">
                <h2>提示词怎么写</h2>
                <div className="callout-card">
                  <strong>错误写法：</strong>
                  <p>搞几个卡片，再来一组选项，没数据的时候给个提示，保存完弹一下。</p>
                </div>
                <div className="callout-card analogy">
                  <strong>更好的写法：</strong>
                  <p>页面顶部做一个 <code>Hero</code>；内容区用 <code>Card</code> 展示套餐；右侧放一个编辑 <code>Form</code>，里面包含 <code>Input</code>、<code>Textarea</code>、<code>Checkbox</code>、<code>Radio</code>、<code>Switch</code>；操作菜单用 <code>Dropdown</code>；列表为空时显示 <code>Empty State</code>；保存成功后弹一个 <code>Toast</code>。</p>
                </div>
                <p>当你能把这些词写出来，AI 生成页面的命中率会高很多，因为你和它说的是前端常用词，而不是模糊描述。</p>
              </section>
            </article>

            <Toc activeId={activeId} />
          </section>
        </main>
      </>
    </ConfigProvider>
  );
}
