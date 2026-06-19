---
---
# Astro Blog Migration Design

## Goal

把当前仓库从 Jekyll 站点改造成基于 Astro 的 GitHub Pages 博客，同时把内容目录整理成长期可维护的正式结构，满足以下目标：

- 继续使用 Markdown 作为主要写作格式
- 最终发布到 GitHub Pages
- 视觉表现比当前 Jekyll 方案更强
- 明确区分可发布文章和草稿
- 为后续 `ai / cs / life / english` 四类内容扩展留出稳定结构

## Scope

本次改造包含：

- 引入 Astro 并替换当前 Jekyll 站点构建链路
- 建立正式内容目录结构
- 迁移现有文章 Markdown 到 Astro 内容集合
- 设计基础页面结构和路由
- 更新 GitHub Pages 构建发布流程

本次改造不包含：

- 重写全部旧文章内容
- 做复杂交互功能，如全文搜索、评论、账号系统
- 迁移 `program/` 下的示例代码为独立可运行应用
- 在一次改造里完成所有视觉细节的极致打磨

## Recommended Approach

采用 `Astro + 内容集合 + GitHub Pages 静态部署`。

原因：

- Astro 天然适合 Markdown 驱动的博客和内容站
- 静态输出直接匹配 GitHub Pages
- 对文章、列表页、分类页、归档页的实现成本低
- 页面表现力、组件化和样式组织明显优于当前 Jekyll 方案
- 相比 Next.js，更轻、更少部署约束，更适合当前“博客优先”的目标

## Alternatives Considered

### 1. Continue with Jekyll

优点：

- 当前仓库已经能工作
- 迁移成本最低

缺点：

- 内容结构和页面能力偏传统
- 后续做更精致的博客设计会越来越别扭
- Markdown 内容、布局组件、样式组织的演进空间有限

结论：不推荐继续投入。

### 2. Next.js Static Export

优点：

- 能力上限高
- 未来可扩展交互能力更强

缺点：

- 对当前纯博客目标偏重
- GitHub Pages 下需要严格静态导出约束
- 架构复杂度高于必要水平

结论：不是当前阶段最优解。

### 3. Astro

优点：

- 内容站场景最匹配
- Markdown 和内容集合支持强
- 静态输出和 GitHub Pages 配合自然
- 足够支持高质量视觉设计

结论：推荐。

## Target Information Architecture

### Content Collections

正式内容采用双集合：

```text
src/content/posts/
src/content/drafts/
```

每个集合下按领域继续细分：

```text
src/content/posts/ai/
src/content/posts/cs/
src/content/posts/life/
src/content/posts/english/

src/content/drafts/ai/
src/content/drafts/cs/
src/content/drafts/life/
src/content/drafts/english/
```

目录职责：

- `posts`：准备发布到博客的正式文章
- `drafts`：草稿、提纲、未完成文章、暂不公开内容

### Domain Rules

- `ai`：AI 基础知识、AI 思考、AI 工具、Agent 系列、AI 实践复盘
- `cs`：通用计算机知识、工程最佳实践、语言/架构/数据库/系统类内容
- `life`：代码之外、方法论、生活感悟、阅读反思
- `english`：英语学习、表达积累、写作或口语相关内容

## Migration Mapping

### Existing Content Mapping

- `articles-draft/ai-基础知识/**` -> `src/content/posts/ai/` 或 `src/content/drafts/ai/`
- `articles-draft/ai-思考/**` -> `src/content/posts/ai/` 或 `src/content/drafts/ai/`
- `articles-draft/ai-tools/**` -> `src/content/posts/ai/` 或 `src/content/drafts/ai/`

### Publish vs Draft Rules

以下文件默认进入 `drafts`：

- `outline.md`
- `draft*.md`
- 明显未完成的提纲或中间稿
- 暂不适合公开的内部版本

以下文件优先进入 `posts`：

- 明确成稿的文章正文
- 已有完整标题、结构、可直接阅读的系列章节

### Non-Content Files

以下内容不进入 Astro 内容集合：

- `program/**`
- `prompts/**`
- `node_modules/**`
- 运行日志、数据库、缓存、临时文件
- 构建产物目录

处理策略：

- 文章引用的图片移入 `public/` 或者文章资源目录
- 示例代码保留在仓库中，但不作为博客文章集合的一部分

## Proposed Project Structure

```text
src/
  components/
  layouts/
  pages/
  content/
    config.ts
    posts/
      ai/
      cs/
      life/
      english/
    drafts/
      ai/
      cs/
      life/
      english/

public/
  images/

.github/workflows/
astro.config.mjs
package.json
```

