<template>
	<node-view-wrapper class="math-node-view">
		<span class="label">Formel</span>
		<div class="menu">
			<button @click="deleteFormula">delete formula</button>
		</div>
		<div class="content">
			<p><strong>Edit with LaTex</strong></p>
			<textarea v-model="formula" cols="50 " rows="1"></textarea>
			<p class="preview"><strong>Preview</strong></p>
			<div ref="preview">{{ formula }}</div>
		</div>
	</node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-3";

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
		/* stylelint-disable-next-line */
		padding: 5px;
		margin-left: 0;
		/* stylelint-disable-next-line */
		font-size: 12px;
		/* stylelint-disable-next-line */
		color: #fff;
		text-transform: uppercase;
		/* stylelint-disable-next-line */
		background-color: #000;
		/* stylelint-disable-next-line */
		border-radius: 0 0 5px 5px;
	}

	.preview {
		/* stylelint-disable-next-line */
		margin: 1rem 0 0 0;
	}

	button {
		/* stylelint-disable-next-line */
		border: solid 2px #000;
		/* stylelint-disable-next-line */
		margin: 5px 10px 5px 0;
		/* stylelint-disable-next-line */
		padding: 3px;
	}
}
</style>
