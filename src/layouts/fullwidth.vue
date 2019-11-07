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
			LegacyLoggedIn
		},
	}
</script>

<style lang="scss" scoped>
	@import "@styles";

	.content {
		grid-area: content;
		min-width: var(--size-content-width-min);
		max-width: var(--size-content-width-max);
		padding: 0 var(--space-lg);
		margin: 0 auto;

		@include breakpoint(tablet) {
			padding: 0 var(--space-xl);
		}
	}
</style>
