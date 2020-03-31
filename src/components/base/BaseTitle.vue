<template>
	<h1 class="h2">
		<slot />
	</h1>
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
@import "@variables";

.h2 {
	margin-left: var(--space-xl-3);
}
</style>
