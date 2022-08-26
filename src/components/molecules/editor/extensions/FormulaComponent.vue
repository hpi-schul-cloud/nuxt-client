<template>
	<node-view-wrapper class="math-component">
		<span class="label">Math Component</span>

		<div class="content">
			<p><strong>Edit</strong></p>
			<textarea v-model="formula" cols="50 " rows="1"></textarea>
			<p><strong>Preview</strong></p>
			<div ref="mathJaxEl" class="math-tex">{{ formula }}</div>
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

	watch: {
		formula() {
			this.renderMathJax();
		},
	},

	mounted() {
		this.renderMathJax();
	},

	methods: {
		renderContent() {
			this.$refs.mathJaxEl.innerHTML = this.formula;
		},

		renderMathJax() {
			this.renderContent();
			if (window.MathJax) {
				window.MathJax.Hub.Config({
					"HTML-CSS": {
						styles: { ".math-tex": { margin: 0 } },
						linebreaks: { automatic: true },
					},
				});
				window.MathJax.Hub.Queue([
					"Typeset",
					window.MathJax.Hub,
					this.$refs.mathJaxEl,
				]);
			}
		},
	},
};
</script>

<style lang="scss">
.math-component {
	position: relative;
	margin: var(--radius-lg) 0;
	background: #faf594;
	border: var(--border-width-bold) solid var(--color-black);
	border-radius: var(--radius-md);
}

.label {
	position: absolute;
	top: 0;
	padding: var(--radius-sm) var(--radius-md);
	margin-left: var(--radius-lg);
	font-size: var(--text-sm);
	color: var(--color-white);
	text-transform: uppercase;
	background-color: var(--color-black);
	border-radius: 0 0 var(--radius-md) var(--radius-md);
}

.content {
	padding: var(--radius-lg);
	margin-top: var(--radius-lg);
}

textarea {
	padding: var(--radius-lg);
	margin-bottom: var(--sidebar-sub-item-height);
	border: solid var(--border-width-bold) var(--color-black);
	border-radius: var(--radius-md);
}

textarea:focus {
	outline: none;
}
</style>
