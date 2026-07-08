---
---
# Luke's Blog

## 技术栈

- `Astro 5`
- `TypeScript`
- `GitHub Pages`

## 内容结构

- `src/content/posts/ai/`：正式发布的 AI 文章
- `src/content/posts/cs/`：正式发布的计算机与工程实践文章
- `src/content/posts/life/`：正式发布的代码之外文章
- `src/content/posts/english/`：正式发布的英语学习文章
- `src/content/drafts/`：本地保留的空占位目录。写作草稿已迁到主仓库 `sources/drafts/`，这里不再承载写作过程文件
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
- 写作中的草稿、配图、代码和提纲统一放在主仓库 `sources/drafts/`
- 文章末尾如需保留公众号图片，继续使用现有远程资源链接

## Markdown 转微信排版

- `md-cli`
- <https://github.com/doocs/md?tab=readme-ov-file>

## 我的信息

### 博客

| 平台 | 地址 |
|------|------|
| GitHub Pages（主站） | <https://luker1228.github.io/aritcles-hub> |
| 掘金 | <https://juejin.cn/user/2929553730971224/posts> |
| 博客园 | <https://www.cnblogs.com/patientcat> |

### Repo

| 名称 | 链接 |
|------|------|
| GitHub Repo | <https://github.com/luker1228/aritcles-hub> |
| GitHub Profile | <https://github.com/luker1228> |

### 公众号

<div align="center">

![公众号二维码](https://luke-1307356219.cos.ap-chongqing.myqcloud.com/%E5%85%AC%E8%80%83/%E5%85%AC%E4%BC%97%E5%8F%B7.jpg)

**Luke's AI Hub** — 扫码关注，获取文章更新和阶段性总结。

</div>
