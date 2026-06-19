---
---
# Astro Blog Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current Jekyll-based GitHub Pages site with an Astro blog and reorganize article content into formal `posts` and `drafts` collections across `ai`, `cs`, `life`, and `english`.

**Architecture:** Build a static Astro site with typed content collections, migrate publishable Markdown into `src/content/posts` and unfinished material into `src/content/drafts`, move article assets into `public`, and replace the current GitHub Pages workflow with an Astro build and deploy flow. Keep code samples and non-blog resources outside the content collections.

**Tech Stack:** Astro, TypeScript, Markdown content collections, GitHub Actions, GitHub Pages

---

### Task 1: Scaffold Astro project files

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `astro.config.mjs`
- Create: `.npmrc`
- Modify: `.gitignore`

- [ ] Add the Astro package manifest, TypeScript config, Astro config, and npm settings needed for a static GitHub Pages build.
- [ ] Update `.gitignore` so Astro build artifacts and dependency directories are ignored.
- [ ] Install dependencies so the repo can run `astro dev` and `astro build`.

### Task 2: Create the Astro app shell

**Files:**
- Create: `src/env.d.ts`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/styles/global.css`

- [ ] Create the base layout and shared shell for a content-first blog.
- [ ] Build the global visual system and navigation for `ai`, `cs`, `life`, and `english`.
- [ ] Wire global styles into the base layout.

### Task 3: Define content collections and helpers

**Files:**
- Create: `src/content/config.ts`
- Create: `src/lib/content.ts`

- [ ] Define `posts` and `drafts` collections with a shared schema for title, description, category, tags, dates, slug, and cover metadata.
- [ ] Add helper functions to group posts by category, sort by date, and build archive/category views.

### Task 4: Create Astro pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/archive.astro`
- Create: `src/pages/posts/[...slug].astro`
- Create: `src/pages/ai/index.astro`
- Create: `src/pages/cs/index.astro`
- Create: `src/pages/life/index.astro`
- Create: `src/pages/english/index.astro`

- [ ] Build the homepage with a strong visual hero, category entry points, featured writing, and recent posts.
- [ ] Build category listing pages for the four domains.
- [ ] Build the article detail route and archive page from the `posts` collection.

### Task 5: Migrate content into formal collections

**Files:**
- Create: `src/content/posts/ai/**`
- Create: `src/content/drafts/ai/**`
- Create: `src/content/posts/cs/**`
- Create: `src/content/drafts/cs/**`
- Create: `src/content/posts/life/**`
- Create: `src/content/drafts/life/**`
- Create: `src/content/posts/english/**`
- Create: `src/content/drafts/english/**`
- Modify: `articles-draft/**` during migration, then remove it from the final app path

- [ ] Move publish-ready AI Markdown into `src/content/posts/ai`.
- [ ] Move outlines, draft files, and clearly unfinished AI material into `src/content/drafts/ai`.
- [ ] Create empty `cs`, `life`, and `english` collection directories so the structure is complete from day one.
- [ ] Add or normalize frontmatter on migrated articles so Astro can index them.

### Task 6: Migrate and normalize blog assets

**Files:**
- Create: `public/images/**`
- Modify: migrated Markdown image paths as needed

- [ ] Move locally referenced article images into `public/images` under stable paths.
- [ ] Update Markdown image references that should resolve through Astro/GitHub Pages.
- [ ] Leave external COS image URLs untouched unless a local move is needed for correctness.

### Task 7: Replace Jekyll entrypoints and docs

**Files:**
- Modify: `README.md`
- Modify: `CODEBUDDY.md`
- Modify: `.github/workflows/deploy.yml`
- Remove or stop relying on: `_config.yml`, `_layouts/**`, `index.html`, `_articles/**`, `_site/**`

- [ ] Update repo docs to describe Astro development and content locations.
- [ ] Replace the GitHub Pages workflow with Astro install, build, and deploy steps.
- [ ] Remove obsolete Jekyll-facing app entrypoints from the active site path.

### Task 8: Verify the migration

**Files:**
- Verify: the full repo state

- [ ] Run `npm install`.
- [ ] Run `npm run build`.
- [ ] Check that category pages and article routes are generated from migrated content.
- [ ] Confirm the repo is ready for GitHub Pages static deployment with Astro output.
