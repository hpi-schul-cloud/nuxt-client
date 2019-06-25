<template>
	<base-input-default v-bind="$attrs" :type="false" vmodel="" :label="label">
		<multi-select
			v-model="vmodel"
			v-bind="$attrs"
			:options="options"
			:multiple="multiple"
			track-by="value"
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
				options.every((option) => option.value !== undefined),
		},
		label: {
			type: String,
			required: true,
		},
		optionLabel: {
			type: String,
			default: "label",
		},
	},
	computed: {
		vmodel: {
			get() {
				return this.multiple
					? this.options.filter((option) => this.value.includes(option.value))
					: this.options.find(
							(option) =>
								JSON.stringify(this.value) == JSON.stringify(option.value)
					  );
			},
			set(to) {
				const newModel = this.multiple
					? to.map((selection) => selection.value)
					: to.value;
				this.$emit("update:vmodel", newModel);
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
