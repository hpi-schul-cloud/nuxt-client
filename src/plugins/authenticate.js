import { authModule } from "@/store";
import { envConfigModule } from "@/store";

export default async ({ app, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	const isPopulateNeeded = route.meta.some((meta) => meta.populateNeeded);

	if (isPopulateNeeded || !isPublic) {
		try {
			const jwt = app.$cookies.get("jwt");
			if (jwt) {
				authModule.setAccessToken(jwt);
				await authModule.populateUser();
			} else if (!isPublic) {
				const loginUrl = composeLoginUrlWithRedirect();
				window.location.assign(loginUrl);
			}
		} catch (error) {
			const loginUrl = composeLoginUrlWithRedirect();
			authModule.logout(loginUrl);
		}
	}
};

function composeLoginUrlWithRedirect() {
	const currentUrl = window.location.href;

	const themeName = envConfigModule.getEnv.SC_THEME ?? 'default';
	if (themeName === 'thr' && envConfigModule.getEnv.FEATURE_TSP_ENABLED === true) {
		return composeThuringiaLoginUrl(currentUrl);
	}
	return composeUrl(currentUrl, "/login", { redirect: currentUrl });
}

function composeThuringiaLoginUrl(currentUrl) {
	const schulCloudLoginUrl = composeUrl(
		envConfigModule.getEnv.DOMAIN,
		"/tsp-login",
		{ redirect: currentUrl }
	);
	const schulPortalLoginUrl = composeUrl(
		envConfigModule.getEnv.TSP_API_BASE_URL,
		"/cas/login",
		{ service: schulCloudLoginUrl }
	);
	return schulPortalLoginUrl;
}

function composeUrl(baseUrl, path = "", params = {}) {
	const protocol = baseUrl.match(/^http/i) ? '' : 'https://';
	const urlObject = new URL(path, protocol + baseUrl);
	const paramObject = new URLSearchParams(params);
	urlObject.search = paramObject.toString();
	return urlObject.toString();
}
