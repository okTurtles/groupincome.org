<template>
  <component :is="rendered" />
</template>

<script setup>
import { useSlots, h, computed } from "vue";
import { useL } from '@/composables/translations';

const props = defineProps({
	tag: {
			type: String,
			default: "span",
	},
	text: {
			type: String,
			required: false,
			default: "",
	},
	args: Object,
});

const slots = useSlots()
const L = useL()
const textToTranslate =
	props.text || (slots.default ? slots.default()[0].children : "") || "";
const translated = L(textToTranslate.trim(), props.args);
const rendered = computed(() => h(props.tag, { innerHTML: translated }));
</script>
