<template>
	<input
		v-show="false"
		v-bind="$attrs"
		:type="type"
		:value="modelValue"
		@input="$emit('update:modelValue', $event.target.value)"
	/>
</template>
<script>
export const supportedTypes = ["hidden"];

export default {
	props: {
		modelValue: {
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
	emits: ["update:modelValue"],
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
