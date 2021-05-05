<template>
	<legacy-logged-in>
		<v-app class="content">
			<v-main>
				<v-container class='d-flex justify-center'>
					<v-responsive max-width='80ch'>
						<Nuxt />
					</v-responsive>
				</v-container>
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

.content {
	grid-area: content;
	width: inherit;
}
</style>
