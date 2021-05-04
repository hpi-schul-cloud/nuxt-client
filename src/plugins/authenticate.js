export default async ({ app, store, route }) => {
	await store.dispatch("env-config/get");

	const isPublic = route.meta.some((meta) => meta.isPublic);
	const isPopulateNeeded = route.meta.some((meta) => meta.populateNeeded);
	const { NOT_AUTHENTICATED_REDIRECT_URL } = store.state["env-config"].env;

	if (isPopulateNeeded || !isPublic) {
		try {
			const jwt = app.$cookies.get("jwt");
			if (jwt) {
				store.commit("auth/setAccessToken", jwt);
				await store.dispatch("auth/authenticate");
			} else if (!isPublic) {
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
