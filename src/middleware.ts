import { defineMiddleware } from "astro:middleware";

// https://docs.astro.build/en/guides/middleware/
export const onRequest = defineMiddleware((context, next) => {
  if (context.params.locale) {
    // storing data in context.locals: https://docs.astro.build/en/guides/middleware/#storing-data-in-contextlocals

    // 'locale' param captured here(eg. any page route with [locale]/page-name.astro) needs to be available globally to all .astro and .vue files without having to do messy prop-drilling everywhere.
    // Astro.locals is available to all .astro files by default, but not to .vue files. So we store the locale info in globalThis.giVueLocale as a workaround, so that it can be accessed in _app.ts
    // when all Vue islands of the page are initialized during compilation.
    context.locals.locale = context.params.locale;
    (globalThis as any).giVueLocale = context.params.locale;
  } else {
    // Ensure the locale that was set in the previous request(where the locale info existed in the url) is cleared,
    // so that it doesn't spill over to wrong files/pages.
    // This is a fix for a bug where some vue islands present random translated texts for when the locale is 'en' 
    delete (globalThis as any).giVueLocale;
  }

  if (context.params.blogpost) {
    context.locals.isBlogpost = true;
    (globalThis as any).giVueIsBlogpost = true;
  } else {
    // Likewise as above, ensure the wrong giVueIsBlogpost doesn't spill over to wrong files/pages.
    delete (globalThis as any).giVueIsBlogpost;
  }

  return next();
})
