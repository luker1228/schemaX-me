---
---
This file provides guidance when working with this repository.

## 仓库定位

这是一个以写作为主的 Astro 博客仓库，同时保留部分文章配套示例代码：

- 正式文章目录：`src/content/posts/`
- 草稿目录：`src/content/drafts/`
- 分类固定为：`ai`、`cs`、`life`、`english`
- 历史文章整理区与配套代码：`articles-draft/`
- Go 独立模块：`logfacade/`

## 发布约束

1. 只有 `src/content/posts/` 里的内容会被正式发布。
2. `src/content/drafts/` 用于草稿与提纲，不生成线上文章页。
3. 所有文章最终都会对外发布，正文中不要依赖仓库内链。
4. 如需追加公众号图片，使用固定远程资源：

```md
![](https://luke-1307356219.cos.ap-chongqing.myqcloud.com/%E5%85%AC%E8%80%83/%E5%85%AC%E4%BC%97%E5%8F%B7.jpg)
```

## Astro 常用命令

```bash
npm install
npm run dev
npm run build
```

## 内容维护规则

- 正式发布文章放入 `src/content/posts/<category>/`
- 未完成文章、大纲、插图脚本放入 `src/content/drafts/<category>/`
- frontmatter 至少应包含：`title`、`description`、`category`
- 草稿必须设置 `draft: true`

## 历史代码与示例

Agent 教学代码仍保留在 `articles-draft/ai-基础知识/从零构建理解Agent/` 下，例如：

- `第1章-从零构建Agent/program`
- `第2章-PlanAndSolve与Reflection/program`
- `第3章-简单记忆的实现/program`
- `第4章-基础外界交互能力/program`

这些目录主要作为文章配套示例，不参与 Astro 构建。

## LogFacade

`logfacade/` 仍是独立 Go 模块，常用命令：

```bash
go run ./cmd/main.go
go test -v ./...
go test -bench=. -benchmem
```
