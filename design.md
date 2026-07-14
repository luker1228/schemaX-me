---
name: Luke Lab
description: A hacker's classified dossier — cyberpunk retro, AI-model persona, most wanted in digital space.
colors:
  carbon-black: "#171717"
  deep-void: "#111111"
  panel-strong: "#1d1d1d"
  panel-muted: "#242424"
  iron-border: "#333333"
  aged-ivory: "#f6ead6"
  mortar-gray: "#9c9384"
  wanted-yellow: "#ffd43b"
  cold-wire-cyan: "#00d4ff"
  phosphor-green: "#00d26a"
  neural-violet: "#b678ff"
  alert-red: "#ff4d4d"
typography:
  display:
    fontFamily: '"Arial Black", "Archivo Black", Impact, sans-serif'
    fontSize: "clamp(3rem, 9vw, 6.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.02em"
  headline:
    fontFamily: '"Arial Black", "Archivo Black", Impact, sans-serif'
    fontSize: "clamp(1.7rem, 4vw, 2.8rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "0.02em"
  title:
    fontFamily: '"Arial Black", "Archivo Black", Impact, sans-serif'
    fontSize: "clamp(1.2rem, 2vw, 1.7rem)"
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: "0.02em"
  body:
    fontFamily: '"Avenir Next", "Segoe UI", "PingFang SC", "Hiragino Sans GB", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: '"SFMono-Regular", "JetBrains Mono", Consolas, monospace'
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.08em"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.9rem"
  md: "1.35rem"
  lg: "2rem"
  xl: "4.5rem"
components:
  button-primary:
    backgroundColor: "{colors.wanted-yellow}"
    textColor: "{colors.deep-void}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.05rem"
  button-primary-hover:
    backgroundColor: "{colors.wanted-yellow}"
    textColor: "{colors.deep-void}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.05rem"
  button-secondary:
    backgroundColor: "{colors.panel-strong}"
    textColor: "{colors.aged-ivory}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.05rem"
  nav-link:
    backgroundColor: "{colors.deep-void}"
    textColor: "{colors.aged-ivory}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.8rem"
  nav-link-active:
    backgroundColor: "{colors.wanted-yellow}"
    textColor: "{colors.deep-void}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.8rem"
  work-card:
    backgroundColor: "{colors.deep-void}"
    textColor: "{colors.aged-ivory}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
  stat-box:
    backgroundColor: "{colors.panel-strong}"
    textColor: "{colors.aged-ivory}"
    rounded: "{rounded.none}"
    padding: "0.85rem 0.95rem"
---

# Design System: Luke Lab

## 1. Overview

**Creative North Star: "The Wanted Dossier"**

Luke Lab is a classified intelligence file on a self-styled AI model — the most wanted entity in a hacker's cyberpunk world. The interface is not a portfolio. It is a dossier: dark terminals, hardwired transmissions, redacted fields, colored offset shadows that read like physical stamps. The premise is taken seriously enough to make it feel real. Luke is both the subject of the file and the person who built it.

The visual language is cyberpunk-retro: carbon black backgrounds, aged-ivory text that feels like a transmission received on a CRT, and high-saturation accent colors deployed with military discipline — each one assigned a signal role in the information hierarchy, like category markers on a mission board. Typography is compressed and uppercase for display work, functional and legible for body prose. There are no decorative flourishes. Every element earns its presence.

This system is dark because the scenario demands it: an operator's dossier, read under operational conditions. Not dark because "tools look cool dark." Not dark to signal seriousness. Dark because the narrative requires it. The Tactics Manual sub-theme (`src/howto/styles.css`) inverts this — warm bone-paper cream, terracotta accent — and should be treated as a separate surface entirely: same structural rules, different atmospheric register.

**What this system explicitly rejects:**
- Commercial SaaS landing pages with gradient heroes, rounded cards, and metric stat grids
- Glassmorphism and decorative backdrop-filter blur
- Soft drop shadows and ambient glow as default elevation
- Gradient text (`background-clip: text`)
- Multiple accent colors on a single surface
- Generic AI product marketing aesthetics
- Pure `#000000` backgrounds

