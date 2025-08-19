<template>
	<label :class="['wrapper', type]" :style="{ color }">
		<input
			ref="hiddenInput"
			:aria-label="labelHidden ? label : undefined"
			v-bind="$attrs"
			:checked="isChecked"
			:value="value"
			type="checkbox"
			class="d-sr-only"
			@change="updateVModel"
			@blur="$emit('blur', $event)"
			@focus="$emit('focus', $event)"
		/>
		<span :class="['icon-wrapper']">
			<v-icon class="icon">{{ visibleIcon.name }}</v-icon>
		</span>
		<span v-if="!labelHidden" class="label">
			{{ label }}
		</span>
	</label>
</template>
<script>
import {
	mdiCheckboxBlankOutline,
	mdiCheckboxIntermediate,
	mdiCheckboxOutline,
} from "@icons/material";
export const supportedTypes = ["checkbox"];

export default {
	props: {
		modelValue: {
			type: [Array, Boolean, undefined],
			default: undefined,
		},
		value: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type);
			},
		},
		color: {
			type: String,
			default: undefined,
		},
		label: {
			type: String,
			required: true,
		},
		labelHidden: Boolean,
		showUndefinedState: Boolean,
	},
	emits: ["update:modelValue", "blur", "focus"],
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		isChecked() {
			return Array.isArray(this.modelValue)
				? this.modelValue.includes(this.value)
				: Boolean(this.modelValue);
		},
		visibleIcon() {
			if (this.showUndefinedState && this.modelValue === undefined) {
				return { name: mdiCheckboxIntermediate };
			}
			return this.isChecked
				? { name: mdiCheckboxOutline }
				: { name: mdiCheckboxBlankOutline };
		},
	},
	created() {
		this.validateProps();
	},
	methods: {
		// Perform more complex prop validations than is possible
		// inside individual validator functions for each prop.
		validateProps() {
			if (process.env.NODE_ENV === "production") return;

			if (this.showUndefinedState) {
				if (this.type !== "checkbox") {
					throw new Error(
						"showUndefinedState is only allowed on type=checkbox."
					);
				}
				if (Array.isArray(this.modelValue)) {
					throw new Error(
						"showUndefinedState is not allowed if v-model is of type Array."
					);
				}
			}
		},
		updateVModel() {
			let newModel = this.modelValue;
			const isChecked = this.$refs.hiddenInput.checked;
			if (
				typeof this.modelValue === "boolean" ||
				(this.showUndefinedState && this.modelValue === undefined)
			) {
				newModel = isChecked;
			} else if (isChecked && !newModel.includes(this.value)) {
				newModel.push(this.value);
			} else if (!isChecked && newModel.includes(this.value)) {
				newModel = newModel.filter((entry) => entry !== this.value);
			}
			this.$emit("update:modelValue", newModel);
		},
	},
};
</script>

<style lang="scss" scoped>
label {
	// .wrapper but to keep specifcy low we use label directly
	// this makes it easier to overwrite styles
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	align-items: top;
	cursor: pointer;
}

.label {
	margin: 0 6px;
	vertical-align: middle;
}

.icon-wrapper {
	display: inline-block;
	user-select: none;

	svg {
		border-radius: var(--radius-xs);
	}
}

input:focus + .icon-wrapper svg {
	box-shadow: 0 0 0 3px currentColor;
}
</style>
