<template>
	<v-app>
		<legacy-logged-in>
			<v-main id="main-content" class="content">
				<snackbar />
				<Nuxt />
			</v-main>
			<loading-state-dialog />
		</legacy-logged-in>
	</v-app>
</template>

<script>
import LegacyLoggedIn from "@/layouts/legacyLoggedIn";
import Snackbar from "@/components/molecules/Alert";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";

export default {
	components: {
		LoadingStateDialog,
		LegacyLoggedIn,
		Snackbar,
	},
};
</script>

<style lang="scss" scoped>
@import "@styles";

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
