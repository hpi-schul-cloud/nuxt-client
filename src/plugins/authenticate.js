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
				const loginUrl = getLoginUrlWithRedirect();
				window.location.assign(loginUrl);
			}
		} catch (error) {
			const loginUrl = getLoginUrlWithRedirect();
			authModule.logout(loginUrl);
		}
	}
};

function getLoginUrlWithRedirect() {
	if (isSchulcloudUrl()) {
		return `/login?redirect=${encodeURIComponent(window.location.href)}`;
	}

	return addRedirectToUrlParams();
}

function isSchulcloudUrl() {
	const authUrl = envConfigModule.getEnv.NOT_AUTHENTICATED_REDIRECT_URL;
	if (authUrl[0] === "/") {
		return true;
	}

	const currentUrl = new URL(window.location.href);
	if (authUrl.indexOf(currentUrl.origin) === 0) {
		return true;
	}

	return false;
}

function addRedirectToUrlParams() {
	const authUrl = envConfigModule.getEnv.NOT_AUTHENTICATED_REDIRECT_URL;
	const currentUrl = new URL(window.location.href);

	const containsSchulcloudUrl = (s) => {
		return s.includes(currentUrl.origin);
	};

	const setRedirectParam = (url) => {
		const urlInParams = new URL(url);
		urlInParams.searchParams.set("redirect", currentUrl.toString());
		return urlInParams.toString();
	};

	const externalUrl = new URL(authUrl, currentUrl.origin);
	for (const [name, value] of externalUrl.searchParams.entries()) {
		if (containsSchulcloudUrl(value)) {
			externalUrl.searchParams.set(name, setRedirectParam(value));
		}
	}

	return externalUrl.toString();
}
