<template>
	<component
		:is="component"
		:validation-error="validationMessage"
		v-bind="{ ...$attrs, ...$props }"
		:model-value="modelValue"
		class="input"
		@update:model-value="handleInput($event)"
		@blur="handleBlur($event)"
		@focus="handleFocus($event)"
	>
		<template v-for="(cmp, name) in $slots" #[name]>
			<slot :name="name">
				<component :is="cmp.context" :key="name" />
			</slot>
		</template>
	</component>
</template>

<script>
import BaseInputDefault, {
	supportedTypes as defaultInputTypes,
} from "./BaseInputDefault";
import BaseInputCheckbox, {
	supportedTypes as checkboxInputTypes,
} from "./BaseInputCheckbox";
import { logger } from "@util-logger";

const componentDictionary = {};
defaultInputTypes.forEach(
	(type) => (componentDictionary[type] = BaseInputDefault)
);
checkboxInputTypes.forEach(
	(type) => (componentDictionary[type] = BaseInputCheckbox)
);
export const supportedTypes = Object.keys(componentDictionary);

export const validationDelay = 800;

export default {
	props: {
		modelValue: {
			type: [Array, String, Number, Boolean],
			default: undefined,
		},
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type);
			},
		},
		validationModel: {
			type: Object,
			required: false,
			default: null,
		},
		validationMessages: {
			type: Array,
			required: false,
			default: () => [],
		},
	},
	data() {
		return {
			validationObject: null,
		};
	},
	computed: {
		component() {
			return componentDictionary[this.type];
		},
		validationMessage() {
			if (this.validationModel && this.validationModel.$dirty) {
				for (const entry of this.validationMessages) {
					const error = this.validationModel.$errors.find(
						(e) => e.$validator === entry.key
					);
					if (error) {
						return entry.message;
					}
				}
			}
			return "";
		},
	},
	created() {
		if (!componentDictionary[this.type]) {
			logger.error(
				`invalid prop type ${this.type}:\n` +
					`$attrs ${JSON.stringify(this.$attrs)}`
			);
		}
		this.validationObject = this.validationModel;
	},
	methods: {
		handleInput(event) {
			if (this.validationObject) {
				this.validationObject.$reset();
				if (this.validationObject.$futureTouch) {
					clearTimeout(this.validationObject.$futureTouch);
				}
				this.validationObject.$futureTouch = setTimeout(
					() => this.validationObject.$touch(),
					validationDelay
				);
			}

			this.$emit("update:modelValue", event);
			// this.$emit("input", event);
		},
		handleBlur(event) {
			if (this.validationModel) {
				this.validationModel.$touch();
			}
			this.$emit("blur", event);
		},
		handleFocus(event) {
			this.$emit("focus", event);
		},
	},
};
</script>

<style lang="scss" scoped>
.input {
	margin-bottom: var(--space-md);
}
</style>
