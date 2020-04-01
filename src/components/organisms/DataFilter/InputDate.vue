<template>
	<label class="label">
		{{ label }}
		<base-input
			v-for="option in options"
			:key="option.label"
			v-model="vmodelProxy"
			type="date"
			class="input-field"
			:placeholder="option.placeholder"
			:label="option.label"
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
			default: "0",
		},
		options: {
			type: Array,
			default: () => [{ placeholder: "Filtern nach..", label: "Geburtsdatum" }],
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
