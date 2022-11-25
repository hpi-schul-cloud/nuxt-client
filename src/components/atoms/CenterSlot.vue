<template>
	<div class="content"><slot /></div>
</template>
<script>
export default {
	data() {
		// This solely exists to appear in the coverage report
		return {};
	},
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
