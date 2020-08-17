<template>
	<component
		:is="component"
		:vmodel="vmodel"
		v-bind="{ ...$attrs, ...$props }"
		class="input"
		@input="$emit('update:vmodel', $event)"
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
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
	computed: {
		component() {
			return componentDictionary[this.type];
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
};
</script>

<style lang="scss" scoped>
@import "@styles";

.input {
	margin-bottom: var(--space-md);
}
</style>
