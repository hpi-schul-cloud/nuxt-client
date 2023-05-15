<!-- eslint-disable vue/no-v-html -->
<template>
	<div>
		<div v-html="value" />
	</div>
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
