import { routes } from "./routes";
import { legacyCompatibilityGuard } from "@/router/guards/legacy-route-compatibility.guard";
import { isAuthenticatedGuard } from "@/router/guards/is-authenticated.guard";
import VueRouter from "vue-router";

const router = VueRouter.createRouter({
	history: VueRouter.createWebHashHistory(),
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
});

router.beforeEach(legacyCompatibilityGuard);
router.beforeEach(isAuthenticatedGuard);

export default router;
