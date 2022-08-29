<template>
	<node-view-wrapper class="math-node-view">
		<span class="label">Formel</span>
		<div class="menu">
			<base-button @click="deleteFormula"> delete formula </base-button>
		</div>
		<div class="content">
			<p><strong>Edit</strong></p>
			<textarea v-model="formula" cols="50 " rows="1"></textarea>
			<p class="preview"><strong>Preview</strong></p>
			<div ref="preview">{{ formula }}</div>
		</div>
	</node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-2";

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

	watch: {
		formula(newVal, val) {
			if (newVal == val) {
				return;
			}

			this.renderMathJax();

			this.updateAttributes({
				formula: newVal,
			});
		},
	},

	mounted() {
		this.renderMathJax();
	},

	methods: {
		deleteFormula() {
			this.deleteNode();
		},

		renderContent() {
			this.$refs.preview.innerHTML = this.formula;
		},

		renderMathJax() {
			this.renderContent();
			if (window.MathJax) {
				window.MathJax.Hub.Queue([
					"Typeset",
					window.MathJax.Hub,
					this.$refs.preview,
				]);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.math-node-view {
	position: relative;
	border: 3px solid #0d0d0d;
	/* stylelint-disable-next-line */
	border-radius: 0.5rem;
	/* stylelint-disable-next-line */
	margin: 1rem 0;
	/* stylelint-disable-next-line */
	padding: 2rem 1rem 1rem;

	.label {
		position: absolute;
		top: 0;
		padding: var(--radius-sm) var(--radius-md);
		margin-left: 0;
		font-size: var(--text-sm);
		color: var(--color-white);
		text-transform: uppercase;
		background-color: var(--color-black);
		border-radius: 0 0 var(--radius-md) var(--radius-md);
	}

	.preview {
		/* stylelint-disable-next-line */
		margin: 1rem 0 0 0;
	}
}
</style>
