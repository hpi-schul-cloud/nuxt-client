<template>
	<div>
		<legend v-if="label" class="label">{{ label }}</legend>
		<base-input
			v-for="option in options"
			:key="option.label"
			v-model="vmodelProxy"
			:name="option.label + option.value"
			:value="option.value"
			type="checkbox"
			:label="option.label"
		/>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: [Boolean, Array],
			default: () => [],
			validator: (prop) => prop.every((e) => typeof e === "string"),
		},
		options: {
			type: Array,
			default: () => [
				{ value: "A", label: "Checkbox 1" },
				{ value: "B", label: "Checkbox 2" },
				{ value: "C", label: "Checkbox 3" },
			],
			validator: (options) => {
				return options.every((option, index) => {
					if (!Object.prototype.hasOwnProperty.call(option, "label")) {
						throw new Error(`option ${index} is missing a label`);
					}
					if (!Object.prototype.hasOwnProperty.call(option, "value")) {
						throw new Error(`option ${index} is missing a value`);
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
