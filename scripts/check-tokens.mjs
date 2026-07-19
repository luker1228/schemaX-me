#!/usr/bin/env node
/**
 * check-tokens.mjs — 拦截 src/ 里「未经设计的颜色字面量」。
 *
 * 设计意图
 * ─────────
 * token 系统的唯一入口是 DESIGN.json → generate-tokens.mjs → tokens.css。
 * 任何颜色字面量(#hex / rgb / rgba / hsl / hsla)直接出现在源码里,
 * 都意味着绕过了设计系统,长期会失控。本脚本在 build 前扫描,违反就退出非 0。
 *
 * 什么算「合法」
 * ─────────
 * 1. 出现在 DESIGN.json tokens.colors 里的值(直接登记过的 token);
 * 2. 在 ALLOWED_HEX / ALLOWED_RGBA 临时白名单里(历史遗留,逐步清零);
 * 3. 文件本身是 token 的「定义点」而非「使用点」——即:
 *    - src/styles/tokens.css(auto-generated)
 *    - src/styles/global.css 里 :root / body:has(.dossier) / body:has(.blog-page)
 *      等皮肤定义块(这里正是新 token var() 的诞生地)
 *    这些块允许写字面量,因为它们在「定义 --var: #hex」,不是「使用颜色」。
 *
 * 怎么用
 * ─────────
 *   npm run tokens:check          # 默认严格模式,任何违规 exit 1
 *   npm run tokens:check -- --fix # 把当前所有违规写进 baseline.json,下次就放过
 *
 * 推荐 workflow:首次跑 --fix 生成 baseline,之后禁止新增;后续清理时
 * 手动从 baseline.json 删条目,逐步收紧到 0。
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { resolve, dirname, relative, join } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = resolve(root, 'src')

// ── 1. 从 DESIGN.json 加载合法颜色 ──────────────────────────────
const design = JSON.parse(readFileSync(resolve(root, 'DESIGN.json'), 'utf-8'))
const designedHex = new Set(
  Object.values(design.tokens.colors).map((h) => normalizeHex(h))
)

// ── 2. 历史遗留白名单(从 baseline.json 加载,可清理到 0) ─────────
let baseline = { violations: [] }
try {
  baseline = JSON.parse(readFileSync(resolve(root, 'scripts/baseline.json'), 'utf-8'))
} catch {
  // 没有 baseline = 全部按违规处理(首次严格跑就是全量报错)
}
// 基线 key 只用 (file, normalized-value),不带行号。
// 原因:源文件随时被编辑,行号一变就匹配不上,导致已容忍的颜色反复误报。
// 按 (file, value) 粒度容忍,语义是「这个文件里允许出现这个颜色值」,更稳定。
const baselineKeys = new Set(
  (baseline.violations || []).map((v) => {
    const norm = v.kind === 'hex' ? normalizeHex(v.value) : v.value
    return `${v.file}::${norm}`
  })
)

// ── 3. 扫描配置 ─────────────────────────────────────────────────
const SCAN_EXT = new Set(['.astro', '.jsx', '.tsx', '.ts', '.css', '.html', '.vue', '.svelte'])
// 这些路径/文件不扫:它们是 token 的定义点或生成产物,不是使用点。
const SKIP_FILES = new Set([
  'src/styles/tokens.css', // auto-generated
])
// global.css 里的皮肤定义段允许字面量(在「定义 --var」)。
// 用选择器锚点界定区间:从该行到下一个 `}` 结束的规则块整体跳过。
const SKIN_DEFINITION_ANCHORS = [
  /^\s*:root\s*\{/,
  /^\s*body:has\(\.dossier\)\s*\{/,
  /^\s*body:has\(\.blog-page\)\s*\{/,
  /^\s*body:has\(\.retroui\)\s*\{/,
]

// 颜色字面量的匹配模式(单独捕获,便于报告)
const COLOR_PATTERNS = [
  { re: /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g, kind: 'hex' },
  { re: /\brgba?\(\s*[^)]*\)/g, kind: 'rgb' },
  { re: /\bhsla?\(\s*[^)]*\)/g, kind: 'hsl' },
]

// ── 工具函数 ────────────────────────────────────────────────────
function normalizeHex(h) {
  let s = String(h).trim().toLowerCase()
  if (s.length === 4) {
    // #abc → #aabbcc
    s = '#' + s[1] + s[1] + s[2] + s[2] + s[3] + s[3]
  }
  return s
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else if (SCAN_EXT.has(extOf(full))) out.push(full)
  }
  return out
}

function extOf(p) {
  const i = p.lastIndexOf('.')
  return i === -1 ? '' : p.slice(i)
}

// 判断某一行是否落在「皮肤定义块」内(允许字面量)
function isInSkinDefinitionBlock(lines, lineIdx) {
  // 向上找最近的 `{`,看它的所属行是不是某个 anchor
  for (let i = lineIdx; i >= 0; i--) {
    const line = lines[i]
    if (line.includes('}')) {
      // 已经离开当前块(} 在前面),不算
      // 但要确认这一行之前没有 { 开新块——简单处理:只要这行有 },就说明
      // 从这里往上属于上一个规则;继续往上找 {
      continue
    }
    if (line.includes('{')) {
      // 找到块开始,判断是不是 skin 定义
      return SKIN_DEFINITION_ANCHORS.some((re) => re.test(line))
    }
  }
  return false
}

// ── 4. 扫描 ────────────────────────────────────────────────────
// --fix 模式下要捕获「所有」字面量(无视旧 baseline),重新建立基线。
const fixMode = process.argv.includes('--fix')
const files = walk(srcDir)
const violations = []

for (const file of files) {
  const rel = relative(root, file).split('\\').join('/')
  if (SKIP_FILES.has(rel)) continue

  const text = readFileSync(file, 'utf-8')
  const lines = text.split('\n')

  lines.forEach((line, idx) => {
    // 注释行放过(CSS / JS // 与 /* */ 与 Astro ---)
    const trimmed = line.trim()
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) return

    // 皮肤定义块内放过
    if (rel.endsWith('.css') && isInSkinDefinitionBlock(lines, idx)) return

    for (const { re, kind } of COLOR_PATTERNS) {
      re.lastIndex = 0
      const matches = line.matchAll(re)
      for (const m of matches) {
        const raw = m[0]
        let normalized = raw
        if (kind === 'hex') normalized = normalizeHex(raw)
        // 过滤:在 DESIGN.json 里登记过 → 合法
        if (kind === 'hex' && designedHex.has(normalized)) continue
        // 过滤:在 baseline 里 → 放过(但记录为「技术债」)。
        // --fix 模式下忽略 baseline,全量重写基线。
        if (!fixMode) {
          const key = `${rel}::${normalized}`
          if (baselineKeys.has(key)) continue
        }

        violations.push({
          file: rel,
          line: idx + 1,
          value: raw,
          kind,
          snippet: trimmed.length > 100 ? trimmed.slice(0, 100) + '…' : trimmed,
        })
      }
    }
  })
}

