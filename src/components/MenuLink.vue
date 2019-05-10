<template>
	<base-link class="link" v-bind="$attrs">
		<slot />
	</base-link>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@styles";

.link {
	padding: var(--space-sm) var(--space-md);
	color: var(--color-black);
	text-decoration: none;

	&:hover {
		background-color: var(--color-gray-light);
	}
}
</style>
