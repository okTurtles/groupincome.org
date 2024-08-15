<template>
<div v-if="$isModalOpen(modalName)" class="l-modal"
  v-bind="containerAttrs">
  <div class="c-modal-background"
    @click="close"></div>

  <div class="c-modal-content">
    <header class="c-modal-header">
      <h1 v-if="modalTitle">{{ modalTitle }}</h1>

      <button class="is-icon has-background-inverted c-modal-close"
        aria-label="Close modal"
        @click.stop="close">
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
import { useStore } from '@nanostores/vue';
import { isModalOpen, closeModal } from '@/store'

// props
interface ComponentProps {
  modalName: string,
  modalTitle?: string
}
const props = defineProps<ComponentProps>()

// local-state
const $isModalOpen = useStore(isModalOpen)
const containerAttrs = {
  role: 'dialog',
  ariaLabel: props.modalTitle || 'dialog'
}

// methods
const close = () => {
  closeModal(props.modalName)
}

defineExpose({ close })
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
  opacity: 0;
  animation: modal-bg-in 250ms ease-out forwards;
}

.c-modal-content {
  position: relative;
  border-radius: 0.375rem;
  width: calc(100vw - 3rem);
  max-width: 40rem;
  height: auto;
  max-height: calc(100% - 5rem);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "m-header"
    "m-body"
    "m-footer";
  background-color: $background_0;
  color: $text_0;
  text-align: left;
  opacity: 0;
  animation: modal-content-in 300ms ease-out forwards;
  animation-delay: 100ms;
}

.c-modal-header {
  grid-area: m-header;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  column-gap: 1rem;
  padding: 1.5rem 1.25rem;
  background-color: var(--general_2);

  h1 {
    font-family: "Poppins";
    font-size: 1.85rem;
    font-weight: 600;
    width: 100%;
    text-align: left;
    flex-grow: 1;
    line-height: 1.5;
    margin-top: 0.5rem;
  }

  button.c-modal-close {
    flex-shrink: 0;
  }

  @include tablet {
    flex-direction: column-reverse;
    column-gap: 0;
    align-items: stretch;

    h1 {
      font-size: 2.25rem;
      text-align: center;
      margin-top: 0;
    }

    button.c-modal-close {
      align-self: flex-end;
    }
  }
}

.c-modal-body {
  grid-area: m-body;
  padding: 2rem 1.25rem;
  overflow: auto;

  @include tablet {
    padding: 2.5rem 1.75rem;
  }
}

.c-modal-footer {
  grid-area: m-footer;
}

@keyframes modal-bg-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes modal-content-in {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
