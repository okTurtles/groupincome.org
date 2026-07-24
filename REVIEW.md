# Code Review

**Base**: `master`
**Head**: `sebin/task/#103-localize-the-website`
**Date**: 2026-07-24

Scope: 71 changed files (website localization — `[locale]` routing, i18n utilities, translation tables, legacy-URL redirects, v2.8 blog post, CI workflow rework). The diff was ~789KB, so it was reviewed file-by-file with the staging build (`npm run build`) used to verify findings against actual output.

---

## 1. 🔴 Legacy `/blog` and `/tag/<tag>` URLs 404 after deploy; `/tag` redirects to a page that doesn't exist

- [ ] Addressed
- [ ] Dismissed

The old site (current prod) serves real pages at `/blog`, `/blog/2`…`/blog/5`, and `/tag/<tag>` (e.g. `/tag/voting`). This branch moves them all under `[locale]/`, and `src/pages/[redirect].astro` was added to redirect legacy single-segment URLs — but its page list covers neither `blog` nor the per-tag URLs:

- `src/pages/[redirect].astro:2-12` — the list has `about-us`, `donate`, `faq`, …, `tag`, but **no `blog`**. Verified in the build output: `dist/blog/` does not exist, so every existing bookmark/backlink/search-index entry for `/blog` and `/blog/N` becomes a 404 after deploy.
- `src/pages/[redirect].astro:11` — the `'tag'` entry redirects `/tag` → `/en/tag`, but there is no `/en/tag` index route (`src/pages/[locale]/tag/[tag].astro` only generates `/en/tag/<tag>`). Verified: `dist/en/tag/index.html` is not generated, so this redirect lands on a 404.
- Old per-tag URLs (`/tag/voting`, `/tag/hackathon`, `/tag/progress`, `/tag/prototype`) are two segments and can't be matched by `[redirect].astro` at all — also 404 after deploy.

These URLs are in the currently-submitted sitemap and in the wild, so this undercuts the branch's own goal of preserving legacy URLs (commit `9ca1a23 "set up redirects for more pages"`).

Suggested fix — mirror the pattern already used by `src/pages/hiring/[job].astro`; add two redirect stubs and drop the broken `'tag'` entry from `[redirect].astro`:

```astro
// src/pages/blog/[...page].astro
---
import { sortedPosts } from '@/utils/helpers'
export async function getStaticPaths({ paginate }: any) {
  const posts = sortedPosts(import.meta.glob('../../posts/*.{md,mdx}', { eager: true }))
  return paginate(posts, { pageSize: 4 })
}
const { page } = Astro.props
const suffix = page.currentPage > 1 ? `/${page.currentPage}` : ''
const redirectUrl = `${import.meta.env.BASE_URL}en/blog${suffix}`
---
<meta http-equiv="refresh" content={'0;url=' + redirectUrl} />
```

```astro
// src/pages/tag/[tag].astro
---
import { sortedPosts, uniq } from '@/utils/helpers.js'
export async function getStaticPaths () {
  const allPosts = sortedPosts(import.meta.glob('../../posts/*.{md,mdx}', { eager: true }))
  const uniqueTags = uniq(allPosts.map((post: any) => post.frontmatter?.tags || []).flat())
  return uniqueTags.map((tag: string) => ({ params: { tag } }))
}
const redirectUrl = `${import.meta.env.BASE_URL}en/tag/${Astro.params.tag}`
---
<meta http-equiv="refresh" content={'0;url=' + redirectUrl} />
```

## 2. 🟡 Blog pagination prev/next arrows double-prefix the base path on staging

- [ ] Addressed
- [ ] Dismissed

`src/pages/[locale]/blog/[...page].astro:41` and `:47` pass Astro's `page.url.prev` / `page.url.next` through `resolvePath()`:

```astro
<a class={ url.prev ? '' : 'inactive' } href={url.prev ? resolvePath(url.prev) : null}>
```

In Astro 5, `page.url.*` values **already include the configured `base`**. `resolvePath()` then prepends `import.meta.env.BASE_URL` a second time. Verified in the staging build (`base: '/groupincome.org/'`):

```
dist/en/blog/index.html   → href="/groupincome.org/groupincome.org/en/blog/2"
dist/en/blog/2/index.html → href="/groupincome.org/groupincome.org/en/blog" (prev)
```

The prev/next arrows 404 on the staging deployment (the environment `.github/workflows/astro.yml` actually publishes). Production (`base: '/'`) is unaffected, which is why this is easy to miss locally. The numbered page links on line 45 are built manually and are correct.

Fix — use the URLs as-is:

```astro
<a class={ url.prev ? '' : 'inactive' } href={url.prev ?? null}>
...
<a href={url.next ?? null} class={ url.next ? '' : 'inactive' }>
```

## 3. 🟡 Both full translation tables (~150 KB) ship in the client JS on every page, including English ones

- [ ] Addressed
- [ ] Dismissed

`src/i18n/utils.ts:2-3` statically imports `korean.json` and `french.json`, and `src/_app.ts:3` imports `useTranslation` — `_app.ts` is the Vue app entry for **every** hydrated island (Header/Footer are `client:load` on all pages via `DefaultLayout.astro`).

Verified in the build: the shared chunk `dist/_astro/_plugin-vue_export-helper.*.js` is **212 KB** and contains both the Korean and French tables (found `시작하기` and `Aidez-nous` inside it); it is imported by `Header.*.js`, `Footer.*.js`, and every island chunk, so a visitor to the English homepage downloads both complete translation tables they will never use.

