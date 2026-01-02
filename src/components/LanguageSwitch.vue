<template>
<div class="selectbox c-language-switch">
  <select class="select c-select" v-model="selected" @input="handleLanguageChange">
    <option v-for="option in optionsList"
      :key="option.value"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>
</div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { languageNameMap } from '@/i18n/utils'

const currentLocale = inject<string>('locale')

const selected = ref<string>(currentLocale || 'en')
const optionsList = Object.entries(languageNameMap).map(([code, name]) => ({
  value: code,
  label: name
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
  width: 8.75rem;

  .c-select {
    height: 2rem;
    font-size: $size_6;
    padding-left: 0.75rem;
    padding-right: 1.75rem;
  }

  @include desktop {
    width: 9.25rem;
  }
}
</style>
