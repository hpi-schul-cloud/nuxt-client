<template>
	<RenderHTML v-if="value !== undefined && value !== ''" class="ck-content mb-4" :html="value" />
</template>

<script setup lang="ts">
import { RenderHTML } from "@feature-render-html";
import renderMathInElement from "katex/dist/contrib/auto-render.js";
import { onMounted } from "vue";

defineProps({
	value: {
		type: String,
		required: true,
	},
});

onMounted(() => {
	const mathElements = document.getElementsByClassName("math-tex");

	for (const element of mathElements) {
		renderMathInElement(element as HTMLElement);
	}
});
</script>
