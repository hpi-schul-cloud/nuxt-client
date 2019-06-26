<template>
	<component
		:is="component"
		:vmodel="vmodel"
		v-bind="{ ...$attrs, ...$props }"
		@input="$emit('update:vmodel', $event)"
	>
		<template v-for="(cmp, name) in $slots">
			<slot :slot="name" :name="name">
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
import BaseInputCalendar, {
	supportedTypes as calendarInputTypes,
} from "./BaseInputCalendar";
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
calendarInputTypes.forEach(
	(type) => (componentDictionary[type] = BaseInputCalendar)
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
			required: true,
		},
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return supportedTypes.includes(type);
			},
		},
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
</style>
