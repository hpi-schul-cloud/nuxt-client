<template>
	<h1 class="h2">
		<slot />
	</h1>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@variables";

.h2 {
	margin-left: var(--space-xl-3);
}
</style>
