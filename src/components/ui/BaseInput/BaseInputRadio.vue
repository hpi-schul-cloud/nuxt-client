<template>
	<label>
		<input
			ref="hiddenInput"
			v-bind="$attrs"
			:checked="vmodel === value"
			:value="value"
			type="radio"
			class="visually-hidden"
			@change="$emit('input', $event.target.value)"
		/>
		<span ref="radio" class="radio" />
		<span class="label">
			{{ label }}
		</span>
	</label>
</template>
<script>
export const supportedTypes = ["radio"];

export default {
	model: {
		prop: "vmodel",
		event: "input",
	},
	props: {
		vmodel: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type);
			},
		},
	},
	mounted() {
		window.addEventListener("keydown", this.handleFirstTabForRadioButton);
	},
	methods: {
		handleFirstTabForRadioButton(e) {
			if (e.key === "Tab") {
				window.removeEventListener(
					"keydown",
					this.handleFirstTabForRadioButton
				);
				window.addEventListener("click", this.handleClickForRadioButton);
				this.$refs.radio.classList.add("user-is-tabbing");
			}
		},
		handleClickForRadioButton() {
			window.removeEventListener("click", this.handleClickForRadioButton);
			window.addEventListener("keydown", this.handleFirstTabForRadioButton);
			this.$refs.radio.classList.remove("user-is-tabbing");
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

.radio {
	position: relative;
	display: inline-block;
	width: 0.7em;
	height: 0.7em;
	border: 2px solid $border-color;
	border-radius: var(--radius-round);
	transition: border-color var(--duration-transition-medium);
}

input:checked + .radio {
	border-color: $border-color-active;
	&::before {
		display: block;
		width: 60%;
		height: 60%;
		/* stylelint-disable */
		margin: 20% auto;
		/* stylelint-enable */
		content: "";
		background: $border-color-active;
		border-radius: var(--radius-round);
	}
}

input:focus + .radio {
	outline: none;
	&.user-is-tabbing {
		outline: 2px solid #4d90fe;
		outline-offset: 0.05em;
	}
}
</style>
