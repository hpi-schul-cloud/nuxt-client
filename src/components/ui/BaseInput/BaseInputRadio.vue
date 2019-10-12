<template>
	<label>
		<input
			:id="`radio-${$uid}`"
			ref="hiddenInput"
			v-bind="$attrs"
			:checked="vmodel === value"
			:value="value"
			type="radio"
			class="visually-hidden"
			@change="$emit('input', $event.target.value)"
		/>
		<span ref="radio" class="radio" />
		<span class="label" :for="`radio-${$uid}`">
			{{ label }}
		</span>
	</label>
</template>
<script>
import uidMixin from "@mixins/uid";
export const supportedTypes = ["radio"];

export default {
	mixins: [uidMixin],
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
			if (e.key === "Tab" || e.keyCode.toString() === "9") {
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

label {
	position: relative;
}

.radio {
	position: relative;
	display: inline-block;
	width: 0.7em;
	height: 0.7em;
	border: 2px solid var(--color-tertiary);
	border-radius: var(--radius-round);
}

input {
	line-height: var(--line-height-md);
}

input:checked + .radio {
	&::before {
		display: block;
		width: 60%;
		height: 60%;
		/* stylelint-disable */
		margin: 20% auto;
		/* stylelint-enable */
		content: "";
		background: var(--color-tertiary);
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
