<template>
	<progress :value="value" :max="max"></progress>
</template>
<script>
export default {
	name: "BaseProgressbar",
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
@import "@variables";
progress {
	display: inline-block;
	height: 18px;
	background-color: #f3f3f3;
	background-size: auto;
	border-radius: 9px;
	appearance: none;
}
// TODO check if we can remove browser prefixes with postcss
progress::-moz-progress-bar {
	background-color: $color-primary;
	border: 0;
	border-radius: 6px;
}
progress::-webkit-progress-value {
	background-color: $color-primary;
	border-radius: 6px;
}

progress::-webkit-progress-bar {
	background-color: #f3f3f3;
	border: 0;
	border-radius: 9px;
}
</style>
