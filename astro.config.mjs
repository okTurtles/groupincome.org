import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkBreaks from 'remark-breaks'; // improves support for newlines in markdown files
import remarkGfm from 'remark-gfm'; // support rendering tables in markdown files
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
// twitter & youtube auto-embed via remark
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import vue from "@astrojs/vue";

const remarkEmbedPlugin = [remarkEmbedder.default, {
  transformers: [oembedTransformer.default],
  // transformers: [],
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

const { BUILD_TARGET = '' } = process.env
const siteMap = {
  'staging': 'https://okturtles.github.io',
  'production': 'https://groupincome.org'
}
// Reference:
// https://docs.astro.build/en/reference/configuration-reference/
// https://vite.dev/config/

export default defineConfig({
  site: siteMap[BUILD_TARGET],
  base: BUILD_TARGET === 'staging' ? '/groupincome.org/' : '/',
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
    sitemap(),
    vue({ appEntrypoint: '/src/_app' })
  ],
  markdown: {
    remarkPlugins: [remarkEmbedPlugin, remarkGfm, remarkBreaks, remarkMath],
    rehypePlugins: [[rehypeKatex, {}]]
  }
})
