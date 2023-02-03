import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import { legacyCompatibilityGuard } from "@/router/guards/legacy-route-compatibility.guard";
import { isAuthenticatedGuard } from "@/router/guards/is-authenticated.guard";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: "/",
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
	fallback: false,
});

router.beforeEach(legacyCompatibilityGuard);
router.beforeEach(isAuthenticatedGuard);

export default router;
