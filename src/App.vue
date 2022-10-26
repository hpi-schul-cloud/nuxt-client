<template>
	<v-app>
		<legacy-logged-in>
			<v-main id="main-content" class="content">
				<snackbar />
				<router-view />
			</v-main>
			<loading-state-dialog />
		</legacy-logged-in>
	</v-app>
</template>

<script>
import LegacyLoggedIn from "@/layouts/legacyLoggedIn";
import Snackbar from "@/components/molecules/Alert";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog";
import Cookies from "universal-cookie";
import { authModule } from "@/store";
import { $axios } from "@/utils/api";

export default {
	components: {
		LoadingStateDialog,
		LegacyLoggedIn,
		Snackbar,
	},
	created() {
		const cookies = new Cookies();
		const jwt = cookies.get("jwt");
		authModule.setAccessToken(jwt);
		$axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
	},

	mounted() {
		authModule.populateUser();
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
