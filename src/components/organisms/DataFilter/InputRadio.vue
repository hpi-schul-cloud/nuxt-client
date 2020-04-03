<template>
	<div>
		<legend v-if="label" class="label">{{ label }}</legend>
		<label v-for="option in options" :key="option.label" class="label">
			<div class="wrapper">
				<base-input
					v-model="vmodelProxy"
					type="radio"
					:name="$ui"
					:value="option.value"
					:label="option.label"
				/>
			</div>
		</label>
	</div>
</template>

<script>
import uid from "@mixins/uid";

export default {
	mixins: [uid],
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: [Boolean, Array],
			validator: (prop) => prop.every((e) => typeof e === "string"),
			default: () => [],
		},
		options: {
			type: Array,
			default: () => [
				{ value: "10", label: "Radio1" },
				{ value: "25", label: "Radio2" },
				{ value: "100", label: "Radio3" },
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
<style lang="scss">
@import "@styles";

.wrapper {
	padding-bottom: var(--space-xs);
	padding-left: var(--space-sm);
}
</style>
