import { authModule } from "@/store";
import Vue from "vue";
import VueRouter, { NavigationGuardNext, Route } from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: "/",
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
	fallback: false,
});

const assertUserToBeLoggedIn = (
	to: Route,
	_: Route,
	next: NavigationGuardNext
) => {
	const userIsLoggedIn = authModule.isLoggedIn;
	// console.log("--- router logged in: ", userIsLoggedIn);

	const pageRequiresUserToBeLoggedIn = checkPageRequiresUserToBeLoggedIn(to);

	if (pageRequiresUserToBeLoggedIn && !userIsLoggedIn) {
		window.location.assign(`/login?redirect=${to.fullPath}`);
	} else {
		next();
	}
};

const checkPageRequiresUserToBeLoggedIn = (route: Route) => {
	if (typeof route.meta?.requiresLogin === "boolean") {
		return route.meta.requiresLogin;
	} else {
		// by default pages require the user to be logged in
		return true;
	}
};

router.beforeEach(assertUserToBeLoggedIn);

export default router;
