<template>
	<node-view-wrapper class="mathe">
		<span class="label">Mathe Komponente</span>

		<div class="content">
			<textarea v-model="formula" cols="50 " rows="3"></textarea>
			<div class="math-tex">{{ formula }}</div>
		</div>
	</node-view-wrapper>
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from "@tiptap/vue-2";

export default {
	components: {
		NodeViewWrapper,
	},

	props: nodeViewProps,

	data() {
		return {
			formula: this.node.attrs.formula,
		};
	},

	mounted() {
		MathJax.Hub.Typeset();
	},
};
</script>
