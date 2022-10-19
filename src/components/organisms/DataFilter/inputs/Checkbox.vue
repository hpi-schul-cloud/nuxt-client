<template>
	<fieldset>
		<legend v-if="label" class="label">{{ label }}</legend>
		<base-input
			v-for="option in options"
			:key="option.label"
			v-model="vmodelProxy"
			class="input-checkbox"
			type="checkbox"
			:name="$uid"
			:value="option.value"
			:label="option.label"
		/>
	</fieldset>
</template>

<script>
import uid from "@/mixins/uid";

export default {
	mixins: [uid],
	props: {
		label: {
			type: String,
			default: "",
		},
		value: {
			type: Array,
			default: () => [],
			validator: (prop) => prop.every((e) => typeof e === "string"),
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
<style lang="scss" scoped>
@import "@styles";

fieldset {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	max-height: 70vh;
	padding: 0;
	margin: 0;
	border: none;
}

.label {
	margin-bottom: var(--space-xs);
}

.input-checkbox {
	margin-bottom: var(--space-xs);
	margin-left: var(--space-sm);
}
</style>
