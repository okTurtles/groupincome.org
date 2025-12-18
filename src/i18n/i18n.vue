<template>
  <component :is="rendered" />
</template>

<script setup>
import { inject, useSlots, h, computed } from "vue";

const props = defineProps({
	tag: {
			type: String,
			default: "span",
	},
	area: {
			type: String,
			required: false,
			default: "",
	},
	text: {
			type: String,
			required: false,
			default: "",
	},
	args: Object,
});

const slots = useSlots()
const useTranslation = inject("useTranslation")
const translator = useTranslation(props.area)

const textToTranslate =
	props.text || (slots.default ? slots.default()[0].children : "") || "";
const translated = translator(textToTranslate.trim(), props.args);
const rendered = computed(() => h(props.tag, { innerHTML: translated }));
</script>
