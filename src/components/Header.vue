<template>
<header class="c-header">
  <Fundraiser></Fundraiser>
  <div class="c-header-wrapper">
    <div class="c-wrapper" role="banner">
      <a class="c-logo" v-href="'/'">
        <span class="is-hidden">Group Income</span>
        <img class="c-logo-img" v-src="'/images/logo-transparent.svg'" />
      </a>
      <Navigation client:load></Navigation>
    </div>
    <Hamburger></Hamburger>
  </div>
</header>
</template>

<script setup>
import Navigation from './Navigation.vue'
import Fundraiser from './Fundraiser.vue'
import Hamburger from './Hamburger.vue'
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.c-header {
  width: 100%;
  // position: absolute;
  position: fixed;
  z-index: $zindex-header;
  top: 0;
}

.c-header-wrapper {
  display: flex;
  justify-content: center;
  background-color: #fff;
  width: 100%;

  .c-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--gi-header-height);
    max-width: calc(100% - 2rem);

    @include tablet {
      max-width: calc(100% - 8rem);
    }

    @include desktop {
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
