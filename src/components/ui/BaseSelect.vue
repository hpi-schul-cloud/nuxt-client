<template>
	<div class="input__wrapper">
		<span :class="{ label: true }">
			{{ label }}
		</span>
		<multi-select
			v-bind="$attrs"
			:value="populatedValue"
			:options="options"
			:multiple="multiple"
			track-by="value"
			label="label"
			@input="updatevmodel"
		></multi-select>
	</div>
</template>

<script>
import MultiSelect from "vue-multiselect";

export default {
	name: "BaseSelect",
	components: { MultiSelect },
	model: {
		prop: "value",
		event: "update:vmodel",
	},
	props: {
		value: {
			type: [String, Array, Object],
			required: true,
		},
		selected: {
			type: Object,
			default: () => ({}),
		},
		multiple: {
			type: Boolean,
		},
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
