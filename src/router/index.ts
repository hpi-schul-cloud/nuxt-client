import { routes } from "./routes";
import { isAuthenticatedGuard } from "@/router/guards/is-authenticated.guard";
import { legacyCompatibilityGuard } from "@/router/guards/legacy-route-compatibility.guard";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory("/"),
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
});

router.beforeEach(legacyCompatibilityGuard);
router.beforeEach(isAuthenticatedGuard);

export default router;
