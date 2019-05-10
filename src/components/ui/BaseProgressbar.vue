<template>
	<progress :value="value" :max="max"></progress>
</template>
<script>
export default {
	props: {
		value: {
			type: Number,
			default: 0,
		},
		max: {
			type: Number,
			default: 100,
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

$color-todo: var(--color-gray-light);
$color-done: var(--color-primary);

progress {
	display: inline-block;
	height: 1em;
	background-color: $color-todo;
	background-size: auto;
	border-radius: var(--radius-round);
	appearance: none;
}
// TODO check if we can remove browser prefixes with postcss
progress::-moz-progress-bar {
	background-color: $color-done;
	border: 0;
	border-radius: var(--radius-round);
}
progress::-webkit-progress-value {
	background-color: $color-done;
	border-radius: var(--radius-round);
}

progress::-webkit-progress-bar {
	background-color: $color-todo;
	border: 0;
	border-radius: var(--radius-round);
}
</style>
