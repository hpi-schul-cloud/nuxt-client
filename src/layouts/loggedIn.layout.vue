<template>
	<legacy-logged-in>
		<v-main id="main-content" class="content">
			<application-error-wrapper>
				<alert-container />
				<router-view />
			</application-error-wrapper>
		</v-main>
		<loading-state-dialog />
	</legacy-logged-in>
</template>

<script>
import LegacyLoggedIn from "@/layouts/legacyLoggedIn";
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper";

export default {
	name: "LoggedInLayout",

	components: {
		LoadingStateDialog,
		LegacyLoggedIn,
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
