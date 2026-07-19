import React, { useEffect, useMemo, useState } from "react";
import { CopyButton, ManualCourseLayout, ManualLessonHeader } from "./site-components.jsx";
import { getFrontendLegacyLesson } from "../../manuals/frontend/registry.js";
import { Button as RetroButton } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input as RetroInput } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch as RetroSwitch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { RadioGroup as RetroRadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select as RetroSelect, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs as RetroTabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Table as RetroTable, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Pagination as RetroPagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Empty as RetroEmpty, EmptyDescription, EmptyContent, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

const tocItems = [
  { id: "atlas-why", label: "这章讲什么" },
  { id: "atlas-hero", label: "首屏 Hero" },
  { id: "atlas-navbar", label: "导航栏 Navbar" },
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

const componentStepIds = [
  "atlas-hero",
  "atlas-navbar",
  "atlas-card",
  "atlas-button",
  "atlas-cta",
  "atlas-input",
  "atlas-textarea",
  "atlas-form",
  "atlas-checkbox",
  "atlas-radio",
  "atlas-switch",
  "atlas-select",
  "atlas-dropdown",
  "atlas-tabs",
  "atlas-table",
  "atlas-empty",
  "atlas-modal",
  "atlas-drawer",
  "atlas-pagination",
  "atlas-toast",
];

const componentStepMap = new Map(componentStepIds.map((id, index) => [id, `REACT-${String(index + 1).padStart(2, "0")}`]));

function PreviewTabs({ prompt, children, fullWidth = true }) {
  // Prompts are reference material, not the primary reading flow. Keeping them
  // folded lets the live RetroUI specimen remain the visual focus of a section.
  const [promptVisible, setPromptVisible] = useState(false);

  return (
    <div className={`atlas-component-preview${fullWidth ? " atlas-component-preview-full" : ""}`}>
      <div className="atlas-component-live" data-slot="preview">{children}</div>
      <div className="atlas-component-prompt" data-slot="prompt">
        {promptVisible && (
          <div className="atlas-component-prompt-content">
            <CopyButton text={prompt} className="atlas-component-copy-button" />
            <p>{prompt}</p>
          </div>
        )}
        <div className="atlas-component-prompt-actions">
          <ButtonGroup>
            <RetroButton
              className="atlas-component-prompt-toggle"
              variant="outline"
              type="button"
              aria-expanded={promptVisible}
              onClick={() => setPromptVisible((visible) => !visible)}
            >
              {promptVisible ? "收起提示词 ↑" : "查看提示词 ↓"}
            </RetroButton>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

function ComponentSection({ id, category, name, what, terms, uses, prompt, children, previewFullWidth = true }) {
  return (
    <section className="html2-body-section lesson-section atlas-step-section" id={id}>
      <div className="wrap">
        <div className="atlas-step-stack">
          <div className="atlas-component-heading">
            <div className="atlas-component-meta">
              <span className="step-num">{componentStepMap.get(id) || "REACT"}</span>
              <span className="step-label">{category}</span>
            </div>
            <div className="section-head atlas-section-head">
              <div>
                <h2 className="section-title">{name}</h2>
              </div>
            </div>
          </div>
          <PreviewTabs prompt={prompt} fullWidth={previewFullWidth}>{children}</PreviewTabs>

          <div className="atlas-intel-list">
            <div className="html2-inline-note atlas-intel-card">
              <span className="html2-inline-note-tag">这是啥</span>
              <p>{what}</p>
            </div>
            <div className="html2-inline-note atlas-intel-card">
              <span className="html2-inline-note-tag">前端术语</span>
              <p>{terms}</p>
            </div>
            <div className="html2-inline-note atlas-intel-card">
              <span className="html2-inline-note-tag">常见用途</span>
              <p>{uses}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavbarPreview() {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("点击导航、输入关键词，或者试一下登录按钮。");

  return (
    <div className="atlas-demo atlas-demo-full">
      <div className="atlas-navbar-preview">
        <div className="atlas-retroui-navbar">
          <div className="atlas-navbar-brand">Luke UI</div>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem><NavigationMenuTrigger>控制台</NavigationMenuTrigger><NavigationMenuContent><div className="atlas-nav-panel">查看今日概览、待办和系统状态。</div></NavigationMenuContent></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuTrigger>用户</NavigationMenuTrigger><NavigationMenuContent><div className="atlas-nav-panel">用户管理、角色权限和成员设置。</div></NavigationMenuContent></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuTrigger>订单</NavigationMenuTrigger><NavigationMenuContent><div className="atlas-nav-panel">订单列表、状态筛选和售后处理。</div></NavigationMenuContent></NavigationMenuItem>
              <NavigationMenuItem><NavigationMenuLink href="#">文档</NavigationMenuLink></NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <RetroInput placeholder="搜索..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setMessage("搜索关键词：" + (query || "(空)"))} />
          <Avatar aria-label="Luke 的账号"><AvatarFallback>LU</AvatarFallback></Avatar>
          <RetroButton onClick={() => setMessage("点击了登录按钮，通常会打开登录流程。")}>登录</RetroButton>
        </div>
        <p className="atlas-feedback" style={{ marginTop: 12, marginBottom: 0 }}>
          {message}
        </p>
      </div>
    </div>
  );
}

function HeroPreview() {
  const [message, setMessage] = useState("试一下主 CTA 或 Demo 按钮。");

  return (
    <div className="atlas-demo">
      <div
        className="atlas-surface"
        style={{ padding: 0, overflow: "hidden", background: "#ffdc58", color: "#241d13", border: "2px solid #241d13", boxShadow: "5px 5px 0 #241d13" }}
      >
        <div style={{ padding: "28px 28px 32px", display: "grid", gap: 16 }}>
          <Badge style={{ width: "fit-content", margin: 0 }}>Landing Hero</Badge>
          <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
            <h4 style={{ margin: 0, fontSize: 30, lineHeight: 1.15, color: "#241d13" }}>
              把数据后台的操作路径，整理成一块能立即理解的首屏。
            </h4>
            <p style={{ margin: 0, color: "var(--dark-void)", lineHeight: 1.7 }}>
              Hero 通常由 headline、supporting copy、primary CTA 和辅助信息组成。用户一进页面，先看这里。
            </p>
          </div>
          <div className="atlas-button-row">
            <RetroButton size="lg" onClick={() => setMessage("点击了开始试用，通常会进入注册或开通流程。")}>开始试用</RetroButton>
            <RetroButton variant="outline" size="lg" onClick={() => setMessage("点击了查看 Demo，通常会跳到演示页或产品导览。")}>查看 Demo</RetroButton>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", color: "var(--dark-void)", fontSize: 12 }}>
            <span>headline</span>
            <span>supporting copy</span>
            <span>primary CTA</span>
            <span>social proof</span>
          </div>
          <p className="atlas-feedback" style={{ margin: 0 }}>{message}</p>
        </div>
      </div>
    </div>
  );
}

function CardPreview() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="atlas-demo">
      <Card style={{ maxWidth: 360, width: "100%" }}>
        <CardHeader><CardTitle>专业版套餐 <Badge>{saved ? "已加入" : "推荐"}</Badge></CardTitle></CardHeader>
        <CardContent>
        <div style={{ display: "grid", gap: 12 }}>
          <p style={{ margin: 0, color: "var(--text-soft)" }}>适合需要多人协作和权限管理的团队。</p>
          <div style={{ fontSize: 28, fontWeight: 700 }}>¥199<span style={{ fontSize: 14, fontWeight: 400, color: "var(--text-soft)" }}>/月</span></div>
          <RetroButton onClick={() => setSaved((value) => !value)}>{saved ? "已加入清单" : "立即开通"}</RetroButton>
          <p className="atlas-feedback" style={{ margin: 0 }}>{saved ? "这个卡片通常会把套餐加入比较或购买流程。" : "点按钮试试卡片里的主操作。"}</p>
        </div>
        </CardContent>
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
      <ButtonGroup className="atlas-retroui-button-demo">
        <RetroButton onClick={() => setMessage(messages.save)}>保存</RetroButton>
        <RetroButton variant="outline" onClick={() => setMessage(messages.cancel)}>取消</RetroButton>
        <RetroButton variant="destructive" onClick={() => setMessage(messages.delete)}>删除</RetroButton>
      </ButtonGroup>
      <p className="atlas-feedback">{message}</p>
    </div>
  );
}

function CtaPreview() {
  const [message, setMessage] = useState("CTA 的关键是把下一步动作说清楚。");

  return (
    <div className="atlas-demo">
      <div
        className="atlas-surface"
        style={{ display: "grid", gap: 16, background: "#ffdc58", border: "2px solid #241d13", boxShadow: "5px 5px 0 #241d13" }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <h4 style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>把试用用户转成正式开通</h4>
          <p style={{ margin: 0, color: "var(--dark-void)", lineHeight: 1.7 }}>
            CTA 是 call to action，核心是明确告诉用户下一步做什么。
          </p>
        </div>
        <div className="atlas-button-row">
          <RetroButton onClick={() => setMessage("主 CTA 被点击，通常会进入转化主路径。")}>立即开通</RetroButton>
          <RetroButton variant="outline" onClick={() => setMessage("次 CTA 被点击，通常会转到销售咨询或补充说明。")}>联系销售</RetroButton>
        </div>
        <p className="atlas-feedback" style={{ margin: 0 }}>{message}</p>
      </div>
    </div>
  );
}

function InputPreview() {
  const [value, setValue] = useState("zhangsan@example.com");

  return (
    <div className="atlas-demo">
      <div style={{ maxWidth: 320 }}>
        <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-soft)" }}>用户名</label>
        <RetroInput value={value} onChange={(e) => setValue(e.target.value)} />
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
        <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "var(--text-soft)" }}>需求描述</label>
        <Textarea rows={5} value={value} onChange={(e) => setValue(e.target.value)} placeholder="输入多行文案或说明" />
        <p className="atlas-feedback">适合放较长内容、备注、评论、Prompt 草稿。</p>
      </div>
    </div>
  );
}

function FormPreview() {
  const [name, setName] = useState("张三");
  const [role, setRole] = useState("admin");
  const [message, setMessage] = useState("改几个字段，再试试保存或重置。");

  return (
    <div className="atlas-demo">
      <div className="atlas-surface" style={{ maxWidth: 460, width: "100%" }}>
        <form onSubmit={(event) => { event.preventDefault(); setMessage(`已提交：${name} / ${role}`); }}>
          <label className="atlas-field">姓名<RetroInput value={name} onChange={(event) => setName(event.target.value)} /></label>
          <label className="atlas-field">角色
            <RetroSelect value={role} onValueChange={setRole}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="admin">管理员</SelectItem><SelectItem value="editor">编辑</SelectItem><SelectItem value="guest">访客</SelectItem></SelectContent>
            </RetroSelect>
          </label>
          <div className="atlas-inline-row">
            <RetroButton type="submit">保存表单</RetroButton>
            <RetroButton type="button" variant="outline" onClick={() => { setName("张三"); setRole("admin"); setMessage("表单已重置为初始值。"); }}>重置</RetroButton>
          </div>
        </form>
        <p className="atlas-feedback">{message}</p>
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
        <div className="atlas-choice-list">
          {[{ label: "邮件通知", value: "email" }, { label: "短信通知", value: "sms" }, { label: "站内消息", value: "site" }].map((item) => (
            <label key={item.value}><Checkbox checked={value.includes(item.value)} onCheckedChange={(checked) => setValue(checked ? [...value, item.value] : value.filter((entry) => entry !== item.value))} />{item.label}</label>
          ))}
        </div>
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
        <RetroRadioGroup value={value} onValueChange={setValue} className="atlas-choice-list">
          {[['public', '公开'], ['team', '仅团队可见'], ['private', '仅自己可见']].map(([key, label]) => <label key={key}><RadioGroupItem value={key} />{label}</label>)}
        </RetroRadioGroup>
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
            <div style={{ color: "var(--text-soft)", fontSize: 13 }}>关闭后，未登录用户将无法查看此页面。</div>
          </div>
          <RetroSwitch checked={checked} onCheckedChange={setChecked} />
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
        <RetroSelect value={value} onValueChange={setValue}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">全部角色</SelectItem><SelectItem value="admin">管理员</SelectItem><SelectItem value="user">普通用户</SelectItem><SelectItem value="guest">访客</SelectItem></SelectContent></RetroSelect>
        <p className="atlas-feedback">当前选择：<span>{value}</span></p>
      </div>
    </div>
  );
}

function DropdownPreview() {
  const [value, setValue] = useState("点按钮后弹出一组补充操作。");

  return (
    <div className="atlas-demo">
      <div className="atlas-inline-row">
        <DropdownMenu><DropdownMenuTrigger asChild><RetroButton>更多操作</RetroButton></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onSelect={() => setValue("当前操作：编辑")}>编辑</DropdownMenuItem><DropdownMenuItem onSelect={() => setValue("当前操作：复制")}>复制</DropdownMenuItem><DropdownMenuItem onSelect={() => setValue("当前操作：归档")}>归档</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
        <p className="atlas-feedback" style={{ margin: 0 }}>{value}</p>
      </div>
    </div>
  );
}

function TabsPreview() {
  const [value, setValue] = useState("all");

  return (
    <div className="atlas-demo">
      <RetroTabs value={value} onValueChange={setValue}><TabsList><TabsTrigger value="all">全部</TabsTrigger><TabsTrigger value="published">已发布</TabsTrigger><TabsTrigger value="draft">草稿</TabsTrigger></TabsList><TabsContent value={value}>正在查看「{value}」内容。</TabsContent></RetroTabs>
      <p className="atlas-feedback">当前面板：<span>{value}</span></p>
    </div>
  );
}

function TablePreview() {
  const [selected, setSelected] = useState("还没有选择行内操作。");
  const data = [
    { key: "1", name: "张三", role: "管理员", status: "启用" },
    { key: "2", name: "李四", role: "访客", status: "禁用" },
    { key: "3", name: "王五", role: "普通用户", status: "启用" },
  ];

  return (
    <div className="atlas-demo">
      <RetroTable><TableHeader><TableRow><TableHead>姓名</TableHead><TableHead>角色</TableHead><TableHead>状态</TableHead><TableHead>操作</TableHead></TableRow></TableHeader><TableBody>{data.map((row) => <TableRow key={row.key}><TableCell>{row.name}</TableCell><TableCell><Badge>{row.role}</Badge></TableCell><TableCell><Badge variant={row.status === "启用" ? "default" : "outline"}>{row.status}</Badge></TableCell><TableCell><RetroButton variant="link" onClick={() => setSelected(`查看：${row.name}`)}>查看</RetroButton></TableCell></TableRow>)}</TableBody></RetroTable>
      <p className="atlas-feedback">{selected}</p>
    </div>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="atlas-demo">
      <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><RetroButton>打开确认框</RetroButton></DialogTrigger><DialogContent><DialogHeader><DialogTitle>确认删除？</DialogTitle><DialogDescription>删除后不可恢复。</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><RetroButton variant="outline">取消</RetroButton></DialogClose><RetroButton variant="destructive" onClick={() => setOpen(false)}>确认删除</RetroButton></DialogFooter></DialogContent></Dialog>
    </div>
  );
}

function DrawerPreview() {
  const [open, setOpen] = useState(false);

  return (
    <div className="atlas-demo">
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><RetroButton>打开详情</RetroButton></SheetTrigger><SheetContent><SheetHeader><SheetTitle>用户详情</SheetTitle></SheetHeader><p style={{ margin: "0 16px" }}>手机号、角色、最后登录时间</p></SheetContent></Sheet>
    </div>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(1);

  return (
    <div className="atlas-demo">
      <RetroPagination><PaginationContent><PaginationItem><PaginationPrevious href="#atlas-pagination" text="上一页" onClick={(event) => { event.preventDefault(); setPage(Math.max(1, page - 1)); }} /></PaginationItem><PaginationItem><RetroButton variant="outline" aria-current="page">{page}</RetroButton></PaginationItem><PaginationItem><PaginationNext href="#atlas-pagination" text="下一页" onClick={(event) => { event.preventDefault(); setPage(page + 1); }} /></PaginationItem></PaginationContent></RetroPagination>
      <p className="atlas-feedback">当前页：<span>{page}</span></p>
    </div>
  );
}

function EmptyPreview() {
  const [cleared, setCleared] = useState(false);

  return (
    <div className="atlas-demo">
      <div className="atlas-surface" style={{ width: "100%" }}>
        <RetroEmpty><EmptyHeader><EmptyTitle>{cleared ? "筛选已清空" : "当前没有筛选结果"}</EmptyTitle><EmptyDescription>{cleared ? "可以重新查看全部结果。" : "试试更换关键词或清空筛选条件。"}</EmptyDescription></EmptyHeader><EmptyContent><RetroButton onClick={() => setCleared(true)}>清空筛选</RetroButton></EmptyContent></RetroEmpty>
      </div>
    </div>
  );
}

function ToastPreview() {
  return (
    <div className="atlas-demo">
      <div className="atlas-inline-row"><RetroButton onClick={() => toast.success("保存成功", { description: "你的设置已写入草稿。" })}>成功提示</RetroButton><RetroButton variant="outline" onClick={() => toast.warning("网络有点慢", { description: "正在自动重试，请稍候。" })}>警告提示</RetroButton></div>
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

export function LessonReactApp({ currentPath, prev, next }) {
  const lesson = currentPath ? { currentPath, prev, next } : getFrontendLegacyLesson("lesson-react.html");
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
      <>
        <ManualLessonHeader currentPath={lesson.currentPath} />
        <ManualCourseLayout currentPath={lesson.currentPath} prev={lesson.prev} next={lesson.next}>
        <div className="atlas-components-page">
        <header className="lesson-article-hero html-reading-hero atlas-components-hero">
          <div className="lesson-shell">
            <div className="lesson-article-hero-meta">
              <span className="lesson-article-hero-pill lesson-article-hero-pill-fill">先认词 · COMPONENTS</span>
              <span className="lesson-article-hero-pill">组件课 · 词汇认知</span>
              <span className="lesson-article-hero-label">阅读时长 ≈ 10 分钟</span>
            </div>
            <div className="lesson-article-hero-grid">
              <div className="lesson-article-hero-content">
                <h1 className="page-title">
                  <span className="lesson-article-hero-title-line">先认<span className="lesson-article-hero-title-em">组件</span></span>
                  <span className="lesson-article-hero-title-line">再会写提示词</span>
                </h1>
              </div>
              <div className="lesson-article-hero-side">
                <div className="lesson-article-hero-row"><span className="lesson-article-hero-key">本页讲什么</span><span className="lesson-article-hero-value">组件词汇表</span></div>
                <div className="lesson-article-hero-row"><span className="lesson-article-hero-key">内容形式</span><span className="lesson-article-hero-value">真实组件 + 提示词</span></div>
                <div className="lesson-article-hero-row"><span className="lesson-article-hero-key">适合谁</span><span className="lesson-article-hero-value">后端 / 新手 / 非前端</span></div>
                <div className="lesson-article-hero-row"><span className="lesson-article-hero-key">目标</span><span className="lesson-article-hero-value">看到块就知道怎么叫</span></div>
              </div>
            </div>
          </div>
        </header>

        <main className="html-reading-page lesson-main">

          <section className="lesson-layout">
            <article className="lesson-prose">
              <section className="html2-body-section lesson-section atlas-step-section" id="atlas-why">
                <div className="wrap">
                  <div className="step-card">
                    <div className="step-card-head">
                      <span className="step-num">REACT-00</span>
                      <span className="step-label">核心</span>
                    </div>
                    <div className="step-card-body">
                      <div className="section-head atlas-section-head">
                        <div>
                          <h2 className="section-title">这章讲什么</h2>
                        </div>
                      </div>
                      <div className="html2-inline-note">
                        <span className="html2-inline-note-tag">核心</span>
                        <p>这章只做两件事：认识常见组件，学会用正确的前端词写提示词。先看长相，再记名字，写提示词时直接用这些词。</p>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="html2-inline-note">
                  <span className="html2-inline-note-tag">错误写法</span>
                  <p>搞几个卡片，再来一组选项，没数据的时候给个提示，保存完弹一下。</p>
                </div>
                <div className="html2-inline-note">
                  <span className="html2-inline-note-tag">更好的写法</span>
                  <p>页面顶部做一个 <code>Hero</code>；内容区用 <code>Card</code> 展示套餐；右侧放一个编辑 <code>Form</code>，里面包含 <code>Input</code>、<code>Textarea</code>、<code>Checkbox</code>、<code>Radio</code>、<code>Switch</code>；操作菜单用 <code>Dropdown</code>；列表为空时显示 <code>Empty State</code>；保存成功后弹一个 <code>Toast</code>。</p>
                </div>
                <p>当你能把这些词写出来，AI 生成页面的命中率会高很多，因为你和它说的是前端常用词，而不是模糊描述。</p>
              </section>
            </article>

            <Toc activeId={activeId} />
          </section>
        </main>
        <Toaster position="top-right" richColors closeButton />
        </div>
        </ManualCourseLayout>
      </>
  );
}
