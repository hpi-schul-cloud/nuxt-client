<template>
	<button
		type="button"
		:class="['chip', size, selected, classes]"
		:style="{ padding: size }"
		v-on="$listeners"
		><slot></slot>
	</button>
</template>

<script>
export default {
	props: {
		size: {
			type: String,
			default: "medium",
			validator: (size) => ["small", "medium", "large"].includes(size),
		},
		selected: {
			type: Boolean,
		},
	},

	computed: {
		classes() {
			return this.selected ? "selected" : "default";
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
.chip {
	display: inline-block;
	margin: var(--space-xs) var(--space-xs) 0 0;
	font-family: var(--font-accent);
	font-size: var(--text-md);
	font-weight: var(--button-font-weight);
	line-height: var(--button-line-height);
	color: var(--color-white);
	text-align: center;
	white-space: nowrap;
	vertical-align: center;
	cursor: pointer;
	border: 0;
	border-radius: var(--radius-round);
	transition: all var(--duration-transition-medium)
		cubic-bezier(0.23, 1, 0.32, 1);
}

button {
	&:hover,
	&:focus {
		outline: 0;
		// increase border size to increase visiblity
		box-shadow: var(--shadow-s);
	}
}
.selected {
	color: var(--color-secondary-dark);
	background-color: var(--color-secondary-extra-light);
	border: 1px solid var(--color-secondary);
}
.default {
	color: var(--color-gray-dark);
	background-color: var(--color-white);
	border: 1px solid var(--color-gray);
}
.medium {
	padding: var(--space-xs-2) var(--space-lg);
}
.small {
	padding: var(--space-xs-3) var(--space-sm) var(--space-xs-4);
}
.large {
	padding: var(--space-xs) var(--space-xl);
}
</style>
