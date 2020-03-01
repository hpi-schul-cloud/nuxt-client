<template>
	<fieldset class="checkbox-list">
		<label v-for="option in options" :key="option.label" class="label">
			<input
				v-model="vmodelProxy"
				type="checkbox"
				:name="option.label + option.value"
				:value="option.value"
			/>
			{{ option.label }}
		</label>
	</fieldset>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		value: {
			type: [Boolean, Array],
			default: () => [],
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
.checkbox-list {
	display: block;
	border: 0;
	.label {
		display: block;
	}
}
</style>
