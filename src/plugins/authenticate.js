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
		const schulCloudLoginUrl = composeUrl(envConfigModule.getEnv.DOMAIN, '/tsp-login', { redirect: currentUrl });
		const schulPortalLoginUrl = composeUrl(envConfigModule.getEnv.TSP_API_BASE_URL, '/cas/login', { service: schulCloudLoginUrl });
		return schulPortalLoginUrl;
	}
	return composeUrl(currentUrl, '/login', { redirect: currentUrl });
}

export function composeUrl(baseUrl, path = '', params = {}) {
	const urlObject = new URL(path, baseUrl);
	const paramObject = new URLSearchParams(params);
	urlObject.search = paramObject.toString();
	return urlObject.toString();
}
