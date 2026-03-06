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
const L = inject("L")
const textToTranslate =
	props.text || (slots.default ? slots.default()[0].children : "") || "";
const translated = L(textToTranslate.trim(), props.args);
const rendered = computed(() => h(props.tag, { innerHTML: translated }));
</script>
