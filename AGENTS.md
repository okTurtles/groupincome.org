# AGENTS.md — Group Income Website

## Project Overview

This is the **marketing website** for [Group Income](https://groupincome.org), not the app itself. It's a static site built with **Astro 5** + **Vue 3** + **SCSS**, deployed to GitHub Pages. The app lives in a separate repository (`okTurtles/group-income`).

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server (default `localhost:3000`) |
| `npm run build` | Build for staging (`BUILD_TARGET=staging` → `okturtles.github.io/groupincome.org/`) |
| `npm run build:prod` | Build for production (`BUILD_TARGET=production` → `groupincome.org`) |
| `npm run preview` | Preview staging build locally |
| `npm run preview:prod` | Preview production build locally |

No test suite or linter is configured in this project.

## Architecture

### Build Targets & Base URL

The `BUILD_TARGET` env var controls `site` and `base` in `astro.config.mjs`:

- **staging**: `site: https://okturtles.github.io`, `base: /groupincome.org/`
- **production**: `site: https://groupincome.org`, `base: /`

This matters because all asset paths must go through `resolvePath()` (see below).

### Hybrid Astro + Vue

- **Astro** handles pages, layouts, routing, and markdown/mdx content
- **Vue 3** powers interactive island components (Header, Footer, Navigation, HomeAnimation, etc.)
- Vue components are hydrated with `client:load` or `client:only="vue"` directives
- The Vue app entry point is `src/_app.ts` (registered via `@astrojs/vue` integration), which sets up custom directives and mixins
- State management uses **nanostores** (`src/store.ts`) — atoms for navigation open/close, fundraiser banner, and a modal stack

### Path Aliases

`@/*` maps to `src/*` in both `tsconfig.json` and Astro's resolution. Use `@/` imports throughout.

### Critical: `resolvePath()` for Asset URLs

`src/utils/helpers.js` → `resolvePath()` prepends `import.meta.env.BASE_URL` to relative paths. **All internal links and asset references in Vue components must use `resolvePath()`** or the custom `v-src`/`v-href`/`v-srcset` directives (registered in `_app.ts`). Raw `/path` strings will break on staging because of the `/groupincome.org/` base prefix.

### Layout System

- **`DefaultLayout.astro`** — wraps all pages: BaseHead → Header → `<slot>` → Footer, plus Matomo analytics
- **`BlogPost.astro`** — wraps individual blog posts with hero image + metadata
- **`JobPost.astro`** — wraps job listings with sidebar navigation of open positions

## Content Model

### Blog Posts (`src/posts/*.{md,mdx}`)

Frontmatter fields (see existing posts for reference):

```yaml
title: string
description: string
author: string         # default: 'Greg Slepak'
date: string           # human-readable, e.g. 'November 13, 2025'
isoDate: string        # ISO 8601 for sorting
pubDate: string        # ISO 8601 duplicate of isoDate
image: string          # absolute path from public/, e.g. '/wp-content/uploads/...'
layout: "../layouts/BlogPost.astro"
permalink: /YYYY/MM/slug/
categories: [...]
tags: [...]            # used for tag filtering at /tag/[tag]
draft: true            # if present, post is excluded from builds
```

Posts are collected via `import.meta.glob('../posts/*.{md,mdx}', { eager: true })`, sorted by `pubDate` descending using `sortedPosts()` helper. Blog listing is paginated at 4 posts per page (`src/pages/blog/[...page].astro`). Individual blog post routes come from `src/pages/[...blog].astro`.

### News Posts (`src/posts/news/*.md`)

Simpler frontmatter — `title` and `createdAt` only. Exposed as JSON at `/news.json` endpoint (`src/pages/news.json.js`) with CORS enabled, consumed by the Group Income app for in-app update notifications.

### Job Posts (`src/jobs/*.md`)

Files prefixed with `_` (e.g. `_fundraiser.md`) are hidden from the jobs listing. Non-prefixed files appear at `/hiring/[job-slug]/`.

Frontmatter:
```yaml
title: string
pubDate: string
type: string           # e.g. "remote"
permalink: /slug/
layout: "../layouts/JobPost.astro"
```

### Other Endpoints

- `/rss.xml` — RSS feed via `@astrojs/rss`
- `/sitemap` — auto-generated via `@astrojs/sitemap`
- `/tags/[tag]` — tag-based blog post filtering

## Styling

### SCSS Architecture

Entry: `src/styles/main.scss` — imports partials in order:
`reset → misc → theme → typography → utilities → base → layout → transitions → icons` then `components/*`.

**Key file**: `src/styles/_variables.scss` forwards `_font_variables`, `_colors`, and `_mixins`. Import it as:

```scss
@use "../styles/variables" as *;
// or from deeper paths:
@use "../../styles/variables" as *;
```

The `_colors.scss` file defines CSS custom properties (e.g. `$primary_0: var(--primary_0)`) — actual color values come from `_theme.scss`.

### Responsive Breakpoints

Defined in `_mixins.scss`:
- **phone**: `max-width: 768px`
- **tablet**: `min-width: 769px`
- **touch**: `max-width: 1199px`
- **desktop**: `min-width: 1200px`
- **tall**: `min-height: 1000px`
- `$maxDesktop: 1120px`

Use mixins: `@include phone { }`, `@include tablet { }`, `@include desktop { }`, `@include until($tablet) { }`, `@include from($desktop) { }`.

### Layout Grid Classes

- `.l-1-2` — two-column grid (1fr 1fr, adjusts to 1.5fr 2fr on tablet+)
- `.l-1` — single column, max-width 45.625rem
- `.l-1-1-1` — three-column grid (responsive: 1 → 2 → 3 columns)

### CSS Naming Conventions

Component-scoped styles use BEM-like `c-` prefix for classes (e.g. `.c-header`, `.c-navbar`, `.c-article-image`). Layout classes use `l-` prefix.

### SCSS in Vue Components

Vue `<style lang="scss" scoped>` blocks use `@use "../styles/variables" as *` at the top. For styles that need to affect slot content (transcluded from Astro), use `<style lang="scss" is:global>` instead of scoped — see `[...blog].astro` and `JobPost.astro` for examples.

## Deployment

- **Platform**: GitHub Pages
- **Branch**: `master` (not `main`)
- **CI**: `.github/workflows/astro.yml` — builds with Node 20, uses `withastro/action`
- **Legacy**: `deploy.yml` exists but appears superseded by `astro.yml`

## Gotchas

1. **Never use raw `/` paths for internal links in Vue components** — always use `resolvePath()` or the `v-src`/`v-href` directives. The staging deploy uses a subdirectory base path.
2. **`import.meta.glob` paths are relative to the file calling it** — different page files use different relative depths (e.g. `'../../posts/*.{md,mdx}'` vs `'../posts/*.{md,mdx}'`).
3. **Blog post permalinks** must start and end with `/` — the `getStaticPaths()` functions strip these via `.slice(1).slice(0, -1)` to create URL params.
4. **`_variables.scss` cannot contain CSS classes** — only Sass variables, mixins, functions, and `@forward` rules. This file is included in Vue component `<style>` blocks, and any classes would be duplicated across components.
5. **`helpers.js` is plain JavaScript** (not TypeScript) — uses `'use strict'` and CommonJS-compatible `export function` syntax.
6. **Footer.vue uses Options API** while most other Vue components use `<script setup>` (Composition API) — both patterns coexist.
7. **Blog post images** historically reference `/wp-content/uploads/...` paths (legacy from WordPress). New posts can use any path under `public/`.
8. **The newsletter form** in Footer.vue blacklists Gmail/Google addresses and shows a warning modal instead — this is intentional.
9. **`waitForElement()`** in helpers.js exists because `<script>` tags in `.astro` files sometimes execute before DOM rendering completes — use it when querying DOM elements from Astro page scripts.
