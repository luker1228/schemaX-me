# DOSSIER 设计系统 · 最强人类大模型 LUKE 机密档案

> `design.md` 是「复古开发者实验室」基底;本文档是叠加在它之上的**机密档案**皮肤
> (路线 **C 赛博档案 + A 终端启动** 融合)。外壳是终端(开机/解密),里面是档案
> (ID 卡 + 属性矩阵 + 涂黑记录)。slogan「人类大模型 · Luke」是档案上的**型号代号**,
> 「最强」是**评级印章**——它不再是营销文案,而是档案本身的一部分。

---

## 0. 世界观锚点

```
档案编号:  FILE #LXM-0001
对象代号:  LUKE
型号:      HLM-1  (Human Large Model)
能力评级:  ◉ OMEGA   ← "最强"
机密等级:  绝密 / CLASSIFIED
当前状态:  ONLINE
```

整站语法:**终端是「查看器/解密器」,档案是「正在被阅读的内容」**。
视觉 = 黑底终端里打开一份绿色字符的数字档案。A 负责"开机解密"叙事,C 负责"读档"结构。

---

## 1. 配色 Token(追加在 `global.css` `:root`)

基底沿用 `design.md`,只追加档案语义色:

| Token | Hex | 语义 | 对应 IP 角色 |
|---|---:|---|---|
| `--phosphor` | `#22ff88` | 终端/解密/数据(主导氛围) | 绿眼镜 |
| `--phosphor-dim` | `#0f6b3c` | 弱化绿、进度槽底 | — |
| `--classified` | `#ff4d4d` | 绝密印章 / 涂黑 REDACTED | — |
| `--yellow` | `#ffd43b` | 机密等级 / 警示 / OMEGA 评级 | 黄皮肤 |
| `--purple`(`--ai`) | `#b678ff` | AI / 实验模块 | 紫风衣 |
| `--cyan` | `#00d4ff` | 链接 | — |

**原则**:绿主导氛围,黄做等级,红只点印章/涂黑,紫给 AI 板块。IP 的 4 色(黄/黑/绿/紫)
与语义天然对齐,角色放进档案不违和。配比参考 `design.md`:黑灰 75% / 文字 15% / 彩色 10%。

---

## 2. Motif 系统(档案感的灵魂细节)

| Motif | 实现 | 用途 |
|---|---|---|
| **开机解密层** `.dossier-boot` | `position:fixed;inset:0;z-index:9500` + 打字机日志 + 进度条 | 首次进站播放一次,`sessionStorage` 去重,可点击跳过,6s 兜底,`prefers-reduced-motion` 直达 |
| **扫描线 + 暗角** `.dossier-atmosphere` | `repeating-linear-gradient` + radial vignette,hero 内绝对定位 | 氛围叠层(只覆盖 hero,不污染正文页) |
| **扫描光带** `.dossier-photo .scanbar` | 头像框内横向 `@keyframes` 光带循环 | "主体成像"扫描感 |
| **红色印章** `.dossier-stamp` | 旋转空心描边字 `rotate(-12deg)` | `绝密` / `OMEGA` 斜盖角落 |
| **涂黑** `.dossier-redacted` | 红色块遮文字,hover 揭示 | easter egg / 草稿 / 预告 |
| **四角对位** `.dossier-corner` / `.reg` | L 形描边角 | 文件框/照片框的"取景器"感 |
| **属性条** `.dossier-bar i` | 条纹绿条 + 发光,JS 设宽触发过渡 | 能力矩阵 RPG 感 |
| **状态闪烁** `.dossier-dot` / `.cur` | `steps()` 呼吸动画 | `● REC` / `● ONLINE` / 光标 |

---

## 3. IP 图片分配表

`assets/ip/` → `public/images/ip/`(ASCII 名,避开中文文件名 Vite import 风险):

