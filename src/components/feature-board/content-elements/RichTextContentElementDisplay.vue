<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="ck-content margin" v-html="value" />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import renderMathInElement from "katex/dist/contrib/auto-render.js";

export default defineComponent({
	name: "RichTextContentElementDisplay",
	props: {
		value: {
			type: String,
			required: true,
		},
	},
	setup() {
		onMounted(() => {
			const mathElements = document.getElementsByClassName("math-tex");
			for (const element of mathElements) {
				renderMathInElement(element);
			}
		});
	},
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
