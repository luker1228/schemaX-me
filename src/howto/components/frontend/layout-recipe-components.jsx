import React from "react";
import { createRoot } from "react-dom/client";
import { Avatar, Button, Card, ConfigProvider, Input, Layout, List, Menu, Space, Tag, Typography } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  FileTextOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
  ReadOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

function DashboardLayoutPreview() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ef7627",
          borderRadius: 0,
          fontFamily:
            'Instrument Sans, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      }}
    >
      <div style={{ minHeight: 320 }}>
        <Layout style={{ minHeight: 320, borderRadius: 0, overflow: "hidden", border: "1.5px solid #1a1a1a", background: "#fff" }}>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 20px",
              background: "#fff",
              borderBottom: "1.5px solid #1a1a1a",
            }}
          >
            <div style={{ fontWeight: 800, letterSpacing: "0.04em", color: "#ef7627", whiteSpace: "nowrap" }}>Acme Admin</div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["dashboard"]}
              style={{ flex: 1, minWidth: 0, borderBottom: "none", background: "transparent" }}
              items={[
                { key: "dashboard", icon: <DashboardOutlined />, label: "控制台" },
                { key: "users", icon: <TeamOutlined />, label: "用户" },
                { key: "docs", icon: <FileTextOutlined />, label: "文档" },
              ]}
            />
            <Input prefix={<SearchOutlined />} placeholder="搜索" style={{ width: 160 }} />
            <Button type="primary">登录</Button>
          </Header>
          <Layout>
            <Sider width={220} style={{ background: "#fbfaf6", borderRight: "1.5px solid #1a1a1a" }}>
              <div style={{ padding: "18px 16px 10px", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#666" }}>
                导航
              </div>
              <Menu
                mode="inline"
                defaultSelectedKeys={["overview"]}
                style={{ borderRight: "none", background: "transparent" }}
                items={[
                  { key: "overview", icon: <DashboardOutlined />, label: "概览" },
                  { key: "users", icon: <TeamOutlined />, label: "用户管理" },
                  { key: "settings", icon: <SettingOutlined />, label: "系统设置" },
                ]}
              />
            </Sider>
            <Content style={{ padding: 18, background: "linear-gradient(180deg, #fffdf8, #f7f4ec)" }}>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Card size="small" title="本周概览" extra={<Tag color="orange">24h</Tag>}>
                  <Space size={12} wrap>
                    <Tag color="green">活跃用户 128</Tag>
                    <Tag color="blue">待处理 12</Tag>
                    <Tag color="gold">告警 3</Tag>
                  </Space>
                </Card>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                  <Card size="small" title="最近订单">
                    <div style={{ color: "#666", lineHeight: 1.8 }}>订单列表 / 状态 / 金额</div>
                  </Card>
                  <Card size="small" title="系统消息">
                    <div style={{ color: "#666", lineHeight: 1.8 }}>部署完成 / 定时任务 / 异常提醒</div>
                  </Card>
                </div>
              </Space>
            </Content>
          </Layout>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

function PortalLayoutPreview() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ef7627",
          borderRadius: 0,
          fontFamily:
            'Instrument Sans, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      }}
    >
      <div style={{ minHeight: 320 }}>
        <Layout style={{ minHeight: 320, borderRadius: 0, overflow: "hidden", border: "1.5px solid #1a1a1a", background: "#fff" }}>
          <Header style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 20px", background: "#fff", borderBottom: "1.5px solid #1a1a1a" }}>
            <div style={{ fontWeight: 800, letterSpacing: "0.04em", color: "#ef7627", whiteSpace: "nowrap" }}>Acme Portal</div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["home"]}
              style={{ flex: 1, minWidth: 0, borderBottom: "none", background: "transparent" }}
              items={[
                { key: "home", icon: <AppstoreOutlined />, label: "首页" },
                { key: "product", icon: <ReadOutlined />, label: "产品" },
                { key: "about", icon: <FileTextOutlined />, label: "关于" },
              ]}
            />
            <Button>登录</Button>
          </Header>
          <Content style={{ padding: 18, background: "linear-gradient(180deg, #fffdf8, #f7f4ec)" }}>
            <Space direction="vertical" size={14} style={{ width: "100%" }}>
              <Card
                size="small"
                style={{ background: "linear-gradient(135deg, #fff7eb, #fef3e6)" }}
                bodyStyle={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}
              >
                <div>
                  <Title level={4} style={{ margin: 0 }}>把首页入口、宣传语和内容区分开</Title>
                  <Paragraph style={{ margin: "6px 0 0", color: "#666" }}>header / nav / banner / main / footer 是最常见的官网骨架。</Paragraph>
                </div>
                <Button type="primary">立即开始</Button>
              </Card>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                <Card size="small" title="功能入口">
                  <Space direction="vertical" size={6}>
                    <Text>产品介绍</Text>
                    <Text>价格方案</Text>
                    <Text>使用文档</Text>
                  </Space>
                </Card>
                <Card size="small" title="最新动态">
                  <Space direction="vertical" size={8}>
                    <Tag color="green">新版本发布</Tag>
                    <Tag color="blue">活动上线</Tag>
                  </Space>
                </Card>
                <Card size="small" title="联系支持">
                  <Space direction="vertical" size={6}>
                    <Text>邮箱 support@example.com</Text>
                    <Text>工作时间 9:00-18:00</Text>
                  </Space>
                </Card>
              </div>
            </Space>
          </Content>
          <div style={{ padding: "14px 20px", borderTop: "1.5px solid #1a1a1a", background: "#fff", fontSize: 13, color: "#666" }}>
            版权 / 联系方式 / 备案信息
          </div>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

function BlogLayoutPreview() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ef7627",
          borderRadius: 0,
          fontFamily:
            'Instrument Sans, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        },
      }}
    >
      <div style={{ minHeight: 320 }}>
        <Layout style={{ minHeight: 320, borderRadius: 0, overflow: "hidden", border: "1.5px solid #1a1a1a", background: "#fff" }}>
          <Header style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 20px", background: "#fff", borderBottom: "1.5px solid #1a1a1a" }}>
            <div style={{ fontWeight: 800, letterSpacing: "0.04em", color: "#ef7627", whiteSpace: "nowrap" }}>How to Frontend</div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["posts"]}
              style={{ flex: 1, minWidth: 0, borderBottom: "none", background: "transparent" }}
              items={[
                { key: "posts", icon: <ReadOutlined />, label: "文章" },
                { key: "notes", icon: <FileTextOutlined />, label: "笔记" },
                { key: "about", icon: <AppstoreOutlined />, label: "关于" },
              ]}
            />
            <Input prefix={<SearchOutlined />} placeholder="搜索文章" style={{ width: 160 }} />
          </Header>
          <Layout>
            <Content style={{ padding: 18, background: "linear-gradient(180deg, #fffdf8, #f7f4ec)" }}>
              <Card size="small" style={{ marginBottom: 12 }}>
                <Title level={4} style={{ margin: 0 }}>文章标题：如何把布局说清楚</Title>
                <Paragraph style={{ margin: "8px 0 0", color: "#666" }}>
                  Article 区域负责正文，下面按段落、代码块和评论区组织内容。
                </Paragraph>
              </Card>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Card size="small" title="正文">
                  <Paragraph style={{ marginBottom: 0 }}>
                    这里是文章主体内容，应该占据视觉中心，围绕标题、段落、列表和代码块展开。
                  </Paragraph>
                </Card>
                <Card size="small" title="评论区">
                  <Space align="center" size={8}>
                    <Avatar style={{ backgroundColor: "#ef7627" }}>L</Avatar>
                    <Text>读者在这里留言和互动</Text>
                  </Space>
                </Card>
              </Space>
            </Content>
            <Sider width={240} style={{ background: "#fbfaf6", borderLeft: "1.5px solid #1a1a1a" }}>
              <div style={{ padding: 18, display: "grid", gap: 12 }}>
                <Card size="small" title="作者信息">
                  <Space align="center" size={12}>
                    <Avatar style={{ backgroundColor: "#ef7627" }}>A</Avatar>
                    <div>
                      <div style={{ fontWeight: 700 }}>Alex</div>
                      <div style={{ color: "#666" }}>前端工程师</div>
                    </div>
                  </Space>
                </Card>
                <Card size="small" title="目录">
                  <List
                    size="small"
                    dataSource={["布局是什么", "官网骨架", "后台骨架", "文章页骨架"]}
                    renderItem={(item) => <List.Item style={{ paddingInline: 0 }}>{item}</List.Item>}
                  />
                </Card>
                <Card size="small" title="相关文章">
                  <Space direction="vertical" size={8}>
                    <Tag color="blue">CSS 布局基础</Tag>
                    <Tag color="green">Flex 和 Grid</Tag>
                  </Space>
                </Card>
              </div>
            </Sider>
          </Layout>
          <div style={{ padding: "14px 20px", borderTop: "1.5px solid #1a1a1a", background: "#fff", fontSize: 13, color: "#666" }}>
            版权 / 备案 / 关于
          </div>
        </Layout>
      </div>
    </ConfigProvider>
  );
}

function mountDashboardPreview(target) {
  if (!target || target.dataset.layoutRecipeMounted === "true") return;
  target.dataset.layoutRecipeMounted = "true";
  createRoot(target).render(<DashboardLayoutPreview />);
}

function mountPortalPreview(target) {
  if (!target || target.dataset.layoutRecipeMounted === "true") return;
  target.dataset.layoutRecipeMounted = "true";
  createRoot(target).render(<PortalLayoutPreview />);
}

function mountBlogPreview(target) {
  if (!target || target.dataset.layoutRecipeMounted === "true") return;
  target.dataset.layoutRecipeMounted = "true";
  createRoot(target).render(<BlogLayoutPreview />);
}

export function mountLayoutRecipePreviews(root = document) {
  root.querySelectorAll("[data-layout-recipe-preview='dashboard']").forEach((target) => {
    mountDashboardPreview(target);
  });
  root.querySelectorAll("[data-layout-recipe-preview='portal']").forEach((target) => {
    mountPortalPreview(target);
  });
  root.querySelectorAll("[data-layout-recipe-preview='blog']").forEach((target) => {
    mountBlogPreview(target);
  });
}