| 源文件 | 落点 | 处理 |
|---|---|---|
| `头像.png` → `portrait.png` | Hero 主体识别卡 · 主扫描立绘;同时 `cp` 回 `assets/luke2.png` 供 Header/Footer/Blog 复用 | 扫描框 + 光带 + 四角 |
| `线条.png` → `blueprint.png` | 能力矩阵背景蓝图叠层(`opacity:.06`) | 技术图纸感,点睛 |
| `海报.png`(护目镜) | (待接)Hero 装备形态切换 / 404 | 扫描模式 |
| `基础.png` | (待接)About · 心理画像卷首 | 标准 |
| `长身.png` | (待接)About 全身扫描 | 全身框 |
| `尖头发侧面.png` | (待接)属性矩阵侧栏小图 | 侧脸变体 |
| `头部元素.png` | (待接)loading / 章节分隔 / favicon | 碎片 |
| `橘色.png` | (待接)"备用型号 HLM-1β"彩蛋 | 橙青配色 |
| `儿童画.png` | (待接)"早期训练样本 v0.1"彩蛋 | 藏底 |

---

## 4. Slogan 落点

`人类大模型 · Luke` 当**档案字段**,不当广告语:

- Hero ID 卡:型号 `HLM-1 · 人类大模型` + 代号 `LUKE`
- 评级印章:`◉ OMEGA · 最强`
- slogan 引用条:「你好,我是人类大模型 Luke。你的硅基同类。」(左磷光绿竖线)
- 底部状态栏:`luke@human-llm:~$_`

---

## 5. 已落地组件清单

- [x] 开机解密层(`dossier-boot` + `is:inline` 脚本)
- [x] 顶部状态条(`dossier-topbar` · `luke@human-llm` + `● REC` + `绝密` + `◉ OMEGA`)
- [x] 主体识别 ID 卡(`dossier-id` · 头像扫描 + 字段 + 双印章 + slogan + 双按钮)
- [x] 能力矩阵(`dossier-matrix` · 6 条属性条 + 蓝图底纹)
- [x] 外勤记录(`dossier-records` · 最新 3 篇真实文章 + 1 条 REDACTED 彩蛋)
- [x] 配色 token + motif CSS(纯追加进 `global.css`,全部 scope 在 `.dossier` 下)
- [x] 图片入站 `public/images/ip/`

---

## 6. 后续待铺(路线图)

当前只换了**首页 Hero**;SiteHeader/Footer 和下方既有板块(技术栈 marquee / Featured Works /
Frontend Guide / Product Demo)保留原样,可按需继续"档案化":

| 现有板块 | 档案化命名 | 下一步 |
|---|---|---|
| 技术栈 marquee | 合并进 CAPABILITY MATRIX(或保留为终端滚动条) | 决定去留 |
| Featured Works | DEPLOYED ASSETS · 部署资产 | 套 `.dossier-panel` + 编号 |
| Frontend Guide | TRAINING PROTOCOLS · 训练协议 | 步骤 → 训练模块 |
| Product Demo | FIELD PROTOTYPES · 外勤原型机 | 终端窗口升级为解密终端 |
| SiteHeader | 终端 chrome 化(品牌 → `luke@human-llm:~$`) | 可选 |
| SiteFooter / About | TRANSMISSION · 加密通讯 + PSYCHE PROFILE | 可选 |
| 404 | "ACCESS DENIED / FILE NOT FOUND" 用护目镜立绘 | 彩蛋 |

**决策点**:档案皮肤是只铺在 Hero(目前),还是往下铺满首页、甚至全站?
→ 见对话结论,按需推进。

---

## 7. 设计禁忌(继承 `design.md` 并强化)

- 不破坏正文页可读性:扫描线/暗角**只覆盖 hero**,不全局铺。
- 开机动画**可跳过、可去重、有兜底**,不能阻塞内容(失败也要显形)。
- 红色只用于印章/涂黑,不滥用。
- 不引入玻璃拟态、大圆角、柔和大阴影(继承 design.md)。
- 中文文件名不直接走 Vite import → 统一放 `public/images/ip/`。
