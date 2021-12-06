<template>
	<v-switch
		:input-value="value"
		:label="label"
		inset
		flat
		dense
		:class="customClasses"
		@change="($event) => $emit('input-changed', $event)"
	></v-switch>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input-changed",
	},
	props: {
		// v-switch accepts any type as a value, thus we shouldn't restrict it
		// eslint-disable-next-line vue/require-prop-types
		value: {
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		customClasses: {
			type: String,
			default: "",
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .v-input--selection-controls__ripple {
	position: absolute !important;
}
</style>
