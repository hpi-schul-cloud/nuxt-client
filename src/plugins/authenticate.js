import { authModule } from "@/store";

export default async ({ app, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	const isPopulateNeeded = route.meta.some((meta) => meta.populateNeeded);

	const currentUrl = encodeURIComponent(window.location.href);
	const redirectUrl = `/login?redirect=${currentUrl}`;
	if (isPopulateNeeded || !isPublic) {
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
