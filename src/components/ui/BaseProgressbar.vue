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
	background-color: #f3f3f3;
	border: 0;
	height: 18px;
	border-radius: 9px;
}
progress::-moz-progress-bar {
	background-color: $color-primary;
	border-radius: 6px;
}
</style>
