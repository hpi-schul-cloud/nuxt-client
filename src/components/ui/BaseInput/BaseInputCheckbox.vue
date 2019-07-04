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
		<span ref="icon" :class="['icon', type]" />
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
	mounted() {
		window.addEventListener("keydown", this.handleFirstTabForCheckbox);
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
		handleFirstTabForCheckbox(e) {
			if (e.key === "Tab") {
				window.removeEventListener("keydown", this.handleFirstTabForCheckbox);
				window.addEventListener("click", this.handleFirstClickForCheckBox);
				this.$refs.icon.classList.add("user-is-tabbing");
			}
		},
		handleFirstClickForCheckBox() {
			window.removeEventListener("click", this.handleFirstClickForCheckBox);
			window.addEventListener("keydown", this.handleFirstTabForCheckbox);
			this.$refs.icon.classList.remove("user-is-tabbing");
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

$border-color: var(--color-gray);
$border-color-active: var(--color-accent);

label {
	position: relative;
}

.icon {
	position: relative;
	display: inline-block;
}

.checkbox {
	width: 0.7em;
	height: 0.7em;
	border: var(--border-width-bold) solid $border-color;
	border-radius: var(--radius-sm);
	transition: border-color var(--duration-transition-medium);
}

.switch {
	width: 1.2em;
	height: 0.7em;
	background-color: $border-color;
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

input:checked + .checkbox {
	border-color: $border-color-active;
	// create checkmark
	&::after {
		display: block;
		width: 0.2em;
		height: 0.4em;
		margin: auto;
		content: "";
		border: solid $border-color-active;
		border-width: 0 var(--border-width-bold) var(--border-width-bold) 0;
		transform: rotate(45deg);
	}
}

input:checked + .switch {
	background-color: $border-color-active;
	&::before {
		transform: translateX(100%);
	}
}

input:focus + .icon {
	outline: none;
	&.user-is-tabbing {
		outline: 2px solid #4d90fe;
		outline-offset: 0.05em;
	}
}
</style>
