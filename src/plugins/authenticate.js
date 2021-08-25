import EnvConfigModule from "@/store/env-config";

export default async ({ app, store, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	const isPopulateNeeded = route.meta.some((meta) => meta.populateNeeded);
	const { NOT_AUTHENTICATED_REDIRECT_URL } = EnvConfigModule.getEnv;

	if (isPopulateNeeded || !isPublic) {
		try {
			const jwt = app.$cookies.get("jwt");
			if (jwt) {
				store.commit("auth/setAccessToken", jwt);
				// TODO wrong use of store (not so bad)
				await store.dispatch("auth/authenticate");
			} else if (!isPublic) {
				// TODO wrong use of store (not so bad)
				await store.dispatch("auth/logout");
				window.location = `${NOT_AUTHENTICATED_REDIRECT_URL}?redirect=${window.location}`;
			}
		} catch (error) {
			console.error(error);
			store.dispatch("auth/logout");
			window.location = NOT_AUTHENTICATED_REDIRECT_URL;
		}
	}
};
