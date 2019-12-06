<template>
	<legacy-logged-in>
		<base-content-container tag="main" class="content">
			<Nuxt />
		</base-content-container>
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
	min-height: 100vh;
	padding: 0 var(--space-lg);

	@include breakpoint(tablet) {
		padding: 0 var(--space-xl-3);
	}
}
</style>