**Key Characteristics:**
- Zero border-radius throughout (pill tags at 999px are the sole exception)
- Hard offset box-shadow as the only elevation mechanism: colored, crisp, zero blur
- Monospace uppercase labels everywhere metadata appears
- Display type compressed to line-height 0.88–0.95, always uppercase
- Five named accent colors, each assigned to one content category
- Faint dot-grid background at the body level — a data-space underlay
- System font stack for body/label: no web font loaded, bilingual-safe

**The Terminal-as-Element Rule.** Terminal and hardware aesthetics — scan animations, monospace system bars, PCB trace patterns, chip slot grids — are atmospheric seasoning. They reinforce the intelligence file narrative; they do not replace it. The structural identity is always "classified dossier," never "circuit board." When choosing between an intelligence-report format and a hardware-manual format, the dossier wins every time. A capability list belongs in an operative's asset manifest, not a motherboard schematic.

## 2. Colors: The Signal Palette

Five accent channels on a carbon substrate. Grounds are the dark infrastructure. Signals are the content identifiers. The two groups never compete — Grounds recede, Signals assert.

### Primary
- **Wanted Yellow** (`#ffd43b`): The primary action color. Active nav state, primary buttons, Writing content work cards, guide step indices, `::selection` highlight. Yellow means "act here" or "this is the Writing category." Its rarity is the point.

### Secondary
- **Cold Wire Cyan** (`#00d4ff`): Frontend, links, the about-visual offset frame shadow, dossier ghost-button hover, and accent for Frontend Guide content. Evokes cold data transmission and electric signal.

### Tertiary
- **Phosphor Green** (`#00d26a`): Running states, Deploy content, success indicators, dossier progress bars, terminal glow. Named after the phosphor coating of old CRT monitors — the color of a live system.
- **Neural Violet** (`#b678ff`): AI content, experimental work, lab portrait background tint, work card shadow variant for generative projects.
- **Alert Red** (`#ff4d4d`): Classified stamps, error states, the dossier pulse dot, fault conditions. Used only where the interface must signal restriction or danger.

### Neutral
- **Carbon Black** (`#171717`): Page background. Not pure black — the faintest warmth prevents the heavy-black look. The operational floor.
- **Deep Void** (`#111111`): Card and content surface. One step deeper than Carbon Black.
- **Panel Strong** (`#1d1d1d`): Interactive surfaces — nav background, hovered surfaces, stat boxes.
- **Panel Muted** (`#242424`): Secondary panels, code backgrounds, deeply nested surfaces.
- **Iron Border** (`#333333`): All borders and dividers. High enough contrast on carbon to read without being loud.
- **Aged Ivory** (`#f6ead6`): Primary text. Warm tint — never pure white. The slightly yellowed quality evokes a document that has been read many times.
- **Mortar Gray** (`#9c9384`): Secondary text, metadata, labels, muted copy. Warm gray — aged, not sterile.

### Named Rules
**The One Channel Rule.** Each accent color is the sole identifier for its content category: Yellow = Writing, Cyan = Frontend, Green = Deploy/Live, Violet = AI, Red = Alert. Do not reassign. Do not mix channels on a single surface. The color is the category. Its scarcity is its meaning.

**The Carbon Floor Rule.** The background is always Carbon Black (`#171717`). Never `#000000` — pure black feels valueless. Never dark blue or dark teal — the domain reflex is the enemy. The floor must not have a recognizable genre.

## 3. Typography

**Display Font:** Arial Black / Archivo Black (Impact as last resort, sans-serif)
**Body Font:** Avenir Next / Segoe UI / PingFang SC / Hiragino Sans GB (system stack)
**Label / Mono Font:** SFMono-Regular / JetBrains Mono / Consolas (monospace)

**Character:** Display type is blunt-force — no curvature, compressed tracking, line-height under 1. It prints like a rubber stamp. Body type is neutral and fast: system-font only, handles Chinese/English without font-switching artifacts. Mono is everywhere metadata lives — dates, labels, nav items, breadcrumbs — it signals "this is data, not prose."

