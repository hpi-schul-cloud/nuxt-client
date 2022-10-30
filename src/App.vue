<template>
	<v-app v-if="isInitialized">
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
import axios from "axios";
import Cookies from "universal-cookie";
import { authModule, envConfigModule } from "./store";
import { initializeAxios } from "./utils/api";
import Vue from "vue";

export default {
	components: {
		LoadingStateDialog,
		LegacyLoggedIn,
		Snackbar,
	},
	data() {
		return {
			isInitialized: false,
		};
	},
	async created() {
		axios.defaults.baseURL = `${window.origin}/api`;
		const cookies = new Cookies();
		const jwt = cookies.get("jwt");
		authModule.setAccessToken(jwt);
		axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
		initializeAxios(axios);
		Vue.prototype.$axios = axios;

		await envConfigModule.findEnvs();
		await authModule.populateUser();

		this.isInitialized = true;
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
