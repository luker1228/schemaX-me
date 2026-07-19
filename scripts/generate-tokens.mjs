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
// 每个 DESIGN token 可暴露多个语义别名,便于源码按语义引用。
const COLOR_VARS = {
  'paper':         ['--bg', '--paper'],
  'paper-card':    ['--surface', '--paper-card'],
  'paper-code':    ['--surface-muted', '--paper-code'],
  'ink':           ['--text', '--border'],
  'ink-muted':     ['--text-soft'],
  'yellow':        ['--accent', '--yellow'],
  'mint':          ['--mint'],
  'purple':        ['--purple'],
  'pink':          ['--pink'],
  'alert-red':     ['--red'],
  'phosphor-green':['--green', '--phosphor-green'],
  'ink-warm':      ['--ink-warm'],
  'ink-warm-soft': ['--ink-warm-soft'],
  'amber-ink':     ['--amber-ink'],
  'svg-blue':      ['--svg-blue'],
  'svg-pink':      ['--svg-pink'],
  'svg-green':     ['--svg-green'],
  'svg-purple':    ['--svg-purple'],
  'dark-void':     ['--dark-void'],
  'charcoal':      ['--charcoal'],
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const derived = {
  '--surface-strong': '#FFF2D0',
  '--accent-soft':    hexToRgba(colors['yellow'], 0.18),
  '--bg-grid':        'rgba(0, 0, 0, 0.045)',
  '--command-yellow': colors['yellow'],
}

// ── 生成 ───────────────────────────────────────────────────────────
const lines = [
  '/* AUTO-GENERATED — 不要手动修改',
  ' * 改颜色请编辑 DESIGN.json → tokens.colors，然后运行: npm run tokens',
  ' */',
  ':root {',
  '  color-scheme: light;',
  '',
  '  /* ── Colors ── */',
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
