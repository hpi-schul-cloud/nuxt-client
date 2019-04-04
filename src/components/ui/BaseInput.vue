<template>
	<component :is="getComponent(type)" v-bind="$props" class="root">
		<slot />
	</component>
</template>

<script>
import BaseInputSwitch from "./BaseInputSwitch.vue";
import BaseInputRadio from "./BaseInputRadio.vue";
import BaseInputDefault from "./BaseInputDefault.vue";
import BaseInputCalendar from "./BaseInputCalendar.vue";

export default {
	inheritAttrs: false,
	props: {
		type: {
			type: String,
			required: true,
			validator: function(value) {
				return [
					"email",
					"password",
					"search",
					"tel", // Should we support this? it's only supported by safari
					"text",
					"url",
					"number",
					"hidden",
					"textarea",
					"checkbox",
					"date",
					"time",
					"switch",
				].includes(value.toLowerCase());
			},
		},
		id: {
			type: String,
			default: "",
		},
		value: {
			type: String,
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
		placeholder: {
			type: String,
			default: "",
		},
	},
	methods: {
		getComponent(type) {
			return {
				email: BaseInputDefault,
				password: BaseInputDefault,
				//"search":BaseInputDefault, --> not sure
				tel: BaseInputDefault,
				text: BaseInputDefault,
				url: BaseInputDefault,
				number: BaseInputDefault,
				hidden: BaseInputDefault,
				textarea: BaseInputDefault,
				date: BaseInputCalendar,
				time: BaseInputCalendar,
				switch: BaseInputSwitch,
				radio: BaseInputRadio,
			}[type];
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@variables";
</style>
