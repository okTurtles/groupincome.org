import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkBreaks from 'remark-breaks'; // improves support for newlines in markdown files
import remarkGfm from 'remark-gfm'; // support rendering tables in markdown files
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// twitter & youtube auto-embed via remark
// import remarkEmbedder from '@remark-embedder/core';
// import oembedTransformer from '@remark-embedder/transformer-oembed';
import vue from "@astrojs/vue";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/*
const remarkEmbedPlugin = [remarkEmbedder.default, {
  // transformers: [oembedTransformer.default],
  transformers: [],
  // https://github.com/remark-embedder/transformer-oembed/issues/25#issuecomment-888613740
  // https://github.com/remark-embedder/core#handleerror-errorinfo-errorinfo--gottenhtml--promisegottenhtml
  handleError({
    error,
    url,
    transformer
  }) {
    if (transformer.name !== '@remark-embedder/transformer-oembed' || !url.includes('twitter.com')) {
      // we're only handling errors from this specific transformer and the twitter URL
      // so we'll rethrow errors from any other transformer/url
      throw error;
    }
    console.error("ERROR: couldn't embed:", url);
    return `<p style="color:red">ERROR: Unable to embed <a href="${url}">this tweet</a> (possibly deleted).</p>`;
  }
}];
*/

const { BUILD_TARGET = '' } = process.env
const siteMap = {
  'staging': 'https://okturtles.github.io',
  'production': 'https://groupincome.org'
}
const base = BUILD_TARGET === 'staging' ? '/groupincome.org/' : '/'
// NOTE: keep in sync with supportedLangCodes in src/i18n/utils.ts
const sitemapLocales = ['en', 'ko', 'fr']
// Reference:
// https://docs.astro.build/en/reference/configuration-reference/
// https://vite.dev/config/

export default defineConfig({
  site: siteMap[BUILD_TARGET],
  base,
  // Sass-related options
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  integrations: [
    mdx(),
    sitemap({
      // Legacy pre-localization URLs (e.g. `/hiring`, `/blog/2`, `/tag/voting`) are just
      // client-side meta-refresh redirect — exclude them so only the real,
      // locale-prefixed pages under /en/, /ko/, /fr/ etc. are indexed.
      filter: (page) => {
        const path = new URL(page).pathname.replace(base, '')
        return sitemapLocales.some(locale => path.startsWith(`${locale}/`))
      },
      i18n: {
        // i18n option reference: https://docs.astro.build/en/guides/integrations-guide/sitemap/#i18n
        defaultLocale: 'en',
        locales: Object.fromEntries(sitemapLocales.map(locale => [locale, locale]))
      }
    }),
    vue({ appEntrypoint: '/src/_app' })
  ],
  markdown: {
    remarkPlugins: [/* remarkEmbedPlugin, */ remarkGfm, remarkBreaks, remarkMath],
    rehypePlugins: [[rehypeKatex, {}]]
  },
  devToolbar: {
    enabled: false, // hide the dev toolbar
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
  // NOTE: Never set build.concurrency option to anything higher than 1. It will break the translations of the website. 
})
