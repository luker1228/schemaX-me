# DOSSIER 设计系统 · Luke Cyber Zine Archive

> `design.md` 是「复古开发者实验室」底盘。本文档不是简单续一层“机密档案”皮肤，而是把它推进成一套更完整的
> **cyberpunk + zine + retroui** 首页/专题语法。
>
> 终端依然是查看器，档案依然是内容主体，但现在要加入：
>
> - zine 的拼贴、碰撞、脚注、裁切
> - retroui 的窗口栏、按钮、状态灯、硬阴影
> - cyberpunk 的扫描、警示、荧光、系统编号

---

## 0. 世界观锚点

```txt
ARCHIVE ID:   LXM-0001
SUBJECT:      LUKE
MODEL:        HLM-1  / Human Large Model
ISSUE:        03
STATUS:       ONLINE
CLEARANCE:    OMEGA / CLASSIFIED
```

整站语法从原来的“正在读一份数字档案”升级为：

> **你正在浏览一套地下实验室公开给外部世界的混合媒介档案。**

它既像：

- 一台旧机器正在启动
- 一份被多次复印、贴标、重审的技术档案
- 一本独立刊物式的个人实验室索引

---

## 1. 风格定义

### 不是

- 不是纯黑客终端页
- 不是纯赛博夜店海报
- 不是全页面做旧的复古玩具站

### 是

- **Cyberpunk** 负责危险感、在线感、扫描感
- **Zine** 负责版式冲突、脚注、编号、拼贴
- **RetroUI** 负责信息结构、按钮逻辑、窗口 chrome

一句话：

> **外层像系统，内层像杂志，交互像旧机器。**

---

## 2. 配色 Token

在 `design.md` 基础上，dossier 层优先使用以下语义色：

| Token | Hex | 语义 |
|---|---:|---|
| `--ink` | `#111111` | 页面主底色 |
| `--ink-2` | `#1a1a1a` | panel / chrome |
| `--paper` | `#f3eadb` | 浅底块 / 纸张感文字区 |
| `--paper-dim` | `#c8beaf` | 注释 / 脚注 |
| `--phosphor` | `#22ff88` | 扫描、在线、数据 |
| `--acid` | `#ffd43b` | 编号、CTA、标签、荧光笔 |
| `--classified` | `#ff4d4d` | 印章、错误、REDACTED |
| `--cyan` | `#00d4ff` | 链接、悬停、辅助电光 |
| `--violet` | `#b678ff` | AI / 实验模块，小比例 |

### 比例建议

- 黑灰与炭色：65%
- 纸白与正文：15%
- 荧光强调：20%

### 使用规则

- `phosphor + acid` 是默认双核
- `classified` 只打点，不铺满
- `paper` 只用于局部“纸片/档案页”，不要把全站洗成浅底

---

## 3. Motif 系统

| Motif | 实现 | 用途 |
|---|---|---|
| **boot layer** `.dossier-boot` | 固定层 + 打字日志 + 进度条 | 首次开机叙事 |
| **window chrome** `.dossier-window` | 顶部控制条 + 像素灯 + panel body | retroui 骨架 |
| **scanline field** `.dossier-atmosphere` | 轻扫描线 + 暗角 + 噪点 | hero 氛围层 |
| **issue label** `.dossier-issue` | 大编号 / 小字脚注 / 扭转贴纸 | zine 层次 |
| **redacted strip** `.dossier-redacted` | 红块涂黑或 hover reveal | 档案感 + 彩蛋 |
| **acid marker** `.dossier-highlight` | 黄底高亮条 / 下划线 | 重点句 |
| **offset shadow** `.dossier-hard-shadow` | `4px 4px 0 var(--acid)` | retroui 触感 |
| **corner registration** `.dossier-reg` | 四角 L 形对位 | 取景/印刷定位 |
| **status dot** `.dossier-dot` | `ONLINE / REC / LIVE` 闪烁点 | 系统状态 |
| **footnote rail** `.dossier-note` | 边注 / 竖排 meta / 小字说明 | zine 的阅读层次 |

