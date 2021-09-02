import EnvConfigModule from "@/store/env-config";
import AuthModule from "@/store/auth";

export default async ({ app, store, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	const isPopulateNeeded = route.meta.some((meta) => meta.populateNeeded);
	const { NOT_AUTHENTICATED_REDIRECT_URL } = EnvConfigModule.getEnv;

	if (isPopulateNeeded || !isPublic) {
		try {
			const jwt = app.$cookies.get("jwt");
			if (jwt) {
				AuthModule.setAccessToken(jwt);

				await AuthModule.populateUser();
			} else if (!isPublic) {
				// TODO wrong use of store (not so bad)
				await AuthModule.logout();
				window.location = `${NOT_AUTHENTICATED_REDIRECT_URL}?redirect=${window.location}`;
			}
		} catch (error) {
			console.error(error);
			await AuthModule.logout();
			window.location = NOT_AUTHENTICATED_REDIRECT_URL;
		}
	}
};
