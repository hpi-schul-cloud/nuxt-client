import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";
import { legacyCompatibilityGuard } from "@/router/guards/legacy-route-compatibility.guard";
import { isAuthenticatedGuard } from "@/router/guards/is-authenticated.guard";

const router = createRouter({
	history: createWebHashHistory(),
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
});

router.beforeEach(legacyCompatibilityGuard);
router.beforeEach(isAuthenticatedGuard);

export default router;
