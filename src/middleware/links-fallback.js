import EnvConfigModule from "@/store/env-config";
const vueRoutes = require("@serverMiddleware/routes.js");

const isNuxtRoute = (url) =>
	vueRoutes.some((regexString) => !!new RegExp(regexString).exec(url));

export default async function (ctx) {
	const { route } = ctx;
	const { FALLBACK_DISABLED } = EnvConfigModule.getEnv;

	if (FALLBACK_DISABLED) {
		return true;
	}

	const useNuxt = isNuxtRoute(route.path);

	// prevent loop when ID not castable
	if (window.location.pathname == route.path) {
		return true;
	}

	if (!useNuxt) {
		window.location = route.path;
		// prevent rendering of nuxt during window load (switch to fallback)
		return new Promise((resolve) => {
			setTimeout(resolve, 10000);
		});
	}

	// use vue
	return true;
}
