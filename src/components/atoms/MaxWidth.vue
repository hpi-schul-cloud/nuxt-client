<template>
	<div class="container-max-width">
		<slot />
	</div>
</template>

<style lang="scss" scoped>
@import "@variables";

.container-max-width {
	max-width: var(--size-content-width-max);
}
</style>
