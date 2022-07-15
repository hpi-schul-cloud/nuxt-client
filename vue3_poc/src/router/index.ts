import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ImpressumView from "../pages/ImpressumView.vue";
import HomeView from "../pages/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "home",
		component: HomeView,
	},
	{
		path: "/imp",
		name: "imp",
		component: ImpressumView,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
