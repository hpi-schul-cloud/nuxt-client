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
			validator: (type) => {
				return supportedTypes.includes(type);
			},
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
input {
	display: none;
}
</style>
