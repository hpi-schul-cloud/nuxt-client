<template>
	<component
		:is="getComponent(type)"
		:value="value"
		v-bind="{ ...$attrs, ...$props }"
		@input="$emit('input', $event)"
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
	date: BaseInputCalendar,
	time: BaseInputCalendar,
	switch: BaseInputCheckbox,
	checkbox: BaseInputCheckbox,
	radio: BaseInputRadio,
};

export default {
	//inheritAttrs: false,
	props: {
		type: {
			type: String,
			required: true,
			validator: (type) => {
				return !!componentDictionary[type];
			},
		},
		value: {
			type: [String, Number, Boolean],
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
