<template>
	<component
		:is="component"
		:vmodel="vmodel"
		:validation-error="validationMessage"
		v-bind="{ ...$attrs, ...$props }"
		class="input"
		@input="handleInput($event)"
		@blur="handleBlur($event)"
		@focus="handleFocus($event)"
	>
		<template v-for="(cmp, name) in $slots" v-slot:[name]>
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
import BaseInputHidden, {
	supportedTypes as hiddenInputTypes,
} from "./BaseInputHidden";
import BaseInputCheckbox, {
	supportedTypes as checkboxInputTypes,
} from "./BaseInputCheckbox";
import BaseInputRadio, {
	supportedTypes as radioInputTypes,
} from "./BaseInputRadio";

const componentDictionary = {};
defaultInputTypes.forEach(
	(type) => (componentDictionary[type] = BaseInputDefault)
);
hiddenInputTypes.forEach(
	(type) => (componentDictionary[type] = BaseInputHidden)
);
checkboxInputTypes.forEach(
	(type) => (componentDictionary[type] = BaseInputCheckbox)
);
radioInputTypes.forEach((type) => (componentDictionary[type] = BaseInputRadio));
export const supportedTypes = Object.keys(componentDictionary);

export const validationDelay = 800;

export default {
	model: {
		prop: "vmodel",
		event: "update:vmodel",
	},
	props: {
		vmodel: {
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
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		component() {
			return componentDictionary[this.type];
		},
		validationMessage() {
			if (this.validationModel && this.validationModel.$dirty) {
				for (const entry of this.validationMessages) {
					if (!this.validationModel[entry.key]) {
						return entry.message;
					}
				}
			}
			return "";
		},
	},
	created() {
		if (!componentDictionary[this.type]) {
			console.error(
				`invalid prop type ${this.type}:\n` +
					`$attrs ${JSON.stringify(this.$attrs)}`
			);
		}
	},
	methods: {
		handleInput(event) {
			if (this.validationModel) {
				this.validationModel.$reset();
				if (this.validationModel.$futureTouch) {
					clearTimeout(this.validationModel.$futureTouch);
				}
				this.validationModel.$futureTouch = setTimeout(
					() => this.validationModel.$touch(),
					validationDelay
				);
			}

			this.$emit("update:vmodel", event);
			this.$emit("input", event);
		},
		handleBlur(event) {
			this.validationModel && this.validationModel.$touch();
			this.$emit("blur", event);
		},
		handleFocus(event) {
			this.$emit("focus", event);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.input {
	margin-bottom: var(--space-md);
}
</style>