Since the locale is fixed per page (`document.body.dataset.locale`), only the active locale's table is ever needed client-side — and for `en`, none at all. One approach that keeps `useTranslation()` synchronous is a build-time-split table module:

```ts
// utils.ts — replace the static imports with per-locale entry modules
// e.g. src/i18n/tables/ko.ts → `export { default } from '../../../strings/korean.json'`
// then in _app.ts, top-level await the active locale's table before createApp,
// or accept async init: const table = locale !== 'en'
//   ? (await import(`./tables/${locale}.ts`)).default : null
```

(Any equivalent approach works — the point is that `en` pages should ship zero table bytes and `ko`/`fr` pages only their own.)

## 4. ⚪️ Build-time locale passing relies on mutable `globalThis` state and single-threaded builds

- [ ] Addressed
- [ ] Dismissed

`src/middleware.ts:12` writes `(globalThis as any).giVueLocale` per request/page-render, and `src/_app.ts:11` reads it during SSR of Vue islands. This works today only because Astro's static build renders pages with `build.concurrency: 1` (the default). If anyone enables Astro 5's `build.concurrency > 1` for faster builds, locales will bleed between concurrently-rendered pages and islands will render in the wrong language nondeterministically — exactly the class of bug the comment on `src/middleware.ts:14-16` describes already having fought once. Worth a loud comment in `astro.config.mjs` and/or `AGENTS.md` ("never enable build.concurrency"), since nothing in the code prevents it.

## 5. ⚪️ `client:load` is a no-op attribute inside a Vue SFC template

- [ ] Addressed
- [ ] Dismissed

`src/components/Navigation.vue:19`:

```html
<LanguageSwitch v-if="!isBlogpost" class="c-language-switch" client:load />
```

`client:*` are Astro island directives; inside a Vue component template this is just a fallthrough attribute rendered onto the DOM (`client:load="true"` on the wrapper div). LanguageSwitch already hydrates as part of Navigation. Remove the attribute — it misleads readers into thinking it does something.

## 6. ⚪️ FAQ answers lost their paragraph breaks: `<br><br>` became a single `{br_}`

- [ ] Addressed
- [ ] Dismissed

In `src/components/FAQ.vue` several answers that had a blank line between paragraphs on master (`<br><br>`) now use a single `{br_}` (LTags renders it as one `<br/>`), e.g. `src/components/FAQ.vue:95` ("Who can be part of a group?") and `:103` ("What if there are more monetary pledges…"). Elsewhere in the codebase double breaks are expressed as `{br_}{br_}` (see the FAQ decentralization string in the translation tables), so this looks like an unintentional formatting regression rather than a deliberate style change. If intended, ignore; otherwise use `{br_}{br_}` in the key and regenerate the tables.

## 7. ⚪️ `typeDisplayMap` renders nothing for unknown job types

- [ ] Addressed
- [ ] Dismissed

`src/layouts/JobPost.astro:18-20` maps only `"remote"`, and `:43` renders `{typeDisplayMap[job.frontmatter.type]}`. All six current job posts are `type: "remote"`, but a future post with a new type (`"part-time"`, …) silently renders an empty badge instead of the raw value like master did. Cheap insurance:

```astro
<span class="c-job-type">{typeDisplayMap[job.frontmatter.type] ?? job.frontmatter.type}</span>
```

## 8. ⚪️ Dead declarations in `App.Locals`

- [ ] Addressed
- [ ] Dismissed

`src/env.d.ts:6,9` declare `title?: string` and `L?: TranslationFn` on `App.Locals`, but nothing ever sets or reads either (commit `593262e` established that functions can't be passed through `Astro.locals`, and `title` has no usages). Dropping them keeps the type honest about what middleware actually provides (`locale`, `isBlogpost`).

## 9. ⚪️ Sitemap lists the meta-refresh redirect stubs and has no hreflang alternates

- [ ] Addressed
- [ ] Dismissed

The generated sitemap includes the redirect-stub URLs (`/`, `/about-us/`, `/donate/`, `/tag/`, `/hiring/`, …) alongside their real `/en/...` counterparts — search engines are being told to index pages whose only content is `<meta http-equiv="refresh">`. The `@astrojs/sitemap` integration supports both a `filter` option (exclude the stubs) and an `i18n` option (emit `hreflang` alternates for `/en/`, `/ko/`, `/fr/` variants), which would also help search engines serve the right locale:

```js
sitemap({
  filter: (page) => !/\/(about-us|donate|faq|get-started|other-ways-to-support|privacy-policy|terms-and-conditions|tag|hiring)\/$/.test(new URL(page).pathname.replace(/^\/groupincome\.org/, '')) || /\/(en|ko|fr)\//.test(page),
  i18n: { defaultLocale: 'en', locales: { en: 'en', ko: 'ko', fr: 'fr' } }
})
```

(Adjust the filter to your taste — the regex above is illustrative.)

---

### Verified-good (no action needed)

Things specifically checked that hold up: translation tables have full key parity (277/277/277) with zero `{placeholder}` mismatches between keys and translated values; the `is:raw` + `LTags` interpolation paths render correctly in built HTML for `en`/`ko`/`fr` (Servers card, tag page header, FAQ curly-quote keys); `v-href.locale` / `resolvePath(…, locale)` coverage is complete (no remaining raw internal links); the blogpost pages correctly fall back to English (`data-locale` absent → identity translation) and hide the language switch; and the double-base bug does **not** affect production builds.
