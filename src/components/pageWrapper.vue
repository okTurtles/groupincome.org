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
.main-wrapper {
	padding-top: $headerHeightMobile;
	@include tablet {
		padding-top: $headerHeightTablet;
	}
	@include desktop {
		padding-top: $headerHeight;
	}

  &.open-nav {
    overflow: hidden;
    position: fixed;
  }
}
</style>