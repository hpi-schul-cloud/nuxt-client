<template>
	<legacy-logged-in>
		<v-app class="content">
			<v-main>
				<Nuxt />
			</v-main>
		</v-app>
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
@import "@variables";

.content {
	grid-area: content;
	width: inherit;
}
</style>
