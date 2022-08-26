import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import VitestProofOfConcept from "@/components/VitestProofOfConcept.vue";

const routes: Readonly<RouteRecordRaw[]> = [
	{
		path: "/",
		name: "home",
		component: HomePage,
	},
	{
		path: "/vitest",
		name: "vitest",
		component: VitestProofOfConcept,
	},
	{
		path: "/imprint",
		name: "imprint",
		// route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import("../pages/ImpressumPage.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
