import { defineMiddleware } from "astro:middleware";
import { useTranslation } from "./i18n/utils";

// https://docs.astro.build/en/guides/middleware/
export const onRequest = defineMiddleware((context, next) => {
  if (context.params.locale) {
    // storing data in context.locals: https://docs.astro.build/en/guides/middleware/#storing-data-in-contextlocals

    // Capture locale param for use in src/_app.ts for Vue and Astro.locals for all .astro files 
    context.locals.locale = context.params.locale;
    context.locals.L = useTranslation(context.params.locale)
    (globalThis as any).locale = context.params.locale
  }
  return next();
})
