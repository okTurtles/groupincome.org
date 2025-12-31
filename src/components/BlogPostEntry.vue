<template>
<article class="c-article">
  <a class="c-link-wrapper" :href="postUrl" :target="isLocaleEn ? '_self' : '_blank'">
    <img class="c-article-image has-deep-box-shadow" :src="imgSrc" />
    <h2 class="c-blog-title">{{ title }}</h2>
    <p class="c-blog-desc">{{ description }}</p>
    <div class="c-info">{{ author }}<time v-if="createdDate">{{ createdDate }}</time></div>
  </a>
</article>
</template>

<script setup>
import { inject } from 'vue'
import { resolvePath } from '@/utils/helpers.js'

const locale = inject('locale')
const isLocaleEn = locale === 'en'

const props = defineProps({
  postFrontmatter: {
    type: Object,
    required: true
  }
})

const {
  permalink,
  title,
  description,
  author = 'Greg Slepak',
  date: createdDate,
  image
} = props.postFrontmatter

const postUrl = resolvePath(permalink)
const imgSrc = resolvePath(image) || resolvePath('/images/' + permalink + '.jpeg')
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.c-article {
	border-bottom: 1px solid #D0DEEA;
	margin-bottom: 5rem;

	img {
		margin: 2rem auto;
	}

	.c-blog-title {
		font-size: 2rem;
		font-weight: 600;
    margin: 1rem 0 1rem 0;
	}

  .c-blog-desc {
		margin-bottom: 1.5rem;
	}

  &-image {
		background-color: #D0DEEA;
		border-radius: .5rem;
		width: 100%;
		aspect-ratio: 2 / 1;
		object-fit: cover;
    transition: transform 250ms ease-out;
	}

  .c-info {
    font-weight: .5rem;
    margin: 1rem 0 3rem 0;
    color: #939393;

    time::before {
      content: ' • ';
    }
  }
}

.c-link-wrapper {
  &:hover,
  &:focus {
    .c-blog-title {
      text-decoration: underline;
    }

    .c-article-image {
      transform: scale(1.02);
    }
  }
}
</style>
