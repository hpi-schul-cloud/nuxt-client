<template>
	<div class="root">
		<label class="input__wrapper">
			<MultiSelect
				v-model="val"
				:options="options"
				:multiple="true"
				:label="label"
				:track-by="trackBy"
				@input="$emit('update:value', val)"
			></MultiSelect>
		</label>
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
			type: Array,
			default: () => [],
			required: true,
		},
		options: {
			type: Array,
			default: () => [],
			required: true
		},
		label: {
			type: String,
			default: "",
			required: true,
		},
		trackBy: {
			type: String,
			default: "",
			required: true,
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
}

.input__wrapper {
	position: relative;
	display: block;
	margin: 1em 0 $size-grid-padding;
	clear: both;
	background: $color-text-bg;
	//border: $size-border-width solid $color-border;
	border-radius: $size-border-radius;
}

.label {
	@extend %typography-small;

	position: absolute;
	top: 0;
	left: $input-padding-left;
	background-color: inherit;
	transform: translateY(-0.75em);
}
</style>
