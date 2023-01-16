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
	const currentUrl = new URL(window.location.href);
	const loginUrl = new URL(
		envConfigModule.getEnv.NOT_AUTHENTICATED_REDIRECT_URL,
		currentUrl.origin // fallback origin, if a relative url is configured
	);

	const isInteralUrl = currentUrl.origin === loginUrl.origin;

	if (isInteralUrl) {
		return addRedirectAsParam(loginUrl, currentUrl);
	}

	return addRedirectAsParamToUrlParams(loginUrl, currentUrl);
}

function addRedirectAsParam(loginUrl, currentUrl) {
	loginUrl.searchParams.set("redirect", currentUrl.toString());
	return loginUrl.toString();
}

function addRedirectAsParamToUrlParams(loginUrl, currentUrl) {
	for (const [name, value] of loginUrl.searchParams.entries()) {
		const isSchulcloudUrl = value.indexOf(currentUrl.origin) === 0;
		if (isSchulcloudUrl) {
			const urlInParameters = new URL(value);
			urlInParameters.searchParams.set("redirect", currentUrl.toString());
			loginUrl.searchParams.set(name, urlInParameters.toString());
		}
	}

	return loginUrl.toString();
}
