<template>
  <div :class="['main-wrapper', { 'open-nav': $isNavigationOpen }]">
    <slot></slot>
  </div>
</template>

<script setup>
import { isNavigationOpen } from '../store.js';
import { useStore } from '@nanostores/vue';

const $isNavigationOpen = useStore(isNavigationOpen);
</script>

<style lang="scss" scoped>
@import "../styles/_variables";
$bannerHeight: 2.75rem;

.main-wrapper {
	padding-top: calc($headerHeightMobile + 14rem);
	@include tablet {
		padding-top: calc($headerHeightTablet + 10rem);
	}
	@include desktop {
		padding-top: calc($headerHeight + 8rem);
	}

  &.open-nav {
    overflow: hidden;
    position: fixed;
  }
}
</style>