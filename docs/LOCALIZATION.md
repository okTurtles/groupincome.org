# Localization

The website supports localization, and it can be extended with as many languages as we want.
Below are the instructions on how to add support for a new language.

# Adding a language (Spanish example)

## 1. Creating the translation table

### 1-1. Add a `strings/{language}.strings` file and translate it

First, create `strings/spanish.strings` by copying the contents of `english.strings`, either manually or with a shell command like:

```sh
cp strings/english.strings strings/spanish.strings
```

Then translate the **right-hand side** of each `"key" = "value";` pair. Leave the left side untouched. Don't translate anything inside `{...}`, but you may move it around (refer to an existing `.strings` file such as `french.strings` to see how it's done).

Translation can be done manually, but agentic AI tools like `Crush` or `Claude Code` are useful for getting it done quickly and accurately.

> **How the tool decides what's translated:** an entry whose value is still identical to its key is treated as untranslated and gets marked `MISSING TRANSLATION`; an entry whose value differs is kept as a real translation. This means the copy-then-translate flow above works as expected, and it's also why creating the file as empty (`touch strings/spanish.strings`) works just as well — step 1-2 will populate it with every string for you.

### 1-2. Generate the `{language}.json` file that the site actually uses

`{language}.json` is the file the website actually consumes during the build, and it's generated from `{language}.strings`. We use a utility called [strings](https://github.com/okTurtles/strings) for this.

