<template>
	<label>
		<input
			ref="hiddenInput"
			v-bind="$attrs"
			:checked="isChecked"
			:value="value"
			type="checkbox"
			class="visually-hidden"
			@change="updateVModel"
		/>
		<span :class="['icon', type]" />
		<span class="label">
			{{ label }}
		</span>
	</label>
</template>
<script>
export const supportedTypes = ["checkbox", "switch"];

export default {
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

$background-color: var(--color-gray);
$background-color-active: var(--color-accent);

label {
	position: relative;
}

.icon {
	position: relative;
	display: inline-block;
	background-color: $background-color;
	transition: background-color var(--duration-transition-medium);
}

.checkbox {
	width: 0.7em;
	height: 0.7em;
}

.switch {
	width: 1.2em;
	height: 0.7em;

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

input:checked + .icon {
	background-color: $background-color-active;
	&.switch::before {
		transform: translateX(100%);
	}
}

input:focus + .icon {
	outline: 2px solid #4d90fe;
	outline-offset: 0.05em;
}
</style>
