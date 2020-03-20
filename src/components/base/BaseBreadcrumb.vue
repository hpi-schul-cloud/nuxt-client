<template>
	<nav>
		<ul class="breadcrumb">
			<li v-for="(input, index) in inputs" :key="input.text" class="link">
				<component :is="getComponent(input)" v-bind="removeText(input)">
					<base-icon
						v-if="input.icon"
						v-bind="input.icon"
						class="breadcrumb-icon"
					/>
					{{ input.text }}
					<base-icon
						v-if="index !== inputs.length - 1"
						source="material"
						icon="keyboard_arrow_right"
						class="arrow"
					/>
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

	created: function() {
		const lastObject = this.inputs[this.inputs.length - 1];
		delete lastObject.href && delete lastObject.to;
	},

	methods: {
		// eslint-disable-next-line no-unused-vars
		removeText({ text, icon, ...input }) {
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
	display: flex;
	align-items: center;
	padding: var(--space-sm) 0;
	list-style: none;

	.link {
		display: inline-flex;
		align-items: center;
		font-family: var(--font-accent);
		font-weight: var(--font-weight-bold);
		color: var(--color-tertiary-dark);
		border-bottom: none;
	}

	/* Add a slash symbol (/) before/behind each list item */
	.link + .link::before {
		padding: var(--space-xs);
		// Slash Symbol
	}

	.breadcrumb-icon {
		margin-right: var(--space-xs);
	}

	.arrow {
		color: var(--color-tertiary-light);
	}

	li:last-child > * {
		color: var(--color-tertiary-light);
		cursor: default;
	}
}
</style>
