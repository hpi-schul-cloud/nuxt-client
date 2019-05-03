<template>
	<div
		:class="{
			input__wrapper: true,
			'has-label': label && value && value !== 0,
		}"
	>
		<span
			:class="{
				label: true,
				active: label && value && value !== 0,
			}"
		>
			{{ label }}
		</span>
		<multi-select
			v-bind="$attrs"
			:value="populatedValue"
			:options="options"
			:multiple="multiple"
			track-by="value"
			:label="optionLabel"
			@input="updatevmodel"
		></multi-select>
	</div>
</template>

<script>
import MultiSelect from "vue-multiselect";

export default {
	components: { MultiSelect },
	model: {
		prop: "value",
		event: "update:vmodel",
	},
	props: {
		/**
		 * Must match an entry of the options prop.
		 */
		value: {
			type: [String, Number, Array, Object],
			required: true,
		},
		multiple: {
			type: Boolean,
		},
		/**
		 * Format: [ { value: [String, Number, Array, Object], label: String }, ... ]
		 */
		options: {
			type: Array,
			required: true,
			validator: (options) =>
				options.every((option) => option.label && option.value),
		},
		label: {
			type: String,
			required: true,
		},
		optionLabel: {
			type: String,
			default: "",
		},
	},
	computed: {
		populatedValue() {
			return this.multiple
				? this.options.filter((option) => this.value.includes(option.value))
				: this.options.find(
						(option) =>
							JSON.stringify(this.value) == JSON.stringify(option.value)
				  );
		},
	},
	methods: {
		updatevmodel(event) {
			const newModel = this.multiple
				? event.map((selection) => selection.value)
				: event.value;
			this.$emit("update:vmodel", newModel);
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
	margin: 2em 0 $size-grid-padding;
	overflow: visible;
	clear: both;
	background: $color-text-bg;
	border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
	&.has-label {
		margin-top: 2em;
	}
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
