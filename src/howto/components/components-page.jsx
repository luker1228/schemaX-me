import React, { useState } from "react";
import { ConfigProvider, Layout, Menu, Button, Input, Select, Tabs, Table, Modal, Drawer, Pagination, Space, Tag, Avatar, Form, Spin, Empty, Badge } from "antd";
import { SearchOutlined, DashboardOutlined, TeamOutlined, SettingOutlined, BellOutlined } from "@ant-design/icons";
import { CopyButton, PageFrame, SiteNav, StepNav, withBase } from "./site-components.jsx";

const { Header, Sider, Content } = Layout;

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button danger onClick={() => setOpen(true)}>点击删除</Button>
      <Modal open={open} title="确认删除？" onCancel={() => setOpen(false)} onOk={() => setOpen(false)} okText="确认" cancelText="取消" okButtonProps={{ danger: true }}>
        <p>删除后不可恢复。</p>
      </Modal>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>查看详情</Button>
      <Drawer title="用户详情" open={open} onClose={() => setOpen(false)} width={360}>
        <p style={{ color: "#666" }}>手机号、角色、最后登录时间</p>
      </Drawer>
    </>
  );
}

const components = [
  {
    id: "component-card",
    label: "Card",
    title: "Card 卡片",
    copy: "像接口返回的一条资源摘要，用来展示对象的核心信息。",
    prompt: "请生成一个用户信息卡片，包含头像、用户名、角色、状态标签和操作按钮。卡片需要有边框、圆角和 hover 效果。",
    render: () => (
      <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16, maxWidth: 320, background: "#fff" }}>
        <Space align="start" size={12}>
          <Avatar size={48} style={{ backgroundColor: "#ef7627" }}>张</Avatar>
          <div>
            <div style={{ fontWeight: 700 }}>张三</div>
            <div style={{ color: "#999", marginBottom: 8 }}>zhangsan@example.com</div>
            <Space size={6}>
              <Tag color="orange">管理员</Tag>
              <Tag color="green">启用</Tag>
            </Space>
          </div>
        </Space>
        <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
          <Button size="small" type="primary">编辑</Button>
          <Button size="small">查看</Button>
        </div>
      </div>
    ),
  },
  {
    id: "component-button",
    label: "Button",
    title: "Button 按钮",
    copy: "像一个可触发动作的 RPC 入口，要区分主按钮、次按钮、危险按钮。",
    prompt: "请生成主按钮和次按钮两种样式，并包含默认、hover、disabled 三个状态。",
    render: () => (
      <Space wrap>
        <Button type="primary">主按钮</Button>
        <Button>次按钮</Button>
        <Button danger>删除</Button>
        <Button type="primary" disabled>禁用</Button>
      </Space>
    ),
  },
  {
    id: "component-form",
    label: "Form",
    title: "Form 表单",
    copy: "像收集请求参数的结构体，负责承载输入、校验和提交。",
    prompt: "请生成一个用户创建表单，包含名称、角色、邮箱和提交按钮，并在校验失败时显示错误信息。",
    render: () => (
      <Form layout="vertical" style={{ maxWidth: 320 }} initialValues={{ role: "user" }}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: "请输入名称" }]}>
          <Input placeholder="请输入名称" />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{ type: "email", message: "邮箱格式不对" }]}>
          <Input placeholder="name@example.com" />
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Select options={[{ value: "admin", label: "管理员" }, { value: "user", label: "普通用户" }]} />
        </Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form>
    ),
  },
  {
    id: "component-input",
    label: "Input",
    title: "Input 输入框",
    copy: "像可编辑字段，常常伴随 placeholder、错误态、帮助文本和焦点态。",
    prompt: "请生成一个带 label、placeholder、错误提示和帮助文案的输入框组件。",
    render: () => (
        <Form layout="vertical" style={{ maxWidth: 320 }}>
          <Form.Item label="用户名" name="username" validateStatus="error" help="用户名已存在，不超过 20 字符">
            <Input placeholder="输入用户名" />
          </Form.Item>
        </Form>
    ),
  },
  {
    id: "component-modal",
    label: "Modal",
    title: "Modal 弹窗",
    copy: "像临时阻断当前流程的确认层，适合删除确认、审批确认、关键设置。",
    prompt: "点击删除按钮后弹出一个确认 Modal，包含标题、说明文案、取消按钮和确认按钮。",
    render: () => <ModalDemo />,
  },
  {
    id: "component-drawer",
    label: "Drawer",
    title: "Drawer 抽屉",
    copy: "像不跳转页面就展开详情接口，适合查看用户详情、配置表单、日志。",
    prompt: "点击表格中的“查看详情”按钮后，从右侧打开一个 Drawer，展示当前用户的详细信息。",
    render: () => <DrawerDemo />,
  },
  {
    id: "component-navbar",
    label: "Navbar",
    title: "Navbar 导航栏",
    copy: "像系统的全局入口，类似 API 网关暴露的一组顶层路径。",
    prompt: "请生成一个顶部导航栏，左侧是 Logo，中间是菜单，右侧是搜索框和登录按钮。",
    render: () => (
      <Layout style={{ minHeight: 64, borderRadius: 12, overflow: "hidden" }}>
        <Header style={{ display: "flex", alignItems: "center", gap: 24, padding: "0 24px", background: "#fff", borderBottom: "1px solid #eee" }}>
          <div style={{ fontWeight: 700, color: "#ef7627" }}>Logo</div>
          <Menu mode="horizontal" defaultSelectedKeys={["home"]} style={{ flex: 1, borderBottom: "none", background: "transparent" }} items={[
            { key: "home", label: "首页" },
            { key: "users", label: "用户" },
            { key: "orders", label: "订单" },
          ]} />
          <Input prefix={<SearchOutlined />} placeholder="搜索" style={{ width: 160 }} />
          <Button type="primary">登录</Button>
        </Header>
      </Layout>
    ),
  },
  {
    id: "component-sidebar",
    label: "Sidebar",
    title: "Sidebar 侧边栏",
    copy: "像后台应用的路由索引，帮助用户在不同模块之间切换。",
    prompt: "请生成一个管理后台左侧 Sidebar，包含分组标题、当前高亮态和折叠态。",
    render: () => (
      <Layout style={{ minHeight: 240, borderRadius: 12, overflow: "hidden", background: "#fff" }}>
        <Sider width={180} style={{ background: "#fff", borderRight: "1px solid #eee" }}>
          <Menu mode="inline" defaultSelectedKeys={["overview"]} style={{ borderRight: "none", paddingTop: 12 }} items={[
            { key: "overview", icon: <DashboardOutlined />, label: "概览" },
            { key: "users", icon: <TeamOutlined />, label: "用户管理" },
            { key: "settings", icon: <SettingOutlined />, label: "系统设置" },
          ]} />
        </Sider>
        <Content style={{ padding: 24, color: "#999", background: "#fafafa" }}>主内容区</Content>
      </Layout>
    ),
  },
  {
    id: "component-table",
    label: "Table",
    title: "Table 表格",
    copy: "像批量资源视图，适合用户、订单、日志、任务等列表数据。",
    prompt: "请生成一个用户列表 Table，包含头像、姓名、角色、状态、创建时间和操作列。",
    render: () => {
      const columns = [
        { title: "姓名", dataIndex: "name", key: "name", render: (t) => <Space><Avatar size="small" style={{ backgroundColor: "#ef7627" }}>{t[0]}</Avatar>{t}</Space> },
        { title: "角色", dataIndex: "role", key: "role", render: (r) => <Tag color={r === "管理员" ? "orange" : "default"}>{r}</Tag> },
        { title: "状态", dataIndex: "status", key: "status", render: (s) => <Tag color={s === "启用" ? "green" : "red"}>{s}</Tag> },
        { title: "操作", key: "action", render: () => <a>查看</a> },
      ];
      const data = [
        { key: "1", name: "张三", role: "管理员", status: "启用" },
        { key: "2", name: "李四", role: "访客", status: "禁用" },
      ];
      return <Table columns={columns} dataSource={data} pagination={false} size="middle" />;
    },
  },
  {
    id: "component-states",
    label: "States",
    title: "Loading / Empty State",
    copy: "它们不是装饰，而是页面状态机的一部分。AI 提示词必须明确这些状态。",
    prompt: "表格加载时显示 Loading，空数据时显示 Empty State，错误时显示错误提示条。",
    render: () => (
      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <div>
          <div style={{ color: "#999", marginBottom: 8 }}>Loading 态：</div>
          <Spin tip="加载中..."><div style={{ height: 60, padding: 20, background: "#fafafa", borderRadius: 8 }} /></Spin>
        </div>
        <div>
          <div style={{ color: "#999", marginBottom: 8 }}>Empty 态：</div>
          <Empty description="暂无数据" />
        </div>
      </Space>
    ),
  },
];

