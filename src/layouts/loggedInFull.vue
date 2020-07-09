<template>
	<legacy-logged-in>
		<main class="content">
			<Nuxt />
		</main>
	</legacy-logged-in>
</template>

<script>
import LegacyLoggedIn from "@layouts/legacyLoggedIn";

export default {
	components: {
		LegacyLoggedIn,
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

.content {
	grid-area: content;
	width: inherit;
	min-height: calc(100vh - var(--sidebar-item-height));
	padding: 0 var(--space-lg);
	overflow-x: auto;

	@include breakpoint(tablet) {
		padding: 0 var(--space-xl-3);
	}
}
</style>
