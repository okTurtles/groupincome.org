<template>
  <nav class="c-navbar" role="navigation" aria-label="main navigation" @click="isNavigationOpen.set(false)">
    <div class="c-navbar-main">
      <a class="c-navbar-item" href="/groupincome.org/" data-test="homeLink">Home</a>
      <a class="c-navbar-item" href="/groupincome.org/about-us" data-test="aboutUsLink">About us</a>
      <a class="c-navbar-item" href="/groupincome.org/blog" data-test="blogLink">Blog</a>
      <a class="c-navbar-item" href="/groupincome.org/faq" data-test="faqsLink">FAQS</a>
      <a class="c-navbar-item" href="/groupincome.org/hiring" data-test="hiringLink">Hiring</a>
      <!-- <a class="c-navbar-item" href="/hiring" data-test="hiringLink">Volunter</a> -->
      <a class="c-navbar-item" href="/groupincome.org/donate" data-test="donateLink">Donate</a>
      <a class="c-navbar-item button is-primary" href="/groupincome.org/get-started">Get started</a>
    </div>
  </nav>
</template>

<script setup>
import { isNavigationOpen } from '../store.js';
import { useStore } from '@nanostores/vue';
</script>

<style lang="scss" scoped>
@import "../styles/_variables";

.c-navbar {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  opacity: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  top: $headerHeightMobile;

  @include tablet {
    top: $headerHeightTablet;
  }

  @include desktop {
    top: 0;
    opacity: 1;
    align-items: flex-end;

    margin-right: -5px; // Temp

    * {
      pointer-events: initial;
    }
  }
}

.c-navbar-main {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  pointer-events: none;

  height: 100%;
  justify-content: space-around;
  max-height: 30rem;

  @include desktop {
    justify-content: space-between;
    flex-direction: row;
    pointer-events: initial;
    width: 38.4rem;
  }
}

.c-navbar-item {
  text-decoration: none;
  white-space: nowrap;
  opacity: 0;
  font-family: "Poppins";
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;

  &.nuxt-link-active {
    font-weight: 600;
  }

  @include desktop {
    opacity: 1;

    &:first-child {
      display: none;
    }
  }
}

.button {
  text-transform: capitalize;
}
</style>

<style lang="scss">
@import "../styles/_variables";

.open-nav {
  .c-header {
    height: 100%;
    align-items: initial;
  }

  @include desktop {
    max-height: 100%;
  }

  .c-navbar * {
    pointer-events: initial;
  }

  .c-navbar {
    opacity: 1;
    position: absolute;
    height: 100%;
    top: 0;
  }

  .button,
  .c-navbar-item {
    opacity: 1;
  }
}
</style>
