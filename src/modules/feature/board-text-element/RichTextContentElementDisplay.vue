<template>
	<RenderHTML
		class="ck-content pb-2"
		:html="value"
		v-if="value !== undefined && value !== ''"
	/>
</template>

<script>
import { RenderHTML } from "@feature-render-html";
import { defineComponent } from "vue";

export default defineComponent({
	name: "RichTextContentElementDisplay",
	components: { RenderHTML },
	props: {
		value: {
			type: String,
			required: true,
		},
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
