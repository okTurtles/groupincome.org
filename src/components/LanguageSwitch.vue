<template>
<div class="c-language-switch-wrapper">
  <Dropdown class="c-dropdown"
    :menuOptions="optionsList"
    :initialSelectedOptionId="currentLocale"
    @select="handleLanguageChange" />
</div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { supportedLangCodes, languageDisplayNames } from '@/i18n/utils'
import Dropdown, { type MenuItem } from '@/components/Dropdown.vue'

// helper function
const capitalizeText = (text: string) => {
  return text.slice(0, 1).toUpperCase() + text.slice(1)
}

const currentLocale = inject<string>('locale')
const optionsList = supportedLangCodes.map((code) => ({
  id: code,
  name: languageDisplayNames[code] ? `${capitalizeText(code)} - ${languageDisplayNames[code]}` : code,
  selectedName: capitalizeText(code)
}))

// methods
const handleLanguageChange = (option: MenuItem) => {
  const newLocale = option.id

  if (newLocale !== currentLocale) {
    const newUrl = window.location.pathname.replace(`/${currentLocale}`, `/${newLocale}`)
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
}
</style>