export function ComponentsPage() {
  return (
    <PageFrame title="组件认知页 · 后端同学的前端战术手册">
      <ConfigProvider theme={{ token: { colorPrimary: "#ef7627", borderRadius: 8, fontFamily: "inherit" } }}>
        <header className="site-header">
          <div className="container site-header-inner">
            <a className="brand-mark" href={withBase("index.html")}><span>新前端中心</span><span className="brand-pill">手册</span></a>
            <SiteNav currentPath="components.html" />
            <StepNav prev={{ href: "lesson-react.html", title: "组件：先认词" }} next={{ href: "prompts.html", title: "提示词库" }} />
          </div>
        </header>
        <main className="container">
          <section className="page-hero">
            <h1 className="page-title">先认识组件，再学会和 AI 说前端语言。</h1>
            <p className="lede">这页是给后端同学的组件词汇表，每个组件都直接渲染真实的 Ant Design 组件，你能点、能输、能看状态。</p>
          </section>
          <section className="section">
            <div className="wiki-grid">
              {components.map((item) => (
                <article key={item.id} className="wiki-card">
                  <span className="micro-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <div className="component-live-demo">{item.render && item.render()}</div>
                  <div className="prompt-block" id={item.id}>{item.prompt}</div>
                  <CopyButton text={item.prompt} />
                </article>
              ))}
            </div>
          </section>
        </main>
      </ConfigProvider>
    </PageFrame>
  );
}
