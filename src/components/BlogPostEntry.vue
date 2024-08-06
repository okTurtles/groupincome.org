<template>
<article class="c-article">
  <a :href="postUrl">
    <img class="c-article-image has-deep-box-shadow" :src="imgSrc" />
    <h2 class="c-blog-title">{{ title }}</h2>
    <p>{{ description }}</p>
    <div class="c-info">{{ author }}<time v-if="createdDate">{{ createdDate }}</time></div>
  </a>
</article>
</template>

<script setup>
import { resolvePath } from '@/utils/helpers.js'

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
  author = 'Greg Slepak'
  date: createdDate,
  image
} = props.postFrontmatter

const postUrl = resolvePath(permalink)
const imgSrc = resolvePath(image) || resolvePath('/images/' + permalink + '.jpeg')
</script>

<style lang="scss" scoped>
@import "../../styles/_variables";

.c-article {
	border-bottom: 1px solid #D0DEEA;
	margin-bottom: 5rem;

	p {
		margin-bottom: 1.5rem;
	}

	img {
		margin: 2rem auto;
	}

	h2 {
		font-size: 2rem;
		font-weight: 600;
	}

  &-image {
		background-color: #D0DEEA;
		border-radius: .5rem;
		width: 100%;
		aspect-ratio: 2 / 1;
		object-fit: cover;
	}

  .c-info {
    font-weight: .5rem;
    margin: 1rem 0 3rem 0;

    time::before {
      content: ' • ';
    }
  }
}
</style>
