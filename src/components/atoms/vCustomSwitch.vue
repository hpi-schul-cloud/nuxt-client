<template>
	<v-switch
		v-model="model"
		:label="label"
		inset
		flat
		dense
		:ripple="false"
		:class="styles"
		@change="onChange"
	></v-switch>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		styles: {
			type: String,
		},
		onChange: {
			type: Function,
			required: true,
		},
	},
	data() {
		return { model: this.value };
	},
};
</script>
