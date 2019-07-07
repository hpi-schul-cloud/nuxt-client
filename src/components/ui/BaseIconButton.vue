<template>
	<button>
		<base-icon :source="source" :icon="icon" :fill="fill" />
	</button>
</template>

<script>
export default {
	props: {
		source: {
			type: String,
			required: true,
		},
		icon: {
			type: String,
			required: true,
		},
		fill: {
			type: String,
			default: "currentColor",
		},
	},
};
</script>

<style lang="scss" scoped>
button {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2em;
	height: 2em;
	padding: var(--space-xxs);
	background-color: var(--color-white);
	border: none;
	border-radius: var(--radius-round);

	&:hover {
		cursor: pointer;
		background-color: var(--color-gray-light);
	}
}
</style>
