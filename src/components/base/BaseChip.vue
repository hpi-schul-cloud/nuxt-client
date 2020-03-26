<template>
	<button
		type="button"
		:class="['chip', size, selected, classes]"
		:style="{ padding: size }"
		v-on="$listeners"
	>
		<slot />
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

$default-color: var(--color-gray-dark);
$highlight-color: var(--color-secondary);

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

.selected {
	color: var(--color-white);
	background-color: $highlight-color;
	border: 1px solid $highlight-color;
}
.default {
	color: $default-color;
	background-color: var(--color-white);
	border: 1px solid $default-color;
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

button {
	&:hover {
		// increase border size to increase visiblity
		box-shadow: var(--shadow-s);
	}
	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px var(--color-white), 0 0 0 6px $default-color;
	}
	&.selected:focus {
		box-shadow: 0 0 0 3px var(--color-white), 0 0 0 6px $highlight-color;
	}
}
</style>
