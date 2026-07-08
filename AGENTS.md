---
---
# AGENTS.md — Luke's Blog

## 这是什么

基于 Astro 5 + GitHub Pages 的个人博客。最小化依赖：仅 Astro + TypeScript。内容为中文。

## 命令

```sh
npm install     # 安装依赖（仅 astro + typescript）
npm run dev     # 本地开发，localhost:4321
npm run build   # 静态构建，输出到 dist/
npm run preview # 本地预览构建产物
```

无 lint、typecheck 或 test 脚本。

## 架构

```
src/content/
  posts/    — 已发布文章；当前包含 ai、cs、life、english，以及独立的 modelcraft 系列目录
  drafts/   — 空占位目录；写作草稿已迁到主仓库 `../sources/drafts/`
  config.ts — Zod schema 定义 frontmatter，posts 和 drafts 共用同一 schema
src/lib/content.ts — 辅助函数：getAllPosts, getPostsByCategory, getPostsBySeries
src/pages/
  index.astro          — 首页
  posts/[...slug].astro — 文章详情页（catch-all 路由）
  ai/, cs/, life/, english/ — 分类归档页
  modelcraft.astro      — ModelCraft 系列聚合页
  series/[slug].astro   — 系列页
```

关键细节：
- **Frontmatter 字段**: `title`, `description`, `pubDate`, `updatedDate`, `tags`, `draft`, `slug`, `series`, `cover`
- 实际分类不从 frontmatter 读；运行时按 `posts` 中文件路径首段推断。当前有效顶层目录为 `ai`、`cs`、`life`、`english`、`modelcraft`
- 所有内部链接必须使用 `import.meta.env.BASE_URL`，开发环境根路径为 `/`，生产环境保留 GitHub Pages 所需前缀
- `src/content/drafts/` 仍保留为 Astro collection 和目录占位，但当前应视为不承载写作内容
- 当前的草稿工作区在主仓库 `../sources/drafts/`；这里的 `drafts/` 只用于避免旧路径断裂

## CI/CD

推送 `main` → GitHub Actions → `npm ci && npm run build` → 部署到 GitHub Pages。单一 workflow，位于 `.github/workflows/deploy.yml`。无预览或暂存环境。

## 站点信息

- 博客名称：**Luke's AI Hub**
- GitHub：https://github.com/luker1228
- GitHub Pages：https://luker1228.github.io/aritcles-hub
- 掘金：https://juejin.cn/user/2929553730971224/posts
- 博客园：https://www.cnblogs.com/patientcat
- 微信公众号：Luke's AI Hub

## 写作流程

1. 在主仓库 `../sources/drafts/...` 中编写草稿、提纲、配图、脚本和实验稿。
2. 发布时，把最终正文整理为 `src/content/posts/.../*.md`。
3. 已发布文章若有改动，默认直接更新 `src/content/posts/` 对应文件；不要只改主仓库草稿而漏掉正式稿。
4. 补充/检查 frontmatter，至少确认 `title`、`description`、`pubDate`，系列文章补 `series`，更新稿补 `updatedDate`。
5. 运行 `npm run build` 验证。
6. 提交并推送 main → 自动部署。

## 仓库约定

- frontmatter 中 `draft: true` 被 schema 接收但**实际不使用**——真正的草稿机制是 content collection 分离
- `posts/` 才是线上内容源；任何“重新发布”“正式更新”“同步草稿到线上”都应以修改 `src/content/posts/` 为准
- 主仓库的 `sources/drafts/` 才是草稿、笔记、素材说明的工作区，不应直接发布
- `modelcraft` 是独立内容分组，已参与正式路由与聚合，不属于 `cs/essays`
- 文章配图托管在腾讯 COS（`luke-1307356219.cos.ap-chongqing.myqcloud.com`），不入库
- Markdown 转微信排版：使用 `md-cli`（https://github.com/doocs/md）
