<template>
	<label :class="['wrapper', type]" :style="{ color }">
		<input
			ref="hiddenInput"
			:aria-label="labelHidden ? label : undefined"
			v-bind="$attrs"
			:checked="isChecked"
			:value="value"
			type="checkbox"
			class="visually-hidden"
			@change="updateVModel"
			@blur="$emit('blur', $event)"
			@focus="$emit('focus', $event)"
		/>
		<span :class="['icon-wrapper']">
			<base-icon
				class="icon"
				:source="visibleIcon.source"
				:icon="visibleIcon.name"
			/>
		</span>
		<span v-if="!labelHidden" class="label">
			{{ label }}
		</span>
	</label>
</template>
<script>
import BaseIcon from "@components/base/BaseIcon";
export const supportedTypes = ["checkbox", "switch"];

export default {
	components: {
		BaseIcon,
	},
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
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
			default: `var(--color-tertiary)`,
		},
		label: {
			type: String,
			required: true,
		},
		labelHidden: Boolean,
		showUndefinedState: Boolean,
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		isChecked() {
			return Array.isArray(this.vmodel)
				? this.vmodel.includes(this.value)
				: Boolean(this.vmodel);
		},
		visibleIcon() {
			switch (this.type) {
				case "switch": {
					return this.isChecked
						? { name: "toggle_on", source: "material" }
						: { name: "toggle_off", source: "material" };
				}
				default:
				case "checkbox": {
					if (this.showUndefinedState && this.vmodel === undefined) {
						return { name: "indeterminate_check_box", source: "material" };
					}
					return this.isChecked
						? { name: "check_box", source: "material" }
						: { name: "check_box_outline_blank", source: "material" };
				}
			}
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
				if (Array.isArray(this.vmodel)) {
					throw new Error(
						"showUndefinedState is not allowed if v-model is of type Array."
					);
				}
			}
		},
		updateVModel() {
			let newModel = this.vmodel;
			const isChecked = this.$refs.hiddenInput.checked;
			if (
				typeof this.vmodel === "boolean" ||
				(this.showUndefinedState && this.vmodel === undefined)
			) {
				newModel = isChecked;
			} else if (isChecked && !newModel.includes(this.value)) {
				newModel.push(this.value);
			} else if (!isChecked && newModel.includes(this.value)) {
				newModel = newModel.filter((entry) => entry !== this.value);
			}
			this.$emit("input", newModel);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

label {
	// .wrapper but to keep specifcy low we use label directly
	// this makes it easier to overwrite styles
	position: relative;
	display: flex;
	flex-wrap: nowrap;
	align-items: top;
}

.label {
	margin: 0 var(--space-xs-2);
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

// SWITCH
.switch {
	input + .icon-wrapper {
		// stylelint-disable
		margin-top: -0.5em;
		margin-bottom: -0.5em;
		font-size: 2em;
		// stylelint-enable
	}
	input:checked + .icon-wrapper {
		color: var(--color-success);
	}
}
</style>