### Hierarchy
- **Display** (900 weight, `clamp(3rem, 9vw, 6.5rem)`, line-height 0.88, tracking 0.02em): Hero titles and page-level identifiers. Uppercase. One instance maximum per screen.
- **Headline** (900 weight, `clamp(1.7rem, 4vw, 2.8rem)`, line-height 0.95, tracking 0.02em): Section headings. Uppercase.
- **Title** (900 weight, `clamp(1.2rem, 2vw, 1.7rem)`, line-height 1.05): Card headings, post titles. Uppercase.
- **Body** (400 weight, 1rem, line-height 1.7): Prose and descriptions. Max 44rem line length (approximately 65ch). System font only — never a loaded web font.
- **Label** (700 weight, 0.78rem, tracking 0.08em, uppercase, monospace): All metadata — dates, tags, nav links, breadcrumbs, kickers, stat labels. The operational readout voice.

### Named Rules
**The Uppercase Display Rule.** Any text using the display font (Arial Black / Archivo Black) is uppercase. Sentence-case in the display font is a mistake, not a choice.

**The Body Stack Rule.** Body text must never load a remote font. The system stack renders instantly across platforms and handles bilingual content correctly without Chinese-character fallback artifacts.

**The Mono Label Rule.** Any text smaller than 0.85rem carrying metadata is monospace and uppercase. Lowercase proportional type at label scale signals a decision that was not made.

## 4. Elevation

No soft shadows exist in this system. The only elevation mechanism is the **hard offset shadow**: `box-shadow: Npx Npx 0 [color]`, zero blur radius. The shadow is a displaced color block — it reads like a stamp offset or a risograph misprint, not a floating card. Documents stacked; papers pressed; corners visible.

Surfaces are flat at rest. Interaction triggers the offset. The hover pattern is consistent across the entire system: `transform: translate(-2px, -2px)` while `box-shadow` expands — the element appears to physically lift while its shadow stays behind.

### Shadow Vocabulary
- **Hover lift** (`transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 currentColor; transition: 120ms ease`): Nav links, post cards, category cards, archive items, buttons. Uses `currentColor` so elements inherit their own shadow color.
- **Accent offset** (`box-shadow: 6px 6px 0 0 var(--yellow/cyan/violet)`): Work cards, stat boxes, dossier asset panels. Color hardcoded to the content category's assigned signal.
- **Neutral offset** (`box-shadow: 8px 8px 0 0 rgba(255,255,255,0.05)`): Default surface elevation (`--shadow-md`) for editorial cards and panels. Nearly invisible — a tonal separator only.
- **Dossier glow** (`box-shadow: 8px 8px 0 rgba(34, 255, 136, 0.1)`): Dossier panels only. Phosphor green at 10% opacity — atmospheric, not structural.

### Named Rules
**The No-Blur Rule.** A `box-shadow` with non-zero blur radius in a UI elevation role is prohibited. If it looks like a soft shadow, it is wrong. The only permitted blur is `filter: blur()` on purely decorative atmospheric pseudo-elements — never on interactive surfaces.

**The Flat-at-Rest Rule.** No surface has a persistent elevation shadow in its default rest state, except work cards and stat boxes with named accent offsets. Everything else is flat until interaction.

## 5. Components

### Buttons
A button is a command, not an invitation. Zero radius. Uppercase monospace label. Interaction has weight.
- **Shape:** 0px radius — square corners, always.
- **Primary:** Wanted Yellow (`#ffd43b`) background, Deep Void (`#111111`) text. Padding `0.85rem 1.05rem`. Mono font, 0.84rem, 700 weight, 0.06em tracking, uppercase.
- **Hover / Focus:** `transform: translate(-2px, -2px); box-shadow: 6px 6px 0 0 currentColor` at 120ms ease.
- **Secondary / Ghost:** Panel Strong (`#1d1d1d`) background, Aged Ivory text. Same shape and hover behavior.
- **Active nav state:** Full background swap to Wanted Yellow, text to Deep Void — not an underline, not a dot.

### Work Cards
The primary content unit on the Lab homepage. Flat at rest, accent-offset as a persistent named state.
- **Corner Style:** 0px radius.
- **Background:** Deep Void (`#111111`).
- **Shadow Strategy:** Hardcoded accent offset — Yellow for Writing, Cyan for Frontend, Violet for AI. On hover: `translate(-2px, -2px)` and shadow grows to `8px 8px`.
- **Border:** `1px solid #333333` at rest.
- **Internal Padding:** `1.35rem` standard.

