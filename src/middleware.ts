import { defineMiddleware } from "astro:middleware";

// https://docs.astro.build/en/guides/middleware/
export const onRequest = defineMiddleware((context, next) => {
  if (context.params.locale) {
    context.locals.locale = context.params.locale
  }
  return next();
})
