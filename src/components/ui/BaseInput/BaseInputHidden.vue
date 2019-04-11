<template>
	<input
		v-show="false"
		v-bind="$attrs"
		:type="type"
		:value="vmodel"
		@input="$emit('input', $event.target.value)"
	/>
</template>
<script>
export const supportedTypes = ["hidden"];

export default {
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			validate(value) {
				return supportedTypes.includes(value);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";

input {
	display: none;
}
</style>
