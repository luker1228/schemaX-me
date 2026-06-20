---
---
# AGENTS.md — aritcles-hub

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
  posts/    — 已发布文章（4 个分类：ai, cs, life, english）
  drafts/   — 写作工作区，独立的 Astro collection，不参与生产路由
  config.ts — Zod schema 定义 frontmatter，posts 和 drafts 共用同一 schema
src/lib/content.ts — 辅助函数：getAllPosts, getPostsByCategory, getPostsBySeries
src/pages/
  index.astro          — 首页
  posts/[...slug].astro — 文章详情页（catch-all 路由）
  ai/, cs/, life/, english/ — 分类归档页
```

关键细节：
- **Frontmatter 字段**: `title`, `description`, `pubDate`, `updatedDate`, `category`, `tags`, `draft`, `slug`, `series`, `cover`
- `category` 可选；缺省时从路径首段推断（兜底为 `"ai"`）
- 所有内部链接必须使用 `import.meta.env.BASE_URL`，因站点部署在 `/aritcles-hub`
- `src/content/drafts/` 是独立 Astro collection，但页面路由不包含它——草稿通过移入 `posts/` 来发布

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

1. 在 `src/content/drafts/<category>/<article-name>/` 中编写（提纲、代码、配图、正文）
2. 成熟后移入 `src/content/posts/<category>/<article-name>.md`
3. 补充/检查 frontmatter（`pubDate`、`category`、`series` 等）
4. 运行 `npm run build` 验证
5. 提交并推送 main → 自动部署

## 仓库约定

- frontmatter 中 `draft: true` 被 schema 接收但**实际不使用**——真正的草稿机制是 content collection 分离
- 文章配图托管在腾讯 COS（`luke-1307356219.cos.ap-chongqing.myqcloud.com`），不入库
- Markdown 转微信排版：使用 `md-cli`（https://github.com/doocs/md）
