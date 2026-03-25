import { routes } from "./routes";
import { clearApplicationErrorGuard } from "@/router/guards/clear-application-error.guard";
import { isAuthenticatedGuard } from "@/router/guards/is-authenticated.guard";
import { legacyCompatibilityGuard } from "@/router/guards/legacy-route-compatibility.guard";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory("/"),
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return { top: 0 };
	},
});

router.beforeEach(clearApplicationErrorGuard);
router.beforeEach(legacyCompatibilityGuard);
router.beforeEach(isAuthenticatedGuard);

export default router;