### Navigation
Monospace uppercase at 0.78rem, 0.08em tracking. Each link is a small bordered button (`border: 1px solid #333333; background: #111111`). Active state: full Wanted Yellow fill. Hover: translate + currentColor shadow. Reads as a mission menu, not a navigation bar.

### Badges / Kickers
Inline-flex, `border: 1px solid #333333`, signal color at 10–12% opacity background, `box-shadow: 3px 3px 0 0 #333333`. Classification markers at label scale. One accent color per variant.

### Terminal Window (Signature Component)
Dark panel (`#0c0c0c` body, `#151515` toolbar). Traffic-light stop indicators as **square** blocks — not circles. Red/Yellow/Green correspond to Alert Red, Wanted Yellow, Phosphor Green. Monospace body at `0.86rem`, phosphor-green tint (`#d6f7df`), line-height 1.8. Used for running-system demonstrations and live technical content.

### Dossier Panels (Signature Component)
Full sub-theme for the homepage dossier section: dark panels (`#0f1311`) with phosphor-green glow shadows, scan-line animations on pseudo-elements, corner registration marks, blinking cursor, and hover-to-reveal redacted fields. The visual apex of the Wanted Dossier metaphor. Never used in Howto/Tactics or editorial surfaces.

### Sub-theme: Tactics Manual
`src/howto/styles.css` defines a fully separate skin — bone-paper warm background (`#e6dcc4`), terracotta accent (`#c8501e`), dark ink text (`#241d13`), IBM Plex Mono body. Same structural rules (zero radius, hard offset shadow) but completely inverted atmospheric register: archival document against dark terminal. Treat as a sibling system, not a variant of this one.

## 6. Do's and Don'ts

### Do:
- **Do** use `box-shadow: Npx Npx 0 [color]` (zero blur) for every elevation effect — hard offset only.
- **Do** assign accent colors by content category and hold the assignment: Yellow = Writing, Cyan = Frontend, Green = Deploy, Violet = AI, Red = Alert.
- **Do** use monospace uppercase for every label, date, kicker, breadcrumb, and nav link without exception.
- **Do** compress display headings to `line-height: 0.88–0.95` and uppercase. The stamp-like compression is the identity.
- **Do** apply `translate(-2px, -2px)` + shadow expansion at 120ms ease as the universal hover pattern.
- **Do** maintain the body-level grid background (`rgba(255,255,255,0.035)` lines at 24px). It grounds the surface in a data-space register.
- **Do** keep total accent coverage under 10% per screen. Carbon and iron dominate — color is signal, not decoration.
- **Do** use `999px` border-radius exclusively for pill tags. The contrast against zero-radius surfaces makes pills legible as a different affordance.
- **Do** reach for intelligence-file formats (field records, classified manifests, redacted entries, capability lists) before reaching for terminal or hardware formats. Ask: "Would this appear in an intelligence report or a hardware manual?" The report wins.

### Don't:
- **Don't** use rounded corners (2px, 4px, 8px, `rounded-lg`) anywhere except `999px` pills. Zero-radius is non-negotiable.
- **Don't** use glassmorphism (`backdrop-filter: blur` on card or overlay surfaces). Explicitly rejected.
- **Don't** use soft blurred drop shadows. A `box-shadow` with non-zero blur in any UI elevation role is wrong.
- **Don't** use gradient text (`background-clip: text` with a gradient fill). All text is a single solid color.
- **Don't** build hero-metric templates: big number, supporting stats, gradient accent. Commercial SaaS cliché.
- **Don't** use `#000000` as any background. The floor is Carbon Black (`#171717`).
- **Don't** mix multiple accent colors on a single surface. One module, one channel.
- **Don't** load a web font for body or label text. The system stack handles bilingual content correctly and loads instantly.
- **Don't** use Dossier sub-theme components (scan panels, registration marks, blinking cursors, redacted fields) outside the dedicated dossier/about section.
- **Don't** make the design "feel dark" through genre reflex — dark blue + electric neon reads as crypto; dark green reads as finance terminal. Carbon Black with warm ivory is a deliberate departure from those domain reflexes.
- **Don't** let terminal or hardware aesthetics structurally replace the dossier form. PCB chip grids, motherboard slot layouts, and pixel-art circuit borders are tools — the moment a section reads as a circuit board schematic rather than a classified document, it has lost its identity.
