<template>
	<base-input
		v-bind="{ ...$attrs, ...$props }"
		:vmodel="vmodel"
		classes="h1"
		:label-hidden="true"
	/>
</template>
<script>
export default {
	inheritAttrs: false,
	model: {
		prop: "vmodel",
		event: "update:vmodel",
	},
	props: {
		vmodel: {
			type: [String, Number],
			required: true,
		},
	},
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>
