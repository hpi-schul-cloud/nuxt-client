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

	const themeName = envConfigModule.getEnv.SC_THEME ?? "default";
	if (
		themeName === "thr" &&
		envConfigModule.getEnv.FEATURE_TSP_ENABLED === true
	) {
		const schulPortalUrl = envConfigModule.getEnv.TSP_API_BASE_URL;
		const schulCloudLoginUrl = `https://${
			envConfigModule.getEnv.DOMAIN
		}/tsp-login?redirect=${encodeURIComponent(currentUrl)}`;
		return `${schulPortalUrl}?service=${encodeURIComponent(
			schulCloudLoginUrl
		)}`;
	}
	return `/login?redirect=${currentUrl}`;
}
