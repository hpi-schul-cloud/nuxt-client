<template>
	<div class="root">
		<div class="input__wrapper">
			<span :class="{ label: true, active: value && value !== 0 }">
				{{ placeholder }}
			</span>
			<MultiSelect
				v-model="val"
				:options="options"
				:multiple="multiple"
				:label="label"
				:placeholder="placeholder"
				:track-by="trackBy"
				:allow-empty="allowEmpty"
				:show-labels="showLabels"
				:close-on-select="closeOnSelect"
				@input="$emit('update:value', val)"
			></MultiSelect>
		</div>
	</div>
</template>

<script>
import MultiSelect from "vue-multiselect";

export default {
	// currently, this only supports text input
	name: "BaseSelect",
	components:{MultiSelect},
	model: {
		event: "update",
	},
	props: {
		value: {
			type: [Array, Object],
			default: () => [],
			required: true,
		},
		selected: {
			type: Object,
			default: () => {},
			required: false,
		},
		options: {
			type: Array,
			default: () => [],
			required: true
		},
		placeholder: {
			type: String,
			default: "",
			required: false,
		},
		label: {
			type: String,
			default: "",
			required: true,
		},
		trackBy: {
			type: String,
			default: "",
			required: false,
		},
		multiple: {
			type: Boolean,
			default: false,
			required: false
		},
		allowEmpty: {
			type: Boolean,
			default: true,
			required: false
		},
		showLabels: {
			type: Boolean,
			default: false,
			required: false
		},
		closeOnSelect: {
			type: Boolean,
			default: true,
			required: false
		}
	},
	data: function () {
		return {
				val: this.value
		}
	}
};
</script>

<style lang="scss" scoped>
@import "@variables";
$input-padding-left: 12px;

.root{
	width: 100%;
	padding-top: 1px;
}

.input__wrapper {
	position: relative;
	display: block;
	margin: 1em 0 $size-grid-padding;
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
	background-color: inherit;
	transform: translateY(-1.5em);
	z-index: 0;
}
</style>
