<template>
	<v-switch
		v-model="model"
		:label="label"
		inset
		flat
		dense
		:ripple="false"
		:class="customClasses"
		@change="($event) => $emit('input-changed', $event)"
	></v-switch>
</template>

<script>
export default {
	model: {
		prop: "value",
		event: "input-changed",
	},
	props: {
		value: {
			type: Boolean,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		customClasses: {
			type: String,
			default: "",
		},
	},
	data() {
		return { model: this.value };
	},
};
</script>
