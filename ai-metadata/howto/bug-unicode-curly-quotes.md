# Bug: Edit 工具写入 Unicode 弯引号导致 HTML 属性全部失效

## 现象
修改 lesson-css.html 后，除了第一张卡片（CSS-01），其余卡片全部失去样式、从页面最左边开始渲染，完全没有 `.wrap` 居中、`.step-card` 边框和背景。

## 根本原因
使用 Edit 工具写入大段 HTML 时，工具将 ASCII 直引号 `"` (U+0022) 替换成了 Unicode 弯引号 `"` (U+201C) 和 `"` (U+201D)。

浏览器不把弯引号识别为 HTML 属性值的分隔符，所以 `class="html2-body-section"` 实际上变成了：

```
class="html2-body-section"
```

浏览器将整个 `"html2-body-section"` 当作属性名而非属性值，导致 `class` 属性的值为空，所有 CSS 规则无法匹配。

## 诊断方法
用 Python 读取文件原始字节，搜索 `\xe2\x80\x9c` (U+201C) 和 `\xe2\x80\x9d` (U+201D)：

```python
with open('lesson-css.html', 'rb') as f:
    content = f.read()
idx = content.find(b'css-playground-intro')
print(repr(content[idx-30:idx+200]))
# 输出中出现 \xe2\x80\x9c / \xe2\x80\x9d 即为弯引号
```

另一个信号是 Python HTMLParser 显示 `class=""html2-body-section""` —— 外层是直引号（parser 自己加的），内层是文件里的弯引号。

## 修复方法
```python
with open('lesson-css.html', 'r', encoding='utf-8') as f:
    content = f.read()
fixed = content.replace('“', '"').replace('”', '"')
with open('lesson-css.html', 'w', encoding='utf-8') as f:
    f.write(fixed)
```

## 预防措施
- 用 Edit 写入大段 HTML 后，验证文件里没有 `\xe2\x80\x9c/\xe2\x80\x9d` 字节
- 症状：某些 section 样式完全失效，但 innerHTML 前几个正常的元素不受影响（因为写入是分段的，早期内容是直引号）
- 受影响区域通常从 Edit 写入的第一个大段文字内容开始（本例是 CSS-02 以后）
