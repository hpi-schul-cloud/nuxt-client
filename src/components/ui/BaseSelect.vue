<template>
	<div class="input__wrapper">
		<span :class="{ inputLabel: true, active: value && value !== 0 }">
			{{ inputLabel }}
		</span>
		<multi-select
			v-bind="$attrs"
			:value="value"
			:options="options"
			:multiple="multiple"
			:label="label"
			:placeholder="placeholder"
			:track-by="trackBy"
			:allow-empty="allowEmpty"
			:show-labels="showLabels"
			:close-on-select="!showOnSelect"
			@input="$emit('input', $event)"
		></multi-select>
	</div>
</template>

<script>
import MultiSelect from "vue-multiselect";

export default {
	name: "BaseSelect",
	components: { MultiSelect },
	props: {
		value: {
			type: [Array, Object],
			required: true,
		},
		selected: {
			type: Object,
			default: () => ({}),
		},
		options: {
			type: Array,
			default: () => [],
			required: true,
		},
		placeholder: {
			type: String,
			default: "",
		},
		inputLabel: {
			type: String,
		},
		label: {
			type: String,
			required: true,
		},
		trackBy: {
			type: String,
			default: "",
		},
		multiple: {
			type: Boolean,
		},
		allowEmpty: {
			type: Boolean,
		},
		showLabels: {
			type: Boolean,
		},
		showOnSelect: {
			type: Boolean,
		},
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" scoped>
@import "@variables";
$input-padding-left: 12px;

.input__wrapper {
	position: relative;
	display: block;
	width: 100%;
	margin: 1em 0 $size-grid-padding;
	overflow: visible;
	clear: both;
	background: $color-text-bg;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
}

.label {
	@extend %typography-small;

	position: absolute;
	top: 0;
	left: $input-padding-left;
	z-index: 0;
	background-color: inherit;
	transform: translateY(-1.5em);
}
</style>