Download the `strings` binary from [okTurtles/strings releases](https://github.com/okTurtles/strings/releases) into the repo root and make it executable (`chmod +x strings.mac`), then run it **from the repo root**:

```sh
./strings.mac src/      # or ./strings.linux src/
```

> **Note:** the binary must be run from the root of the project, and its arguments must be *directories* to scan, not individual files. Only `strings.mac` is currently listed in `.gitignore` — if you're on Linux, add `strings.linux` there too so the binary doesn't get committed.

This rescans the source, regenerates every `.strings` file, and produces `strings/spanish.json` alongside it. The command is safe to re-run at any time: existing translations are preserved, newly added source strings are appended, and strings no longer present in the code are reported as unused.

Untranslated entries stay marked `MISSING TRANSLATION` and silently fall back to English, so partial translations are fine to ship.

Both the `.strings` and the `.json` files are committed to the repo.

## 2. Updating the relevant files in the codebase

### 2-1. Register the locale in `src/i18n/utils.ts`

There are three variables to update in `src/i18n/utils.ts`:

1. `tableLoaders`

Add the `.json` import to the map:

```ts
const tableLoaders = {
  'ko': ...,
  'fr': ...,
  'es': () => import('../../strings/spanish.json').then(module => module.default)
}
```

Note that these are lazy dynamic imports on purpose — each translation table is ~75KB, so they're loaded on demand rather than bundled into every page.

2. `languageDisplayNames`

This must be the display name of the language, written in that language itself:

```ts
export const languageDisplayNames = {
  en: 'English',
  ko: '한국어',
  fr: 'Français',
  es: 'Español'
}
```

3. `flagEmojiMap`

Add an appropriate flag emoji for the language:

```ts
export const flagEmojiMap = {
  en: '🇬🇧',
  ko: '🇰🇷',
  fr: '🇫🇷',
  es: '🇪🇸'
}
```

> **Right-to-left languages** (Hebrew, Arabic, Persian, Urdu) need a fourth variable, `rtlLangCodes`, plus a round of layout work. Finish the steps below first, then see [Adding a right-to-left (RTL) language](#adding-a-right-to-left-rtl-language).

Adding the locale key to `tableLoaders` is what registers it: `supportedLangCodes` is derived from that map, so everything else follows automatically, including:

- the `/es/...` routes (via `getDynamicRoutes()`)
- the language dropdown in the header (`components/LanguageSwitch.vue`)
- the browser-language auto-redirect (`getRedirectLocale()`) and the middleware's translation-table loading

### 2-2. Update the sitemap config in `astro.config.mjs`

This is the one place the locale list has to be repeated by hand. Add `es` to `sitemapLocales`:

```js
const sitemapLocales = ['en', 'ko', 'fr', 'es']
```

## 3. Build and eyeball it

Run:

```sh
npm run build:prod
```

then:

```sh
npm run preview:prod
```

and visit `http://localhost:4321/`.

Select Spanish in the language dropdown in the header and check that the translations render correctly across the website.

`npm run dev` works too, but using Astro's [preview feature](https://docs.astro.build/en/reference/cli-reference/#astro-preview) is recommended so that production-specific bugs get caught.

### 3-1. Language-specific UI adjustments

Some UI can break when presented with a particular language (e.g. the "Donate" button in the header becomes wider with the French translation "Faire un don", requiring a wider container element).

In that case, add locale-specific style adjustments to `src/styles/_locale_adjustment.scss` using the `is-locale(...)` mixin — it scopes the rules to `body[data-locale="..."]`, which `DefaultLayout.astro` sets. See how `@include is-locale("fr")` is used there for reference:

```scss
@include is-locale("es") { ... }
```

# Adding a right-to-left (RTL) language

Hebrew, Arabic, Persian etc are written right-to-left. Follow the whole "Adding a language" flow above first — nothing in it changes — then do the following on top.

## 4. Register the locale as RTL

`src/i18n/utils.ts` has a fourth list for this:

```ts
const rtlLangCodes: string[] = ['he']
```

That single line drives everything else. `isLocaleRTL()` reads it, `src/middleware.ts` turns it into `context.locals.langDir`, and `DefaultLayout.astro` puts it on the root element:

```astro
<html lang={locale || 'en'} dir={langDir || 'ltr'}>
```

## 5. Hooking into the direction from code

| Context | How |
| --- | --- |
| SCSS | `@include is-rtl { ... }` (from `src/styles/_mixins.scss`) |
| `.astro` | `const { langDir } = Astro.locals` |
| `.vue` | `const langDir = inject('langDir')` — provided app-wide in `src/_app.ts` |

The mixin expands to `:root[dir="rtl"] &`, so it must be included **inside** a rule, not at the top level of a file:

```scss
.c-thing {
  padding-left: 2rem;

  @include is-rtl {
    padding-left: 0;
    padding-right: 2rem;
  }
}
```

`src/components/Header.vue` is a small worked example — it swaps in `logo-transparent-rtl.svg` when `langDir === 'rtl'`.

## 6. Prefer logical properties over `is-rtl` overrides

Most of the time you shouldn't need the mixin at all. Replacing a physical property with its logical equivalent makes the rule mirror itself, which is both less code and impossible to forget to update later:

| Physical | Logical |
| --- | --- |
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |
| `text-align: left` / `right` | `text-align: start` / `end` |
| `float: left` / `right` | `float: inline-start` / `inline-end` |

`text-align` is the one people miss, because it doesn't turn up in a grep for `margin-*` or `padding-*`. Grep for `text-align:\s*(left|right)` separately.

Reach for `@include is-rtl` only when there's no logical equivalent — `transform: translateX()`, `background-position`, a mirrored asset, or a value that isn't simply flipped.

## 7. Untranslated English inside an RTL page

Blog titles, job posts and other CMS content stay in English even on `/he/` pages. There are two defensible ways to present a block of opposite-direction text, and the right one depends on how much of it there is.

**A. Keep the page's direction, fix only the ordering.** Set `unicode-bidi: plaintext` on the text-bearing elements. Each block picks its bidi paragraph direction from its own first strong character, so English reads left-to-right and its trailing punctuation and `user@example.com` strings come out right — while `direction` stays `rtl`, so alignment and list markers still match the surrounding page. This is what `src/layouts/JobPost.astro` does:

```scss
@include is-rtl {
  p, li, h1, h2, h3, h4, blockquote, td, th {
    unicode-bidi: plaintext;
  }
}
```

**B. Treat the block as an LTR island.** Put `dir="auto"` on the container and let the whole thing lay out left-to-right, markers and all. Better for long-form English body copy, where right-aligned text is ragged-*left* and noticeably harder to read across multiple lines.

Rule of thumb: short strings interleaved with translated UI (a blog card title next to a Hebrew date) want **A**; a wholesale English document inside RTL chrome has a good claim on **B**.

Three things that will bite you here:

- **`unicode-bidi` is not inherited.** It has to be set on each element that forms a bidi paragraph (`p`, `li`, `h1`…), never once on a wrapping `<article>`.
- **List markers follow `direction`, not `text-align`.** Under the default `list-style-position: outside` the marker sits outside the line box, so no amount of `text-align` will move it. If your `<ol>` numbers are stranded on the wrong side, something has changed `direction` — most likely a `dir="auto"` that resolved to `ltr`.
- **`dir="auto"` changes `direction`; `unicode-bidi: plaintext` doesn't.** That's the whole difference between the two options above. Don't combine `dir="auto"` with a `text-align` override — they fight, and the markers lose.

## 8. Fonts

`src/styles/_typography.scss` loads Lato and Poppins, and **neither covers Hebrew or Arabic** — those scripts currently fall back to whatever the OS provides, which varies between machines. If you want a consistent look, add an RTL-capable webfont (e.g. Noto Sans Hebrew) and scope it to the locale:

```scss
@include is-locale("he") {
  font-family: "Noto Sans Hebrew", "Poppins", sans-serif;
}
```
