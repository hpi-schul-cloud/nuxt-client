<template>
	<div class="grid">
		<slot/>
	</div>
</template>

<style lang="scss" scoped>
@import "@variables";

.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
	grid-gap: var(--space-lg);
	border: 2px dotted green;
}
</style>
