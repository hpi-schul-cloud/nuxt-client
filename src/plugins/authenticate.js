import { authModule } from "@/store";
import { envConfigModule } from "@/store";

export default async ({ app, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	const isPopulateNeeded = route.meta.some((meta) => meta.populateNeeded);

	if (isPopulateNeeded || !isPublic) {
		const redirectUrl = composeRedirectUrl(envConfigModule.getEnv.SC_THEME);
		try {
			const jwt = app.$cookies.get("jwt");
			if (jwt) {
				authModule.setAccessToken(jwt);

				await authModule.populateUser();
			} else if (!isPublic) {
				window.location.assign(redirectUrl);
			}
		} catch (error) {
			authModule.logout(redirectUrl);
		}
	}
};

function composeRedirectUrl(themeName = "default") {
	const currentUrl = encodeURIComponent(window.location.href);
	if (themeName === "thr") {
		return `/tsp-login?redirect=${currentUrl}`;
	}
	return `/login?redirect=${currentUrl}`;
}
