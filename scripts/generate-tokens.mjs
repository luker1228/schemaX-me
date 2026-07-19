#!/usr/bin/env node
/**
 * 从 DESIGN.json 生成 src/styles/tokens.css
 * 用法: npm run tokens
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const design = JSON.parse(readFileSync(resolve(root, 'DESIGN.json'), 'utf-8'))
const { colors, shadows } = design.tokens

// ── CSS 变量名映射 ──────────────────────────────────────────────────
// key: DESIGN.json token 名  value: 生成的 CSS 变量名数组
// ── CSS 变量名映射 ──────────────────────────────────────────────────
// key: DESIGN.json token 名  value: 生成的 CSS 变量名数组
// 这是事实白名单:任何颜色必须先在这里登记,才会进 tokens.css,
// 进而在 check-tokens.mjs 里被视为合法 var() 引用源。
const COLOR_VARS = {
  'carbon-black':   ['--bg'],
  'deep-void':      ['--surface'],
  'panel-strong':   ['--surface-strong'],
  'panel-muted':    ['--surface-muted'],
  'iron-border':    ['--border'],
  'aged-ivory':     ['--text'],
  'mortar-gray':    ['--text-soft'],
  'wanted-yellow':  ['--accent', '--yellow'],
  'cold-wire-cyan': ['--accent-alt', '--cyan'],
  'phosphor-green': ['--green'],
  'neural-violet':  ['--purple'],
  'alert-red':      ['--red'],
  // field-* 是浅色纸面(field-manual)下使用的「ink」变体:
  // 饱和度更低、明度更暗,在暖纸面上读得清、不刺眼。
  // 命名约定 --<color>-ink,对应已有的 --yellow-ink(在 global.css 浅色皮肤段定义)。
  'field-green':  ['--green-ink'],
  'field-red':    ['--red-ink'],
  'field-violet': ['--purple-ink'],
}

// 从基础 token 派生的值（不在 DESIGN.json 里，但跟颜色强绑定）
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const derived = {
  '--accent-soft': hexToRgba(colors['wanted-yellow'], 0.12),
  '--bg-grid':     'rgba(255, 255, 255, 0.035)',
}

// ── 生成 ───────────────────────────────────────────────────────────
const lines = [
  '/* AUTO-GENERATED — 不要手动修改',
  ' * 改颜色请编辑 DESIGN.json → tokens.colors，然后运行: npm run tokens',
  ' */',
  ':root {',
  '  color-scheme: dark;',
  '',
  '  /* ── Grounds ── */',
]

for (const [token, cssVars] of Object.entries(COLOR_VARS)) {
  const value = colors[token]
  if (!value) { console.warn(`⚠ 找不到 token: ${token}`); continue }
  const displayName = design.extensions?.colorMeta?.[token]?.displayName ?? token
  lines.push(`  /* ${displayName} */`)
  for (const cssVar of cssVars) {
    lines.push(`  ${cssVar}: ${value};`)
  }
}

lines.push('', '  /* ── Derived ── */')
for (const [cssVar, value] of Object.entries(derived)) {
  lines.push(`  ${cssVar}: ${value};`)
}

lines.push('', '  /* ── Elevation ── */')
for (const [key, value] of Object.entries(shadows)) {
  lines.push(`  --shadow-${key}: ${value};`)
}

lines.push('}', '')

// ── 写文件 ─────────────────────────────────────────────────────────
const outDir = resolve(root, 'src/styles')
mkdirSync(outDir, { recursive: true })
const outPath = resolve(outDir, 'tokens.css')
writeFileSync(outPath, lines.join('\n'), 'utf-8')

console.log(`✓ 已生成 src/styles/tokens.css（${Object.keys(colors).length} 个颜色 token）`)
