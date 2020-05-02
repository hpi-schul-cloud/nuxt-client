<!-- TODO: The component will be implemented on a separate branch -->
<template>
	<div class="text-content">
		{{ fieldData }}
	</div>
</template>
<script>
export default {
	props: {
		fieldData: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";
</style>
