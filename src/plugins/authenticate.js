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
	const themeName = envConfigModule.getEnv.SC_THEME ?? "default";
	const currentUrl = encodeURIComponent(
		encodeURIComponent(window.location.href)
	);
	if (
		themeName === "thr" &&
		envConfigModule.getEnv.FEATURE_TSP_ENABLED === true
	) {
		const baseUrl = envConfigModule.getEnv.TSP_API_BASE_URL;
		return `${baseUrl}?service=https%3A%2F%2Fschulcloud-thueringen.de%2Ftsp-login%3Fredirect=${currentUrl}`;
	}
	return `/login?redirect=${currentUrl}`;
}