// ── 5. --fix:把违规写进 baseline ────────────────────────────────
if (process.argv.includes('--fix')) {
  const { writeFileSync } = await import('fs')
  // 归一化并按 (file, value) 去重——同一文件同一颜色只记一条,
  // 这样源文件被编辑导致行号变化时,baseline 仍能稳定匹配。
  const seen = new Set()
  const deduped = []
  for (const v of violations) {
    const normValue = v.kind === 'hex' ? normalizeHex(v.value) : v.value
    const key = `${v.file}::${normValue}`
    if (seen.has(key)) continue
    seen.add(key)
    deduped.push({ file: v.file, value: normValue, kind: v.kind })
  }
  const next = {
    _comment:
      'check-tokens.mjs 的历史遗留白名单。按 (file, normalized-value) 粒度容忍。逐步清理:每修掉一种颜色在某文件的使用,就删对应条目,目标是清空。',
    generatedAt: new Date().toISOString(),
    count: deduped.length,
    violations: deduped,
  }
  writeFileSync(resolve(root, 'scripts/baseline.json'), JSON.stringify(next, null, 2) + '\n', 'utf-8')
  console.log(`✓ baseline 已生成:${deduped.length} 条历史违规已记录到 scripts/baseline.json`)
  console.log('  下次跑 npm run tokens:check 会放过这些,只拦新增。')
  process.exit(0)
}

// ── 6. 报告 ────────────────────────────────────────────────────
if (violations.length === 0) {
  const debt = baselineKeys.size
  console.log(`✓ tokens:check 通过 — 无新增颜色字面量。${debt ? `(历史遗留 ${debt} 条,见 scripts/baseline.json)` : ''}`)
  process.exit(0)
}

console.error(`\n✗ tokens:check 发现 ${violations.length} 处未经设计的颜色字面量:\n`)
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.value}  [${v.kind}]`)
  console.error(`    ${v.snippet}\n`)
}
console.error(
  `修复方式:把颜色登记到 DESIGN.json tokens.colors,运行 npm run tokens,然后用 var(--xxx) 引用。\n` +
    `如果是历史遗留、暂时无法清理,运行 npm run tokens:check -- --fix 写进 baseline。\n`
)
process.exit(1)
