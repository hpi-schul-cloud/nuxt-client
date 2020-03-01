<template>
	<button type="button" tab-index="0" class="toggle" @click="nextState">
		<span class="toggle-text">
			{{ options[currentIndex].label }}
		</span>
	</button>
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
		options: {
			type: Array,
			default: () => [
				{ value: false, label: "✖" },
				{ value: undefined, label: "◯" },
				{ value: true, label: "✔" },
			],
			validator: (options) => {
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
	data() {
		return {
			currentIndex: 0,
		};
	},
	watch: {
		value() {
			this.loadIndex();
		},
	},
	created() {
		this.loadIndex();
	},
	methods: {
		loadIndex() {
			let newIndex = this.options.findIndex(
				(option) => option.value === this.value
			);
			if (newIndex === -1) {
				if (this.value === undefined) {
					newIndex = 0;
				} else {
					throw new Error("Can't find value in options", this.value);
				}
			}
			this.currentIndex = newIndex;
		},
		nextState() {
			this.currentIndex = (this.currentIndex + 1) % this.options.length;
			this.$emit("input", this.options[this.currentIndex].value);
		},
	},
};
</script>

<style lang="scss" scoped>
.toggle {
	display: flex;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
	width: 100%;
	min-width: var(--space-xl);
	min-height: var(--space-xl);
	padding: var(--space-xs-3);
	font-weight: var(--font-weight-bold);
	background: transparent;
	border: 1px solid grey;
	border-radius: var(--radius-lg);
}
</style>
