import Vue from "vue";
import Router from "vue-router";
import { routes } from "./routes";

const emptyFn = () => {};

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

	// TODO: remove in Nuxt 3
	const originalPush = router.push;
	router.push = function push(location, onComplete = emptyFn, onAbort) {
		return originalPush.call(this, location, onComplete, onAbort);
	};

	const resolve = router.resolve.bind(router);
	router.resolve = (to, current, append) => {
		return resolve(to, current, append);
	};

	return router;
}
