<template>
<span v-html="translated"></span>
</template>

<script setup>
import { inject, useSlots } from 'vue'

const props = defineProps({
  area: {
    type: String,
    required: false,
    default: ''
  },
  text: {
    type: String,
    required: false,
    default: ''
  },
  locale: {
    type: String,
    required: false,
    default: ''
  },
  args: Object
})

const slots = useSlots()
const useTranslation = inject('useTranslation')
const translator = useTranslation(props.locale, props.area)

const textToTranslate = props.text || (slots.default ? slots.default()[0].children : '') || ''
const translated = translator(textToTranslate.trim(), props.args)
</script>
