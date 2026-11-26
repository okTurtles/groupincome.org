/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    title?: string;
    locale?: string;
    langDir?: import('./types').LangDir;
    isBlogpost?: boolean;
    L?: import('./i18n/utils').TranslationFn;
  }
}

// Set by src/middleware.ts during the build (server side) and read by src/_app.ts,
// because Vue islands can't read Astro.locals. undefined when the middleware deleted them.
declare var giVueLocale: string | undefined
declare var giVueLangDir: import('./types').LangDir | undefined
declare var giVueIsBlogpost: boolean | undefined
