import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	base: "/",
	linkActiveClass: "nuxt-link-active",
	linkExactActiveClass: "nuxt-link-exact-active",
	routes,
	fallback: false,
});

export default router;
