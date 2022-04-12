import Vue from "vue";
import Router from "vue-router";
import { routes } from "./routes";

Vue.use(Router);

export function createRouter() {
	const router = new Router({
		mode: "history",
		base: "/",
		linkActiveClass: "nuxt-link-active",
		linkExactActiveClass: "nuxt-link-exact-active",
		routes,
		fallback: false,
	});

	const resolve = router.resolve.bind(router);

	router.resolve = (to, current, append) => {
		return resolve(to, current, append);
	};

	return router;
}
