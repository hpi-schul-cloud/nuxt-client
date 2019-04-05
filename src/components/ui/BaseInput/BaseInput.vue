<template>
	<component
		:is="getComponent(type)"
		:vmodel="vmodel"
		v-bind="{ ...$attrs, ...$props }"
		@input="$emit('update:vmodel', $event)"
	/>
</template>

<script>
import BaseInputDefault from "./BaseInputDefault.vue";
import BaseInputCalendar from "./BaseInputCalendar.vue";
import BaseInputCheckbox from "./BaseInputCheckbox.vue";
import BaseInputRadio from "./BaseInputRadio.vue";

const componentDictionary = {
	email: BaseInputDefault,
	password: BaseInputDefault,
	search: BaseInputDefault,
	tel: BaseInputDefault,
	text: BaseInputDefault,
	url: BaseInputDefault,
	number: BaseInputDefault,
	hidden: BaseInputDefault,
	// date: BaseInputCalendar,
	// time: BaseInputCalendar,
	switch: BaseInputCheckbox,
	checkbox: BaseInputCheckbox,
	// radio: BaseInputRadio,
};

const inputTypes = Object.keys(componentDictionary);
export { inputTypes };

export default {
	//inheritAttrs: false,
	model: {
		prop: "vmodel",
		event: "update:vmodel",
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return !!componentDictionary[type];
			},
		},
		vmodel: {
			type: [Array, String, Number, Boolean],
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		hint: {
			type: String,
			default: "",
		},
		error: {
			type: String,
			default: "",
		},
	},
	methods: {
		getComponent(type) {
			return componentDictionary[type];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
