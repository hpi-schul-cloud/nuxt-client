import { authModule } from "@/store";

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
				authModule.logout();
			}
		} catch (error) {
			authModule.logout();
		}
	}
};
