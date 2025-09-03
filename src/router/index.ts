import { legacyCompatibilityGuard } from "@/router/guards";
import { isAuthenticatedGuard } from "@/router/guards/is-authenticated.guard";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
	history: createWebHistory("/"),
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
});

router.beforeEach(legacyCompatibilityGuard);
router.beforeEach(isAuthenticatedGuard);

export default router;
