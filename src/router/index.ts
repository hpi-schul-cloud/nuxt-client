import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import Cookies from "universal-cookie";
import { authModule, envConfigModule } from "@/store";
import axios from "axios";
import { initializeAxios } from "@/utils/api";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: "/",
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
	fallback: false,
});

router.beforeEach(async () => {
	console.log("### before global created");

	axios.defaults.baseURL = `${window.origin}/api`;
	const cookies = new Cookies();
	const jwt = cookies.get("jwt");
	authModule.setAccessToken(jwt);
	axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
	initializeAxios(axios);
	Vue.prototype.$axios = axios;

	await envConfigModule.findEnvs();
	await authModule.populateUser();

	console.log("### after global created");
});

export default router;
