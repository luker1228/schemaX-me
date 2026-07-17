---
name: schemaX Light Tactics
description: A warm paper-like Chinese technical archive with tactile yellow actions and one shared manual UI.
colors:
  paper: "#f6efdf"
  paper-soft: "#efe7d6"
  ink: "#241d13"
  ink-muted: "#6b5c42"
  border: "#241d13"
  command-yellow: "#ffd43b"
  accent-orange: "#c8501e"
  accent-blue: "#00a8f8"
  accent-green: "#00c870"
  accent-magenta: "#d030a8"
typography:
  display:
    fontFamily: '"Arial Black", "Archivo Black", Impact, "Helvetica Neue", sans-serif'
    fontSize: "clamp(3rem, 9vw, 6.5rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "0.02em"
  headline:
    fontFamily: '"Arial Black", "Archivo Black", Impact, "Helvetica Neue", sans-serif'
    fontSize: "clamp(1.7rem, 4vw, 2.8rem)"
    fontWeight: 900
    lineHeight: 0.95
  body:
    fontFamily: '"Avenir Next", "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif'
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
    backgroundColor: "{colors.command-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.05rem"
  button-primary-hover:
    backgroundColor: "{colors.command-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.05rem"
  nav-action:
    backgroundColor: "{colors.command-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.8rem"
  manual-card:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "{spacing.md}"
---

# Design System: schemaX Light Tactics

## 1. Overview

**Creative North Star: “The Open Field Manual”**

schemaX is now a warm, light technical archive: readable in daylight, tactile like a printed field manual, and precise enough for code and implementation notes. The public site, blog, and all howto manuals share the same paper surface, square geometry, dark ink, and command-yellow actions. A manual may change its content and accent signal, but not its structural language.

The old dark dossier skin is retired. New screens must not introduce a second visual system, a separate dark header, or a parallel card vocabulary. Reuse the shared Header, brand identity, action buttons, hero, lesson cards, and FAQ patterns before adding a new component.

**Key Characteristics:**
- Warm light background with dark brown ink and crisp 1px/2px borders.
- Square corners everywhere except intentional pill tags.
- Yellow is the primary action signal; other accents identify content categories.
- Hard offset shadows provide tactile depth; no soft decorative elevation.
- Chinese body copy uses a system-safe sans stack; metadata uses monospace.

## 2. Colors

The palette is paper-first and high-contrast: warm neutrals carry the page, while saturated accents mark actions and categories.

### Primary
- **Command Yellow** (`#ffd43b`): Primary buttons, active actions, and important navigation targets.

### Secondary
- **Field Orange** (`#c8501e`): Manual accent and editorial emphasis.
- **Signal Blue** (`#00a8f8`): Frontend and instructional highlights.

### Tertiary
- **Running Green** (`#00c870`): Live states and successful outcomes.
- **Note Magenta** (`#d030a8`): Secondary teaching examples and visual annotations.

### Neutral
- **Warm Paper** (`#f6efdf`): Page background.
- **Soft Paper** (`#efe7d6`): Cards, previews, and secondary surfaces.
- **Dark Ink** (`#241d13`): Text, borders, and hard shadows.
- **Muted Ink** (`#6b5c42`): Descriptions, metadata, and supporting copy.

### Named Rules
**The Paper-First Rule.** Light paper surfaces are the default for every public, blog, and howto page. Do not bring back the retired dark dossier background for new screens.

**The One Signal Rule.** Use command yellow for actions. Use one additional accent only when it carries a clear content category.

## 3. Typography

**Display Font:** Arial Black / Archivo Black / Impact fallback
**Body Font:** Avenir Next / Segoe UI / PingFang SC / Hiragino Sans GB / Microsoft YaHei
**Label/Mono Font:** SFMono-Regular / JetBrains Mono / Consolas

**Character:** Display type is compact and declarative, body text is calm and readable, and labels feel like catalog metadata. The system must preserve Chinese and English without layout artifacts.

### Hierarchy
- **Display** (900 weight, `clamp(3rem, 9vw, 6.5rem)`, line-height 0.88): Page heroes and major identifiers.
- **Headline** (900 weight, `clamp(1.7rem, 4vw, 2.8rem)`, line-height 0.95): Section titles.
- **Title** (700–900 weight, `clamp(1.2rem, 2vw, 1.7rem)`): Lesson and card titles.
- **Body** (400 weight, 1rem, line-height 1.7): Prose, capped around 65–75ch.
- **Label** (700 weight, 0.78rem, 0.08em tracking, uppercase where metadata): Navigation, kickers, tags, and codes.

### Named Rules
**The Shared Brand Rule.** `schemaX` and `绝密计划 · classified` are rendered by `BrandIdentity.astro` and use the same display family across every header.

## 4. Elevation

Depth is tactile and structural, not atmospheric. Surfaces are flat at rest. Interactive elements use crisp offset shadows with zero blur, and hover states move downward to read as a physical press.

### Shadow Vocabulary
- **Action shadow** (`box-shadow: 4px 4px 0 #241d13`): Header actions and primary buttons at rest.
- **Pressed action** (`box-shadow: 2px 2px 0 #241d13; transform: translate(2px, 2px)`): Hover and focus state for actions.
- **Logo hover** (`box-shadow: 4px 4px 0 #241d13; transform: rotate(4deg)`): Brand identity interaction only.

### Named Rules
**The No-Blur Rule.** Do not use blurred shadows for interface elevation.

## 5. Components

### Buttons
- **Shape:** Square corners (`0px`).
- **Primary:** Command yellow, dark ink, monospace label, `0.5rem 0.8rem` padding, 1px border, 4px hard shadow.
- **Hover / Focus:** Move down 2px and reduce the shadow to 2px, preserving the yellow action signal.

### Cards / Containers
- **Corner Style:** Square (`0px`).
- **Background:** Warm paper or soft paper, never a dark parallel skin.
- **Shadow Strategy:** Hard offset only where the card is interactive or explicitly tactile.
- **Border:** Dark ink, usually 1px or 2px.
- **Internal Padding:** Use the shared spacing scale, commonly `1.35rem`.

### Navigation
Use `ManualHeader.astro` for all public and howto headers. Use `header-actions.css` for GitHub and 战术手册 actions, and `brand.css` for the shared Logo and brand identity. Navigation labels remain compact monospace and square.

### Manual Lesson UI
New manuals must reuse the `/howto/frontend/` structure and class vocabulary: `frontend-manual-page`, `hero`, `lesson-card-grid`, `lesson-card`, and `faq-grid`. Only lesson content and navigation data should vary.

## 6. Do's and Don'ts

### Do:
- **Do** keep new pages on the warm light paper surface.
- **Do** reuse `BrandIdentity.astro`, `ManualHeader.astro`, `brand.css`, and `header-actions.css`.
- **Do** use command yellow for primary actions and hard square shadows for tactile feedback.
- **Do** reuse the frontend manual UI for every new howto manual.
- **Do** keep body text readable at 65–75ch and use system fonts for bilingual content.

### Don't:
- **Don't** reintroduce the retired dark dossier skin for public, blog, or howto screens.
- **Don't** create a second Header, brand identity, or action-button implementation.
- **Don't** create a parallel manual layout when `frontend-manual-page` and its lesson classes fit.
- **Don't** use blurred shadows, gradient text, glassmorphism, or rounded SaaS-style cards.
- **Don't** use pure black or pure white as the primary page surface.
