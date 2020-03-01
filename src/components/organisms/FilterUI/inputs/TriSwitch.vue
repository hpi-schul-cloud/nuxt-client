<template>
	<div class="tri-state-toggle">
		<span v-if="label" class="label">{{ label }}</span>
		<span>
			<input
				v-for="option in options"
				:key="option.label"
				v-model="vmodelProxy"
				type="radio"
				:name="JSON.stringify(options)"
				:value="option.value"
				:aria-label="option.label"
			/>
		</span>
	</div>
</template>

<script>
import { inputDataTypes } from "./helper";

export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		value: {
			type: inputDataTypes,
			default: undefined,
		},
		label: {
			type: String,
			default: "",
		},
		options: {
			type: Array,
			default: () => [
				{ value: false, label: "false" },
				{ value: undefined, label: "undefined" },
				{ value: true, label: "true" },
			],
			validator: (options) => {
				if (!options.length === 3) {
					throw new Error("you must specify 3 options");
				}
				return options.every((option, index) => {
					if (!Object.prototype.hasOwnProperty.call(option, "label")) {
						throw new Error(`option ${index} is missing a label`);
					}
					return (
						Object.prototype.hasOwnProperty.call(option, "label") &&
						Object.prototype.hasOwnProperty.call(option, "value")
					);
				});
			},
		},
	},
	computed: {
		vmodelProxy: {
			get() {
				return this.value;
			},
			set(to) {
				this.$emit("input", to);
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.tri-state-toggle {
	* {
		box-sizing: border-box;
	}

	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
	padding: 0;
	margin: 0 auto;
	white-space: nowrap;
	border: 0;

	.label {
		flex: 1;
	}
	input {
		display: inline-block;
		width: 32px;
		height: 32px;
		padding: 0;
		margin: 0;
		visibility: hidden;
		&::before {
			box-sizing: border-box;
			display: block;
			width: 32px;
			height: 32px;
			padding: var(--space-lg) 0;
			font-size: var(--font-weight-normal);
			line-height: var(--line-height-md);
			color: var(--color-white);
			text-align: center;
			visibility: visible;
			background-color: var(color-gray);
			transition: background-color 0.3s ease-in-out;
		}
		&:nth-of-type(1)::before {
			content: "✖";
			border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
		}
		&:nth-of-type(2)::before {
			content: "◯";
		}
		&:nth-of-type(3)::before {
			content: "✔";
			border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
		}
		&:nth-of-type(1):checked::before {
			background-color: var(--color-danger);
			border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
		}
		&:nth-of-type(2):checked::before {
			background-color: var(--color-gray);
		}
		&:nth-of-type(3):checked::before {
			background-color: var(--color-success);
			border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
		}
	}
}
</style>
