<template>
	<base-input-default v-bind="$attrs" :type="false" vmodel="" :label="label">
		<multi-select
			v-model="model"
			v-bind="$attrs"
			:options="options"
			:multiple="multiple"
			:track-by="trackBy"
			:placeholder="placeholder"
			class="input"
			:label="optionLabel"
		/>
	</base-input-default>
</template>

<script>
import BaseInputDefault from "./BaseInput/BaseInputDefault";
import MultiSelect from "vue-multiselect";

export default {
	components: { BaseInputDefault, MultiSelect },
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
			default: () => [],
			validator(options) {
				return options.every((option) => option !== undefined);
			},
		},
		trackBy: {
			type: String,
			default: "value",
		},
		label: {
			type: String,
			required: true,
		},
		placeholder: {
			type: String,
			default: "Bitte wähle eine Option aus",
		},
		optionLabel: {
			type: String,
			default: "label",
		},
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(v) {
				this.$emit("input", v);
			},
		},
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss" scoped>
@import "@styles";
.input /deep/ .multiselect__tags {
	border: 0;
	border-radius: var(--radius-md);
}
</style>
