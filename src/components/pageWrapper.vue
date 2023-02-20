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
	padding-top: calc($headerHeightMobile + $bannerHeight);
	@include tablet {
		padding-top: calc($headerHeightTablet + $bannerHeight);
	}
	@include desktop {
		padding-top: calc($headerHeight + $bannerHeight);
	}

  &.open-nav {
    overflow: hidden;
    position: fixed;
  }
}
</style>