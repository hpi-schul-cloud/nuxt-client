<template>
	<div>
		<span v-if="!labelHidden" class="label">{{ label }}</span>
		<multi-select
			:aria-label="label"
			:value="value"
			v-bind="$attrs"
			:options="options"
			:multiple="multiple"
			:close-on-select="closeOnSelect"
			:track-by="trackBy"
			:placeholder="placeholder"
			class="input"
			:label="optionLabel"
			:select-label="selectLabel"
			:selected-label="selectedLabel"
			:deselect-label="deselectLabel"
			@select="$emit('select', $event)"
			@input="$emit('input', $event)"
			@tag="$emit('tag', $event)"
		>
			<template v-slot:tag="slotProps">
				<slot name="tag" :option="slotProps.option" />
			</template>
		</multi-select>
	</div>
</template>

<script>
import MultiSelect from "vue-multiselect";

export default {
	components: {
		MultiSelect,
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
			default: () => [],
			validator(options) {
				return options.every((option) => option !== undefined);
			},
		},
		trackBy: {
			type: String,
			default: "_id",
		},
		label: {
			type: String,
			required: true,
		},
		labelHidden: {
			type: Boolean
		},
		closeOnSelect: {
			type: Boolean,
		},
		placeholder: {
			type: String,
			default: "Bitte wähle eine Option aus",
		},
		optionLabel: {
			type: String,
			default: "label",
		},
		deselectLabel: {
			type: String,
			default: "Entfernen",
		},
		selectLabel: {
			type: String,
			default: "Auswählen",
		},
		selectedLabel: {
			type: String,
			default: "Aktiv",
		},
	},
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
@import "@styles";
.input .multiselect__tags {
	border: 0;
	border-radius: var(--radius-md);
}
.multiselect__content-wrapper {
	min-width: 270px !important;
}
</style>
