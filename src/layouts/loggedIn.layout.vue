<template>
	<legacy-logged-in>
		<v-main id="main-content" class="content">
			<application-error-wrapper>
				<snackbar />
				<router-view />
			</application-error-wrapper>
		</v-main>
		<loading-state-dialog />
	</legacy-logged-in>
</template>

<script>
import LegacyLoggedIn from "@/layouts/legacyLoggedIn";
import Snackbar from "@/components/molecules/Alert";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper";

export default {
	name: "LoggedInLayout",

	components: {
		LoadingStateDialog,
		LegacyLoggedIn,
		Snackbar,
		ApplicationErrorWrapper,
	},
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.content {
	grid-area: content;
	width: inherit;
	max-width: 100vw;
	overflow-x: auto;
}
</style>
