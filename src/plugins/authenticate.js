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
	if (
		envConfigModule.getEnv.SC_THEME === "thr" &&
		envConfigModule.getEnv.FEATURE_TSP_ENABLED === true
	) {
		return composeThuringiaLoginUrl(window.location.href);
	}
	return composeUrl(window.location.href, "/login", {
		redirect: window.location.href,
	});
}

function composeThuringiaLoginUrl(url) {
	const schulcloudUrl = envConfigModule.getEnv.DOMAIN;
	const schulcloudLoginUrl = composeUrl(schulcloudUrl, "/tsp-login", {
		redirect: url,
	});

	const schulportalUrl = envConfigModule.getEnv.TSP_API_BASE_URL;
	const schulportalLoginUrl = composeUrl(schulportalUrl, "/cas/login", {
		service: schulcloudLoginUrl,
	});

	return schulportalLoginUrl;
}

function composeUrl(baseUrl, path = "", params = {}) {
	const protocol = baseUrl.match(/^http/i) ? "" : "https://";
	const urlObject = new URL(path, protocol + baseUrl);
	const paramObject = new URLSearchParams(params);
	urlObject.search = paramObject.toString();
	return urlObject.toString();
}
