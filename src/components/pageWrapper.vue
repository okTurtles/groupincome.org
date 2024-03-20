<template>
  <div :class="['main-wrapper', { 'open-nav': $isNavigationOpen, 'is-with-fundraiser': $isFundraiserOpen }]">
    <slot></slot>
  </div>
</template>

<script setup>
import { isNavigationOpen, isFundraiserOpen } from '../store.ts';
import { useStore } from '@nanostores/vue';

const $isNavigationOpen = useStore(isNavigationOpen);
const $isFundraiserOpen = useStore(isFundraiserOpen);
</script>

<style lang="scss" scoped>
@import "../styles/_variables";

.main-wrapper {
  --fundraiser-space: 0rem;
	padding-top: calc(#{$headerHeightMobile} + var(--fundraiser-space));

  &.is-with-fundraiser {
    --fundraiser-space: 14rem;

    @include tablet {
      --fundraiser-space: 10rem;
    }
    @include desktop {
      --fundraiser-space: 8rem;
    }
  }

  &.open-nav {
    overflow: hidden;
    position: fixed;
  }
}
</style>