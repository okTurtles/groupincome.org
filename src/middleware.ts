import { defineMiddleware } from "astro:middleware";

// https://docs.astro.build/en/guides/middleware/
export const onRequest = defineMiddleware((context, next) => {
  if (context.params.locale) {
    // storing data in context.locals: https://docs.astro.build/en/guides/middleware/#storing-data-in-contextlocals
    context.locals.locale = context.params.locale
  }
  return next();
})
