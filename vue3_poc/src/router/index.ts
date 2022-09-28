import {
	createRouter,
	createWebHistory,
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecordRaw,
} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import TaskListPage from "@/pages/TaskListPage.vue";
import VitestProofOfConcept from "@/components/VitestProofOfConcept.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { useAuthStore } from "@/store/auth";

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
		path: "/tasks",
		name: "tasks",
		component: TaskListPage,
	},
	{
		path: "/imprint",
		name: "imprint",
		// route level code-splitting
		// this generates a separate chunk (About.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import("../pages/ImpressumPage.vue"),
	},
	{
		path: "/:catchAll(.*)",
		name: "notFound",
		component: NotFoundPage,
		meta: {
			requiresAuth: false,
		},
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

const assertUserToBeLoggedIn = (
	to: RouteLocationNormalized,
	_: RouteLocationNormalized,
	next: NavigationGuardNext
) => {
	const authStore = useAuthStore();
	const userIsLoggedIn = authStore.isLoggedIn;
	// console.log("--- logged in: ", userIsLoggedIn);

	const pageRequiresUserToBeLoggedIn = checkPageRequiresUserToBeLoggedIn(to);

	if (pageRequiresUserToBeLoggedIn && !userIsLoggedIn) {
		window.location.assign(`/login?redirect=${to.fullPath}`);
	} else {
		next();
	}
};

const checkPageRequiresUserToBeLoggedIn = (route: RouteLocationNormalized) => {
	if (typeof route.meta.requiresLogin === "boolean") {
		return route.meta.requiresLogin;
	} else {
		// by default pages require the user to be logged in
		return true;
	}
};

router.beforeEach(assertUserToBeLoggedIn);

export default router;
