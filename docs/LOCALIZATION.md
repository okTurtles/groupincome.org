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
