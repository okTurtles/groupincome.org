<template>
<component :is="tag" v-html="translated"></component>
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
  tag: {
    type: String,
    required: false,
    default: 'span'
  },
  args: Object
})

const slots = useSlots()
const useTranslation = inject('useTranslation')
const locale = inject('locale', '')
const translator = useTranslation(locale, props.area)

const textToTranslate = props.text || (slots.default ? slots.default()[0].children : '') || ''
const translated = translator(textToTranslate.trim(), props.args)
</script>
