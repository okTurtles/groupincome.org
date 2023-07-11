import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkBreaks from 'remark-breaks'; // improves support for newlines in markdown files
import remarkGfm from 'remark-gfm'; // support rendering tables in markdown files
// twitter & youtube auto-embed via remark
import remarkEmbedder from '@remark-embedder/core';
import oembedTransformer from '@remark-embedder/transformer-oembed';
import vue from "@astrojs/vue";

const remarkEmbedPlugin = [remarkEmbedder.default, {
  transformers: [oembedTransformer.default],
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

const { IS_PROD_BUILD } = process.env

// https://astro.build/config
export default defineConfig({
  site: IS_PROD_BUILD === 'true'
    ? "https://our_prod_website_url.org" // !!NOTE!!: when the time comes and we deploy this project to our own website, replace this with the correct URL.
    : 'https://okturtles.github.io',
  base: IS_PROD_BUILD === 'true' ? "/" : '/groupincome.org',
  // integrations: [mdx(), sitemap(), vue()],
  integrations: [
    sitemap(),
    vue({ appEntrypoint: '/src/_app' })
  ],
  markdown: {
    remarkPlugins: [remarkEmbedPlugin, remarkGfm, remarkBreaks, 'remark-math'],
    rehypePlugins: [['rehype-katex', {
      // Katex plugin options
    }]]
  }
});