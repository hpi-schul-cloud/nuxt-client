import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import ImpressumView from "../views/ImpressumView.vue";

const routes: Array<RouteRecordRaw> = [
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
