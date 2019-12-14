<template>
	<label class="wrapper">
		<input
			ref="hiddenInput"
			:aria-label="labelHidden ? label : undefined"
			v-bind="$attrs"
			:checked="isChecked"
			:value="value"
			type="checkbox"
			class="visually-hidden"
			@change="updateVModel"
		/>
		<span
			ref="icon"
			:class="['icon', type, { 'user-is-tabbing': $userIsTabbing }]"
		>
			<span v-if="type === 'checkbox' && isChecked" class="checkmark" />
		</span>
		<span v-if=!labelHidden class="label">
			{{ label }}
		</span>
	</label>
</template>
<script>
import userIsTabbingMixin from "@mixins/userIsTabbing";
export const supportedTypes = ["checkbox", "switch"];

export default {
	mixins: [userIsTabbingMixin],
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
			type: [Array, Boolean],
			required: true,
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
		label: {
			type: String,
			required: true,
		},
		labelHidden: {
			type: Boolean,
		},
	},
	computed: {
		isChecked() {
			return typeof this.vmodel === "boolean"
				? this.vmodel
				: this.vmodel.includes(this.value);
		},
	},
	methods: {
		updateVModel() {
			let newModel = this.vmodel;
			const isChecked = this.$refs.hiddenInput.checked;
			if (typeof this.vmodel === "boolean") {
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

.wrapper {
	display: inline-flex;
	align-items: center;
}

.label {
	margin: 0 var(--space-xs-2);
	vertical-align: middle;
}

.icon {
	position: relative;
	display: inline-block;
}

.checkbox {
	width: var(--text-base-size);
	height: var(--text-base-size);
	border: var(--border-width-bold) solid var(--color-tertiary);
	border-radius: var(--radius-xs);
}

input:checked + .checkbox {
	background-color: var(--color-tertiary);
}

.checkmark {
	position: absolute;
	width: 100%;
	height: 100%;
	transform: rotate(225deg);
	&::before {
		position: absolute;
		width: 0;
		height: 90%;
		margin-top: var(--space-xs-4);
		margin-left: var(--space-xs-3);
		content: "";
		background-color: var(--color-white);
		border: 0.06em solid var(--color-white);
		border-radius: var(--space-xs-4);
	}
	&::after {
		position: absolute;
		width: 55%;
		height: 0;
		margin-top: var(--space-xs-4);
		margin-left: var(--space-xs-3);
		content: "";
		background-color: var(--color-white);
		border: 0.06em solid var(--color-white);
		border-radius: var(--space-xs-4);
	}
}

.switch {
	width: 1.2em;
	height: 0.7em;
	background-color: var(--color-tertiary);
	transition: background-color var(--duration-transition-medium);

	&::before {
		position: absolute;
		bottom: 0.1em;
		left: 0.1em;
		width: 0.5em;
		height: 0.5em;
		content: "";
		background-color: var(--color-white);
		transition: transform var(--duration-transition-medium);
	}
}

input:checked + .switch {
	background-color: var(--color-tertiary);
	&::before {
		transform: translateX(100%);
	}
}

input:focus + .icon {
	outline: none;
	&.user-is-tabbing {
		outline: 2px solid #4d90fe;
		outline-offset: 0.1em;
	}
}
</style>
