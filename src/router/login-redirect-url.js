import { envConfigModule } from "@/store";

export const getLoginUrlWithRedirect = (targetUrl) => {
	const currentUrl = new URL(targetUrl);
	const loginUrl = new URL(
		envConfigModule.getEnv.NOT_AUTHENTICATED_REDIRECT_URL,
		currentUrl.origin // fallback origin, if a relative url is configured
	);

	const isInteralUrl = currentUrl.origin === loginUrl.origin;

	if (isInteralUrl) {
		return addRedirectAsParam(loginUrl, currentUrl);
	}

	return addRedirectAsParamToUrlParams(loginUrl, currentUrl);
};

const addRedirectAsParam = (loginUrl, currentUrl) => {
	loginUrl.searchParams.set("redirect", currentUrl.toString());
	return loginUrl.toString();
};

const addRedirectAsParamToUrlParams = (loginUrl, currentUrl) => {
	for (const [name, value] of loginUrl.searchParams.entries()) {
		const isSchulcloudUrl = value.indexOf(currentUrl.origin) === 0;
		if (isSchulcloudUrl) {
			const urlInParameters = new URL(value);
			urlInParameters.searchParams.set("redirect", currentUrl.toString());
			loginUrl.searchParams.set(name, urlInParameters.toString());
		}
	}

	return loginUrl.toString();
};
