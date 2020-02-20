<template>
	<base-input
		v-bind="{ ...$attrs, ...$props }"
		:vmodel="vmodel"
		classes="h1"
		:label-hidden="true"
		v-on="$listeners"
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
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
