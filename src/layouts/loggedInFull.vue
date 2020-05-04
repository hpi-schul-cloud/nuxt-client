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
	min-height: 100vh;
	padding: 0;
}
</style>
