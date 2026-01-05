<template>
<div class="c-language-switch">
  <select class="c-select"
    v-model="selected"
    @input="handleLanguageChange">
    <option v-for="option in optionsList"
      :key="option.value"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>

  <i class="icon-chevron-bottom"></i>
</div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { supportedLangCodes } from '@/i18n/utils'

const currentLocale = inject<string>('locale')
const optionNames: Record<string, string> = {
  en: 'English',
  ko: '한국어',
  fr: 'Français'
}

const selected = ref<string>(currentLocale || 'en')
const optionsList = supportedLangCodes.map((code) => ({
  value: code,
  label: optionNames[code] || code
}))

const handleLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const newLocale = target.value

  if (newLocale !== currentLocale) {
    const newUrl = window.location.pathname.replace(`/${currentLocale}`, `/${newLocale}`)
    window.location.href = newUrl
  }
}

</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.c-language-switch {
  position: relative;
  display: flex;
  align-items: center;
  border-radius: $radius;

  .c-select {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: inherit;
    border: 1px solid $general_0;
    height: 2.75rem;
    padding: 0.25rem 1.5rem 0.25rem 0.5rem;
    background-color: transparent;
    font-family: inherit;
    font-weight: 500;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    font-size: $size_5;

    @include desktop {
      padding: 0.25rem 1.5rem 0.25rem 0.5rem;
      width: max-content;
    }
  }

  i {
    position: absolute;
    display: inline-block;
    z-index: 1;
    right: 0.5rem;
    top: 55%;
    transform: translateY(-50%);
    font-size: 0.75rem;
  }
}
</style>
