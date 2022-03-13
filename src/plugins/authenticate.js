import { authModule, envConfigModule } from "@/store";

export default async ({ app, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	const isPopulateNeeded = route.meta.some((meta) => meta.populateNeeded);
	const { NOT_AUTHENTICATED_REDIRECT_URL } = envConfigModule.getEnv;
	if (isPopulateNeeded || !isPublic) {
		try {
			const jwt = app.$cookies.get("jwt");
			if (jwt) {
				authModule.setAccessToken(jwt);

				await authModule.populateUser();
			} else if (!isPublic) {
				// TODO wrong use of store (not so bad)
				// TODO temporary workaround until $cookies are accessible from TS modules
				app.$cookies.remove("jwt");
				await authModule.logout();
				window.location = `${NOT_AUTHENTICATED_REDIRECT_URL}?redirect=${window.location}`;
			}
		} catch (error) {
			console.error(error);
			// TODO temporary workaround until $cookies are accessible from TS modules
			app.$cookies.remove("jwt");
			await authModule.logout();
			window.location = NOT_AUTHENTICATED_REDIRECT_URL;
		}
	}
};
