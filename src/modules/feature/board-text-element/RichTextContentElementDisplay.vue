<template>
	<RenderHTML
		v-if="value !== undefined && value !== ''"
		class="ck-content pb-2"
		:html="value"
	/>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import renderMathInElement from "katex/dist/contrib/auto-render.js";
import { RenderHTML } from "@feature-render-html";

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

<style lang="scss" scoped>
.margin {
	margin: 0.9em 0;
}

.margin:first-child {
	margin-top: 0;
}
</style>
