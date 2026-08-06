<template>
<div class="c-language-switch-wrapper">
  <Dropdown class="c-dropdown"
    :menuOptions="optionsList"
    :initialSelectedOptionId="currentLocale"
    @select="handleLanguageChange">
    <template #selected-text="{ option }">
      <span class="flag-emoji is-larger">{{ getLangEmoji(option.id) }}</span>
    </template>
    <template #menu-item-text="{ option }">
      <span class="flag-emoji has-right-margin">{{ getLangEmoji(option.id) }}</span>
      <span class="locale-display-name">- {{ option.name }}</span>
    </template>
  </Dropdown>
</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { supportedLangCodes, languageDisplayNames, flagEmojiMap } from '@/i18n/utils'
import Dropdown, { type MenuItem } from '@/components/Dropdown.vue'

const basePath = import.meta.env.BASE_URL
// helper function
const getLangEmoji = (locale: string) => {
  return flagEmojiMap[locale] || ''
}
const capitalizeLocale = (locale: string) => {
  return locale.slice(0, 1).toUpperCase() + locale.slice(1)
}

const currentLocale = inject<string>('locale')
const optionsList = supportedLangCodes.map((code) => ({
  id: code,
  name: languageDisplayNames[code] || code,
  selectedName: `${getLangEmoji(code)} ${capitalizeLocale(code)}`
}))

// methods
const handleLanguageChange = (option: MenuItem) => {
  const newLocale = option.id
  if (newLocale === currentLocale) return

  const path = window.location.pathname
  const withoutBase = path.startsWith(basePath) ? path.slice(basePath.length) : path

  if (currentLocale && withoutBase.startsWith(currentLocale)) {
    const newUrl = `${basePath}${withoutBase.replace(currentLocale, newLocale)}${window.location.search}${window.location.hash}`
    window.location.href = newUrl
  }
}
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.c-dropdown {
  @include touch {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;

    :deep(.dropdown-menu) {
      right: unset;
      left: 50%;
      transform: translateX(-50%) translateY(0.5rem);
    }
  }

  .flag-emoji {
    display: inline-block;
    font-size: 1.175em;
    transform: translateY(1px);

    &.has-right-margin {
      margin-right: 0.25rem;
    }

    &.is-larger {
      font-size: 1.275em;
    }
  }
}
</style>
