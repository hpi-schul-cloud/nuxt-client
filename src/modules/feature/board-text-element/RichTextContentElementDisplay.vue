<template>
	<RenderHTML
		class="ck-content"
		:html="value"
		config="ck5"
		v-if="value !== undefined && value !== ''"
	/>
</template>

<script>
import { RenderHTML } from "@feature-render-html";
import { defineComponent, onMounted } from "vue";

export default defineComponent({
	name: "RichTextContentElementDisplay",
	components: { RenderHTML },
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
