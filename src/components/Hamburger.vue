<template>
  <button class="c-hamburger hide-desktop"
    :class="{ 'is-nav-open': $isNavigationOpen }"
    @click="toggleNavigation">Toggle menu</button>
</template>

<script setup>
import { isNavigationOpen, toggleNavigation } from '../store.ts';
import { useStore } from '@nanostores/vue';

const $isNavigationOpen = useStore(isNavigationOpen);
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.c-hamburger {
  background-color: transparent;
  display: flex;
  inset-inline-end: 0;
  margin: 0;
  padding: 0;
  width: 4.75rem;
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
    width: 1.6rem;
    background-color: $general_0;
    transition: transform .1s ease-in-out;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translateX(50%);
  }

  &::before {
    margin-top: -0.3rem;
  }

  &::after {
    margin-top: 0.3rem;
  }
}

.open-nav {
  .c-hamburger {
    &::before {
      transform: translateX(50%) rotate(45deg);
      margin-top: 0.3rem;
    }

    &::after {
      transform: translateX(50%) rotate(-45deg);
      margin-top: 0.3rem;
    }
  }
}
</style>
