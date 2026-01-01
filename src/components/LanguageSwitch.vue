<template>
<div class="selectbox c-language-switch">
  <select class="select" v-model="selected">
    <option v-for="option in optionsList"
      :key="option.value"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>
</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  currentLocale?: string
}>()

const languageNameMap: { [index: string]: string } = {
  'en': 'English',
  'ko': 'Korean',
  'fr': 'French'
}

const selected = ref<string>(props.currentLocale || 'en')
const optionsList = Object.entries(languageNameMap).map(([code, name]) => ({
  value: code,
  label: name
}))
</script>

<style lang="scss" scoped>
@use "../styles/variables" as *;

.selectbox {
  margin-top: 1.5rem;
}
</style>
