<template>
  <button class="c-hamburger hide-desktop"
    :class="{ 'is-nav-open': $isNavigationOpen }"
    @click="toggleNavigation">Toggle menu</button>
</template>

<script setup>
import { isNavigationOpen, toggleNavigation } from '../store.js';
import { useStore } from '@nanostores/vue';

const $isNavigationOpen = useStore(isNavigationOpen);
</script>

<style lang="scss" scoped>
@import "../styles/_variables";

.c-hamburger {
  background-color: transparent;
  display: flex;
  right: 0;
  margin: 0;
  padding: 0;
  width: 5rem;
  height: 4rem;
  font-size: 0;
  text-indent: -9999px;
  z-index: 40;
  appearance: none;
  box-shadow: none;
  border-radius: 0;
  border: none;
  cursor: pointer;
  overflow: hidden;

  &:focus {
    outline: 0;
  }

  &::before,
  &::after {
    content: '';
    display: block;
    height: 2px;
    width: 2rem;
    background-color: $general_0;
    transition: transform .1s ease-in-out;
    position: absolute;
    right: 1rem;
    top: 50%;
  }

  &::before {
    margin-top: -0.4rem;
  }

  &::after {
    margin-top: 0.4rem;
  }
}

.open-nav {
  .c-hamburger {
    &::before {
      transform: rotate(45deg);
      margin-top: 0.4rem;
    }

    &::after {
      transform: rotate(-45deg);
      margin-top: 0.4rem;
    }
  }
}
</style>
