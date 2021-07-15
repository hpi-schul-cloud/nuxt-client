<template>
	<v-switch
		v-model="model"
		:label="label"
		inset
		flat
		dense
		:ripple="false"
		:class="styles"
		@change="($event) => $emit('input-changed', $event)"
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
			default: "",
		},
	},
	data() {
		return { model: this.value };
	},
};
</script>
