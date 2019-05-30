<template>
	<nav>
		<ul class="breadcrumb">
			<li v-for="input in inputs" :key="input.text" class="link">
				<component :is="getComponent(input)" v-bind="removeText(input)">
					{{ input.text }}
				</component>
			</li>
		</ul>
	</nav>
</template>
<script>
import BaseLink from "@basecomponents/BaseLink";

export default {
	props: {
		inputs: {
			type: Array,
			required: true,
		},
	},
	methods: {
		removeText({ text, ...input }) {
			return input;
		},
		getComponent(input) {
			return input.to || input.href ? BaseLink : "span";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.breadcrumb {
	padding: var(--space-sm) var(--space-md);
	list-style: none;

	.link {
		display: inline;
	}

	/* Add a slash symbol (/) before/behind each list item */
	.link + .link::before {
		padding: var(--space-xs);
		content: "/\00a0"; // Slash Symbol
	}
}
</style>
