<template>
	<div
		:class="['chip', size]"
		:style="{ backgroundColor: backgroundColor, padding: size }"
		v-on="$listeners"
		><slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		backgroundColor: {
			type: String,
			default: "",
			active: false,
		},
		size: {
			type: String,
			default: "medium",
			validator: (size) => ["small", "medium", "large"].includes(size),
		},
	},
};
</script>

<style lang="scss" scoped>
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
.medium {
	padding: var(--space-xs) var(--space-md) var(--space-xs-2) var(--space-md);
}
.small {
	padding: var(--space-xs-3) var(--space-sm) var(--space-xs-4) var(--space-sm);
}
.large {
	padding: var(--space-xs) var(--space-xl) var(--space-xs) var(--space-xl);
}
</style>
