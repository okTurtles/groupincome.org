/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    title?: string;
    locale?: string;
    langDir?: 'rtl' | 'ltr';
    isBlogpost?: boolean;
    L?: import('./i18n/utils').TranslationFn;
  }
}
