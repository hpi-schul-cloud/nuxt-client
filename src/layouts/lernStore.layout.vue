<template>
	<v-app>
		<!-- NUXT_REMOVAL: Testival alert -->
		<v-alert
			color="red lighten-2"
			dark
			dense
			class="ma-2"
			style="text-align: center"
		>
			Bug Hunt: You are on a Vue page
		</v-alert>
		<legacy-logged-in v-if="legacyLayout">
			<v-main id="main-content" class="content">
				<snackbar />
				<router-view />
			</v-main>
			<loading-state-dialog />
		</legacy-logged-in>

		<router-view v-else />
	</v-app>
</template>

<script>
import LegacyLoggedIn from "@/layouts/legacyLoggedIn";
import Snackbar from "@/components/molecules/Alert";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";
import { contentModule } from "@/store";

export default {
	name: "lernStoreLayout",
	components: {
		LoadingStateDialog,
		LegacyLoggedIn,
		Snackbar,
	},
	computed: {
		legacyLayout() {
			return (
				String(this.$route.query.isCollection) === "true" &&
				contentModule.getCollectionsFeatureFlag === true
			);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.content {
	grid-area: content;
	width: inherit;
	max-width: 100vw;

	@include breakpoint(tablet) {
		max-width: calc(100vw - var(--sidebar-width-tablet));
	}

	@include breakpoint(desktop) {
		max-width: calc(100vw - var(--sidebar-width));
	}
}
</style>
