---
---
This file provides guidance when working with this repository.

## 仓库定位

这是一个以写作为主的 Astro 博客仓库，同时保留部分文章配套示例代码：

- 正式文章目录：`src/content/posts/`
- 草稿目录：主仓库的 `sources/drafts/`
- 分类固定为：`ai`、`cs`、`life`、`english`
- Go 独立模块：`logfacade/`

## 发布约束

1. 只有 `src/content/posts/` 里的内容会被正式发布。
2. `src/content/drafts/` 只保留空占位，不再作为草稿工作区。
3. 草稿与提纲统一放在主仓库 `sources/drafts/`，不生成线上文章页。
4. 所有文章最终都会对外发布，正文中不要依赖仓库内链。
5. 如需追加公众号图片，使用固定远程资源：

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
- 未完成文章放入主仓库 `sources/drafts/<category>/<article-dir>/`
- 每篇草稿都是一个独立目录，目录内允许同时放正文、大纲、插图、脚本和示例代码
- frontmatter 至少应包含：`title`、`description`、`category`
- 草稿必须设置 `draft: true`

## LogFacade

`logfacade/` 仍是独立 Go 模块，常用命令：

```bash
go run ./cmd/main.go
go test -v ./...
go test -bench=. -benchmem
```
