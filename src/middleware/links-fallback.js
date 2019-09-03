const vueRoutes = require("../serverMiddleware/routes.js");

const isNuxtRoute = (url) =>
	vueRoutes.some((regexString) => !!new RegExp(regexString).exec(url));

export default async function(ctx) {
	const { route } = ctx;

	if (process.env.FALLBACK_DISABLED) {
		return;
	}

	const useNuxt = isNuxtRoute(route.path);

	// prevent loop when ID not castable
	if (window.location.pathname == route.path) {
		return;
	}

	if (!useNuxt) {
		window.location = route.path;
		// prevent rendering of nuxt during window load (switch to fallback)
		return new Promise((resolve) => {
			setTimeout(resolve, 10000);
		});
	}

	// use vue
}
