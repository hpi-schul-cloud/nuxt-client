const routes = require("../server/routes");

export default async function(ctx) {
	const { route } = ctx;

	if (process.env.FALLBACK_DISABLED) {
		return;
	}

	const segments = route.path.split("/");
	const controllerName = segments[1];
	const legacyRouteConfig = routes.find((r) => {
		return typeof r === "object"
			? r.route.includes(controllerName)
			: r.includes(controllerName);
	});

	// no matching route => use (default) error handler
	if (!route.matched.length) {
		return;
	}
	// no legacy route, but vue route found => use vue version
	if (!legacyRouteConfig) {
		return;
	}
	// prevent loop when ID not castable
	if (window.location.pathname == route.path) {
		return;
	}

	// route defined in vue and legacy client
	// use legacy if not excluded
	const useLegacy =
		// no routes excluded
		!(legacyRouteConfig || {}).routesExcluded ||
		// or current url doesn't match any excluded url
		(legacyRouteConfig.routesExcluded || []).every((excludedRoute) => {
			const fullPath = "/" + legacyRouteConfig.route + excludedRoute;
			return !fullPath.match(route.matched[0].regex);
		});

	if (useLegacy) {
		window.location = route.path;
		// prevent rendering of nuxt during window load (switch to fallback)
		return new Promise((resolve) => {
			setTimeout(resolve, 10000);
		});
	}

	// use vue
}
