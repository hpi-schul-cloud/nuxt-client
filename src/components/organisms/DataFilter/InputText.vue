<template>
	<label class="label">
		{{ label }}

		<base-input
			v-for="option in options"
			:key="option.label"
			v-model="vmodelProxy"
			class="input-field"
			:label="option.label"
			type="text"
			:placeholder="option.placeholder"
		/>
	</label>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input",
	},
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: String,
			default: "",
		},
		options: {
			type: Array,
			default: () => [{ placeholder: "Filtern nach..", label: "Name" }],
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
@import "@styles";
.input-field {
	max-width: 100%;

	@include breakpoint(tablet) {
		max-width: 50%;
	}
}
</style>
