<template>
	<v-switch
		:input-value="value"
		:label="label"
		:aria-label="ariaLabel"
		inset
		flat
		dense
		:color="color"
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
		ariaLabel: {
			type: String,
			required: false,
			default: () => "toggle switch",
		},
		color: {
			type: String,
			default: () => "primary",
		},
	},
};
</script>

<style lang="scss" scoped>
::v-deep .v-input--selection-controls__ripple {
	position: absolute !important;
}

::v-deep .v-input--selection-controls__input {
	/* stylelint-disable-next-line sh-waqar/declaration-use-variable */
	margin-right: 0 !important;
}
</style>
