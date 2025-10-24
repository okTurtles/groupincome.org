<template>
  <i :class="['icon-button', 'icon-chevron-bottom', className]"
    @click.stop="onClick"></i>
</template>

<script setup lang="ts">
interface ComponentProps {
  targetSelector: string,
  scrollBehavior?: 'smooth' | 'auto',
  scrollPosition?: 'top' | 'center' | 'bottom',
  className?: string
}

const {
  targetSelector,
  scrollBehavior = 'smooth',
  scrollPosition = 'center'
} = defineProps<ComponentProps>()

const onClick = () => {
  const targetEl = document.querySelector(targetSelector)
  if (targetEl) {
    targetEl.scrollIntoView({
      behavior: scrollBehavior,
      block: scrollPosition as ScrollLogicalPosition
    })
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;
</style>
