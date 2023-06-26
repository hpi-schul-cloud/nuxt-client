<template>
	<v-app>
		<legacy-logged-in>
			<v-main id="main-content" class="content">
				<snackbar />
				<router-view />
			</v-main>
			<loading-state-dialog />
		</legacy-logged-in>
		<application-error-routing> </application-error-routing>
	</v-app>
</template>

<script>
import LegacyLoggedIn from "@/layouts/legacyLoggedIn";
import Snackbar from "@/components/molecules/Alert";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";
import ApplicationErrorRouting from "@/components/molecules/ApplicationErrorRouting";

export default {
	name: "LoggedInLayout",

	components: {
		LoadingStateDialog,
		LegacyLoggedIn,
		Snackbar,
		ApplicationErrorRouting,
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
