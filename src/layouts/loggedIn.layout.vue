<template>
	<new-logged-in-layout>
		<v-main id="main-content" class="content">
			<application-error-wrapper>
				<alert-container />
				<router-view />
			</application-error-wrapper>
		</v-main>
		<loading-state-dialog />
	</new-logged-in-layout>
</template>

<script>
// import LegacyLoggedIn from "@/layouts/legacyLoggedIn";
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper";
import NewLoggedInLayout from "./newLoggedIn.layout.vue";

export default {
	name: "LoggedInLayout",

	components: {
		LoadingStateDialog,
		// LegacyLoggedIn,
		NewLoggedInLayout,
		AlertContainer,
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
