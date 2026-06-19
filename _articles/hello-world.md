---
---
# Hello World

这是我的第一篇文章。把 `.md` 文件放在 `_articles/` 目录下就能发布。

- 不需要加 `---` front matter（hook 会自动处理）
- 文件名随意，无需日期前缀
- 支持所有标准 Markdown 语法

## 代码示例

```python
def hello():
    print("Hello, World!")
```

## 图片

引用图片使用相对路径，放在 `assets/` 目录下：

```
![alt text]({{ site.baseurl }}/assets/images/example.png)
```
