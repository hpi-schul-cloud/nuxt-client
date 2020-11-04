<template>
	<legacy-logged-in>
		<main id="main-content" class="content" :class="{ inline: isInline }">
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
	computed: {
		isInline() {
			return !!this.$route.query.inline;
		},
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
.content.inline {
	min-height: 100vh;
}
</style>
