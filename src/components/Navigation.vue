<template>
  <nav class="c-navbar"
    :class="{ 'is-open': $isNavigationOpen }"
    role="navigation"
    aria-label="main navigation">
    <div class="c-navbar-backdrop hide-desktop" @click="closeNavigation"></div>

    <div class="c-navbar-main">
      <a v-for="entry in menuList"
        :key="entry.id"
        :data-test="entry.id"
        v-href="entry.path"
        @click="closeNavigation"
        class="c-navbar-item">
        <span>{{ entry.name }}</span>
        <span v-if="entry.badge" class="c-badge">{{ entry.badge }}</span>
      </a>

      <a class="c-get-started-btn button is-primary" v-href="'/get-started'" @click="closeNavigation">{{ t('Get started') }}</a>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { isNavigationOpen, closeNavigation } from '../store.ts';
import { useStore } from '@nanostores/vue';
import { resolvePath } from '@/utils/helpers.js'
import { useTranslation } from '@/i18n/utils.ts';

const props = defineProps({
  lang: {
    type: String,
    default: ''
  }
})

// local-state
const t = useTranslation(props.lang, 'navigation')
const $isNavigationOpen = useStore(isNavigationOpen);
let menuList = ref([])

// NOTE: await Astro.glob(...) is only available within *.astro file.
//       So using Vite's import.meta.glob() instead here.
//       (reference: https://vitejs.dev/guide/features.html#glob-import)
const activeJobPostNames = Object.keys(import.meta.glob('../jobs/*.md'))
  .map((filepath) => filepath.split('/').pop())
  .filter(fileName => !fileName.startsWith('_'))

onMounted(() => {
  // NOTE: isCurrentPathEqualTo() above cannot be used in the compile time. (window is undefined in node)
  //       So populating menuList in the mounted hook like this.

  const prefixWithLang = (path) => props.lang ? `/${props.lang}${path}` : path
  menuList.value = [
    { name: 'Home', id: 'homeLink', path: prefixWithLang('/') },
    { name: t('About us'), id: 'aboutUsLink', path: prefixWithLang('/about-us') },
    { name: t('Blog'), id: 'blogLink', path: prefixWithLang('/blog') },
    { name: t('FAQS'), id: 'blogLink', path: prefixWithLang('/faq') },
    { name: t('Hiring'), id: 'hiringLink', path: prefixWithLang('/hiring'), badge: activeJobPostNames.length },
    { name: t('Donate'), id: 'donateLink', path: prefixWithLang('/donate') }
  ].filter(Boolean)
})
</script>

<style lang="scss" scoped>
@import "../styles/_variables";
$zindex-navigation-on-mobile: $zindex-banner + 1;

.c-navbar {
  position: relative;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: center;
  margin-right: -5px;
  background-color: #fff;

  @include touch {
    position: fixed;
    overflow: hidden;
    z-index: $zindex-navigation-on-mobile;
    background-color: rgba(0, 0, 0, 0);
    left: 0;
    pointer-events: none;

    &.is-open {
      pointer-events: initial;
    }
  }
}

.c-navbar-backdrop {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  pointer-events: inherit;
  background-color: rgba(0, 0, 0, 0);
  z-index: 0;

  .is-open & {
    background-color: rgba(237,237, 237, 0.425);
  }
}
.c-navbar-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  width: 38.4rem;
  max-height: 30rem;
  border-left: none;

  @include touch {
    position: absolute;
    right: 0;
    top: 0;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: 100%;
    max-height: unset;
    width: min(22.75rem, 100vw);
    padding: 2.75rem 1.25rem 3.75rem;
    background-color: #fff;
    border-left: 1px solid $general_1;
    pointer-events: inherit;
    z-index: 1;
    transform: translateX(110%);

    .is-open & {
      transition: transform 250ms ease-out;
      transform: translateX(0%);
    }
  }

  @include phone {
    width: 100%;
  }
}

.c-navbar-item {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  text-decoration: none;
  font-family: "Poppins";
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;

  .c-badge {
    $badge-side: 16px;

    position: relative;
    display: inline-block;
    width: $badge-side;
    height: $badge-side;
    font-size: 10px;
    line-height: $badge-side;
    text-align: center;
    border-radius: $badge-side;
    background-color: $primary_0;
    color: #fff;
    transform: translateY(-3px);
    margin-left: 2px;
  }

  @include desktop {
    &:first-child {
      display: none;
    }
  }

  @include touch {
    display: block;
    padding: 0.75rem 0;
    border-radius: 1.75rem;
    border: 1px solid rgba(0, 0, 0, 0);
    white-space: initial;

    &:hover {
      text-decoration: underline;
      background-color: $general_2;
      border-color: $general_1;
    }
  }
}


.c-get-started-btn {
  text-transform: capitalize;

  @include touch {
    margin-top: 0.75rem;
  }
}
</style>