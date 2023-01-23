<template>
<header class="c-header">
    <div class="c-wrapper" @click="isNavigationOpen.set(true)" role="banner">
      <a class="c-logo" href="/groupincome.org/">
        <span class="is-hidden">Group Income</span>
        <img class="c-logo-img" src="/images/logo-transparent.svg" />
      </a>
      <Navigation></Navigation>
    </div>
    <Hamburger></Hamburger>
</header>
</template>

<script setup>
import { isNavigationOpen } from '../store.js';
import Navigation from './Navigation.vue'
import Hamburger from './Hamburger.vue'
</script>

<style lang="scss" scoped>
@import "../styles/_variables";
.c-header {
  display: flex;
  position: fixed;
  // position: absolute;
  width: 100%;
  top: 0;
  justify-content: center;
  background-color: #fff;
  z-index: $zindex-header;

  .c-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: $headerHeightMobile;
    max-width: calc(100% - 2rem);

    @include tablet {
      height: $headerHeightTablet;
      max-width: calc(100% - 8rem);
    }

    @include desktop {
      height: $headerHeight;
      max-width: $maxDesktop;
    }
  }
}

.c-logo {
  display: block;
  position: relative;
  width: 45%;
  max-width: 255px;
  margin-left: 0.5rem;
  margin-top: -2px;
  z-index: 1;
  transition: all ease-in .2s;

  @include desktop {
    margin-left: 3px;
  }
}

.c-logo-img {
  width: 100%;
}

.c-close {
  position: absolute;
  top: 0;
  right: 10px;
  background: none;
  border: 0;
  font-size: 2em;
}
</style>