---

## 4. 首页 Hero 的新语法

Hero 不再只是“终端里的一张档案卡”，而是 3 层叠加：

### 第 1 层：系统外壳

- 顶部状态条
- 左上角 archive id / issue
- 右上角 clearance / online 状态
- 窗口 chrome 或启动条

### 第 2 层：主体档案

- 头像或半身立绘放入扫描框
- 中央为 `LUKE / HLM-1 / Human Large Model`
- 评级印章 `OMEGA`
- 1 个主 CTA + 1 个次 CTA

### 第 3 层：zine 拼贴

- 大号倾斜编号，如 `03`
- issue 贴角
- 一个脚注块或边注块
- 一条黄底 marker slogan，而不是普通副标题

Hero 目标：

> 第一眼是强辨识，第二眼是可读，第三眼才是细节可玩。

---

## 5. Slogan 落位

`人类大模型 Luke` 不该作为常规品牌口号飘在 hero 上，而应嵌入系统字段。

推荐落位：

- 型号字段：`HLM-1 / Human Large Model`
- 贴纸字段：`human-scale intelligence`
- 高亮句：`你的硅基同类，还保留人类的审美故障`
- 状态条：`luke@human-llm:~$`

`最强` 也不再是营销词，而是：

- 评级章
- issue tag
- 彩蛋 footnote

---

## 6. 版面扩张策略

当前 dossier 语言已经铺进首页 hero。下一步不建议“整页全都变成同一种档案卡”，而要做节奏分层：

| 现有板块 | 新命名建议 | 处理方向 |
|---|---|---|
| Featured Works | `DEPLOYED ASSETS` | 用窗口卡 + 编号 |
| Frontend Guide | `TRAINING PROTOCOLS` | 用 issue 卡 + 步骤轨道 |
| Product Demo | `FIELD PROTOTYPES` | 用控制台 / 终端面板 |
| 技术栈 marquee | `SIGNAL BAND` | 做成 ticker，不必删 |
| Footer / About | `TRANSMISSION` | 做成通讯区和脚注区 |

核心原则：

- hero 最强戏剧性
- 中段收回到结构化 panel
- 局部再插入 zine 撞版

不要让用户从头到尾都在打一场视觉仗。

---

## 7. 图片与资产分配

建议沿用 `public/images/ip/` 的 ASCII 命名策略，并按角色分工：

| 资产 | 建议用途 |
|---|---|
| `portrait.png` | Hero 主体扫描框 / about |
| `blueprint.png` | matrix / 背景蓝图 / panel 叠层 |
| `goggles-poster.png` | 404 / 彩蛋 / alt hero |
| `full-body.png` | about 页或 profile 页 |
| `head-fragment.png` | favicon / loading / sticker |

处理原则：

- 不裸放在白底里
- 包进窗口、扫描框、纸片或 panel
- 图像边缘优先硬切，不做柔雾融合

---

## 8. 交互与动效

允许：

- 开机层
- 扫描光带
- 轻微 hover 位移
- 状态灯闪烁
- ticker / marquee
- typed boot log

不建议：

- 大幅度 parallax
- 连续 glitch 抖动
- 整站满屏扫描线
- 高强度 flicker

动效应像设备在运作，不像页面在炫技。

---

## 9. 设计禁忌

- 不把 `zine` 做成满屏胶带和碎贴纸
- 不把 `cyberpunk` 做成蓝紫霓虹渐变
- 不把 `retroui` 做成儿童像素游戏 UI
- 不给正文阅读区加重扫描线和低对比噪点
- 不把所有 section 都封在同一种厚边框盒子里
- 不使用大圆角、玻璃拟态、柔和现代阴影

---

## 10. 决策原则

如果需要在“更酷”和“更清楚”之间选：

- 首页首屏：先保辨识度
- 内容正文：先保可读性
- CTA：先保可操作性

判断是否做对的标准不是“够不够赛博”，而是：

> **这是不是 Luke 的世界，而不是任意一个赛博模板。**
