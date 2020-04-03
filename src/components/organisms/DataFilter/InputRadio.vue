<template>
	<fieldset>
		<legend v-if="label" class="label">{{ label }}</legend>
		<label v-for="option in options" :key="option.label" class="label">
			<div class="wrapper">
				<base-input
					v-model="vmodelProxy"
					type="radio"
					:name="$uid"
					:value="option.value"
					:label="option.label"
				/>
			</div>
		</label>
	</fieldset>
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
			type: String,
			default: "",
		},
		options: {
			type: Array,
			required: true,
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
