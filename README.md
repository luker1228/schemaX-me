---
---
# Luke's Blog

这个仓库已经从 Jekyll 迁移到 Astro，用于生成 GitHub Pages 博客。

## 技术栈

- `Astro 5`
- `TypeScript`
- `GitHub Pages`

## 内容结构

- `src/content/posts/ai/`：正式发布的 AI 文章
- `src/content/posts/cs/`：正式发布的计算机与工程实践文章
- `src/content/posts/life/`：正式发布的代码之外文章
- `src/content/posts/english/`：正式发布的英语学习文章
- `src/content/drafts/`：草稿工作区，按同样的四个主题分目录，每篇文章一个独立目录，目录内可放正文、提纲、配图、脚本和示例代码
- `public/images/`：博客静态图片资源
- `logfacade/`：独立的 Go 示例模块

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`，用于 GitHub Pages 部署。

## 发布约定

- 正式博客只发布 `src/content/posts/` 中的文章
- `src/content/drafts/` 不参与生产站点路由生成
- 草稿文章建议保持“一个目录对应一篇文章”的原始工作形态
- 文章末尾如需保留公众号图片，继续使用现有远程资源链接

## Markdown 转微信排版

- `md-cli`
- <https://github.com/doocs/md?tab=readme-ov-file>
