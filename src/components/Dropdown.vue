<template>
<menu class="dropdown" :class="{ 'is-open': isMenuOpen }">
  <button class="is-unstyled dropdown-toggle"
    :aria-expanded="isMenuOpen"
    @click.stop="onToggleMenuClick">
    <span class="toggle-btn-text">{{ menuBtnText }}</span>
    <i class="icon-chevron-bottom toggle-btn-icon"></i>
  </button>

  <ul class="dropdown-menu">
    <li v-for="option in props.menuOptions"
      :class="['dropdown-menu-item', { 'is-selected': isItemSelected(option.id) }]"
      :key="option.id"
      tabindex="0"
      role="menuitem"
      @click.stop="onSelect(option)">
      <span class="dropdown-menu-item-text">{{ option.name }}</span>
      <i v-if="isItemSelected(option.id)" class="icon-check dropdown-menu-item-icon"></i>
    </li>
  </ul>
</menu>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

export type MenuItem = {
  id: string,
  name: string,
  selectedName?: string // display text when item is selected (optional)
}

interface ComponentProps {
  menuOptions: Array<MenuItem>,
  defaultText?: string,
  initialSelectedOptionId?: string
}

const props = defineProps<ComponentProps>()
const isMenuOpen = ref(false)
const selectedOptionId = ref<string | null>(props.initialSelectedOptionId || null)

const menuBtnText = computed(() => {
  const foundOption = props.menuOptions.find(option => option.id === selectedOptionId.value)
  return foundOption
    ? foundOption?.selectedName || foundOption?.name || ''
    : props.defaultText || ''
})

// methods

const onToggleMenuClick = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const onSelect = (option: MenuItem) => {
  if (selectedOptionId.value !== option.id) {
    selectedOptionId.value = option.id
  }
  closeMenu()
  emit('select', option)
}

const checkAndCloseMenu = (e: MouseEvent) => {
  // click-away detection logic
  if (!isMenuOpen.value) return

  const el = document.elementFromPoint(e.clientX, e.clientY)
  if (el && !el.closest('.dropdown-menu')) {
    closeMenu()
  }
}

const isItemSelected = (optionId: string) => {
  return selectedOptionId.value === optionId
}

onMounted(() => {
  window.addEventListener('click', checkAndCloseMenu)
})
onBeforeUnmount(() => {
  window.removeEventListener('click', checkAndCloseMenu)
})

const emit = defineEmits<{
  (e: 'select', option: MenuItem): void
}>()
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.dropdown {
  position: relative;
  width: 100%;
  height: auto;
  appearance: none;
  padding: 0;
  margin: 0;

  button.dropdown-toggle {
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    column-gap: 0.5rem;
    font-size: $size_5;
    transition:
      background-color 0.2s ease-out,
      border-color 0.2s ease-out;

    &:hover,
    &:focus,
    &:focus-within {
      background-color: $general_2;
      border-color: $general_2;
    }

    &:focus,
    &:focus-within {
      border-color: $general_1;
    }

    .toggle-btn-text {
      display: inline-block;
      flex-grow: 1;
      text-align: left;
      font-weight: 500;
    }

    .toggle-btn-icon {
      flex-shrink: 0;
      font-size: 0.8em;
      color: $text_2;
      line-height: 1;
      transition: transform 0.2s ease-out;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    display: block;
    width: max-content;
    max-height: 0;
    overflow: hidden;
    background-color: $background_0;
    border-radius: 0.5rem;
    border: 1px solid $general_1;
    box-shadow: $drop-shadow_medium;
    z-index: $zindex-tooltip;
    transform: translateY(0.5rem);
    opacity: 0;
  }

  .dropdown-menu-item {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease-out;
    color: $text_1;

    &:not(:last-of-type) {
      border-bottom: 1px solid $general_1;
    }

    .dropdown-menu-item-text {
      flex-grow: 1;
    }

    .dropdown-menu-item-icon {
      display: inline-block;
      flex-shrink: 0;
      font-size: 0.675em;
      margin-left: 1rem;
    }

    &.is-selected {
      color: $text_0;
    }

    &:hover,
    &:focus,
    &:focus-within {
      background-color: $general_2;
      color: $text_0;
    }
  }
}

.dropdown.is-open {
  .dropdown-menu {
    max-height: 18rem;
    opacity: 1;
    overflow: auto;
    transition: opacity 0.2s ease-out;
  }

  .toggle-btn-icon {
    transform: rotate(180deg);
  }
}
</style>