## Routing Design

推荐路由：

- `/`：首页
- `/ai/`：AI 分类页
- `/cs/`：计算机知识分类页
- `/life/`：代码之外分类页
- `/english/`：英语学习分类页
- `/posts/<slug>/`：文章详情页
- `/archive/`：归档页

说明：

- 文章详情统一放在 `/posts/<slug>/`
- 分类页只负责筛选内容，不直接把分类名嵌入详情页 URL
- 这样 slug 结构稳定，后续分类调整不会影响文章主链接

## Page Design

### Home Page

首页承担三件事：

- 展示站点定位和风格
- 提供四个内容方向入口
- 展示最近文章和精选系列

视觉方向：

- 明确的个人博客气质，不做模板化文档站
- 使用更有识别度的排版、留白和配色
- 保持桌面和移动端都可读

### Category Pages

每个分类页展示：

- 分类简介
- 文章列表
- 可选精选系列入口

### Post Page

每篇文章页至少包含：

- 标题
- 发布时间
- 分类
- 正文排版
- 目录（对长文开启）
- 上一篇/下一篇或返回分类页入口

### Archive Page

按时间顺序列出已发布文章，用于长期沉淀和老文章导航。

## Content Model

每篇文章统一使用 frontmatter，最低要求：

```yaml
title: string
description: string
pubDate: date
category: ai | cs | life | english
tags: string[]
draft: boolean
```

约束：

- `posts` 集合中的内容默认 `draft: false`
- `drafts` 集合中的内容可以省略 `pubDate`，或在 schema 中允许为空
- slug 尽量稳定，不依赖中文目录名拼接 URL

## GitHub Pages Deployment

部署方案：

- Astro 输出目录为 `dist/`
- `astro.config.mjs` 中设置 `site` 和 `base`
- `base` 使用当前仓库名路径，即 `/aritcles-hub`
- GitHub Actions 负责安装依赖、构建 Astro、发布 `dist/`

这会替代当前 Jekyll 的 `_site/` 机制。

## Content and Asset Handling

图片策略建议：

- 文章正文依赖的图片迁移到 `public/images/...`
- 路径按分类或文章 slug 组织
- 避免继续依赖 Jekyll 风格的相对资源布局

旧内容中引用远端 COS 图片的部分，可以先保持不动，后续再按需本地化。

## Error Handling and Risk Control

主要风险：

1. 旧 Markdown frontmatter 不统一，迁移时可能无法被 Astro schema 直接接受
2. 旧文章中的图片和相对链接可能在目录迁移后失效
3. GitHub Pages 的 `base` 配置不正确会导致资源路径错误
4. 旧 Jekyll 文件与新 Astro 文件并存时，容易让仓库阶段性混乱

控制策略：

1. 先建立内容迁移规则和 schema，再批量迁移
2. 优先保障首页、列表页、文章页和部署链路跑通
3. 对旧文章链接和图片做一次集中扫描
4. 在迁移完成后移除 Jekyll 专属配置和构建产物职责

## Testing Strategy

至少验证以下内容：

1. 本地开发服务器能启动
2. Astro 构建成功
3. 首页、分类页、文章页、归档页可访问
4. GitHub Pages 下 `base` 路径正确
5. `drafts` 集合不会出现在生产构建的公开页面
6. 关键 Markdown 正文和图片渲染正常

## Implementation Phases

### Phase 1: Scaffold Astro

- 安装 Astro
- 建立基础项目结构
- 配置 GitHub Pages 所需的 `site` 和 `base`

### Phase 2: Define Content Collections

- 建立 `posts` 和 `drafts` 两个集合
- 定义 schema
- 确定 slug 和 frontmatter 规则

### Phase 3: Migrate Content

- 从 `articles-draft/` 提取正式文章和草稿
- 迁移到新内容目录
- 处理图片和内部链接

### Phase 4: Build Core Pages

- 首页
- 分类页
- 文章详情页
- 归档页

### Phase 5: Replace Deployment

- 替换 Jekyll GitHub Pages 流程
- 验证 `dist/` 部署

### Phase 6: Cleanup

- 移除不再使用的 Jekyll 配置
- 收敛旧目录和过渡结构

## Recommendation

按上述方案一次到位完成迁移，不保留 `articles-draft/` 作为长期正式结构。

理由：

- 当前仓库已经进入整理阶段，再维持过渡目录只会拖长后续成本
- 使用 `posts / drafts + ai/cs/life/english` 的结构更适合长期维护
- Astro 的内容集合、页面组织和 GitHub Pages 部署能形成清晰、稳定的博客工作流
