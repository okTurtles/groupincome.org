<template>
<div v-if="isModalOpen" class="l-modal"
  v-bind="containerAttrs">
  <div class="c-modal-background"></div>

  <div class="c-modal-content">
    <header class="c-modal-header">
      <h1 v-if="modalTitle" class="is-title-2">{{ modalTitle }}</h1>

      <button class="c-modal-close"
        aria-label="Close modal">
        <i class="icon-times"></i>
      </button>
    </header>

    <section class="c-modal-body">
      <slot></slot>
    </section>

    <footer v-if="$slots.footer" class="c-modal-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

// props
interface ComponentProps {
  modalName: string,
  modalTitle?: string
}
const props = defineProps<ComponentProps>()

// local-state
const isModalOpen = ref<boolean>(true)
const containerAttrs = {
  role: 'dialog',
  ariaLabel: props.modalTitle || 'dialog'
}

</script>

<style lang="scss" scoped>
@import "../../styles/_variables";

.c-modal-background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(10, 10, 10, 0.86);
}

.c-modal-content {
  position: relative;
  border-radius: 0.375rem;
  width: calc(100vw - 2rem);
  max-width: 40rem;
  height: auto;
  max-height: calc(100% - 4rem);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "m-header"
    "m-body"
    "m-footer";
}

.c-modal-header {
  grid-area: m-header;
}

.c-modal-body {
  grid-area: m-body;
}

.c-modal-footer {
  grid-area: m-footer;
}
</style>
