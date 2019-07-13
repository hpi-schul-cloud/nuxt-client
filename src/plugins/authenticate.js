export default async ({ app, store }) => {
	try {
		const jwt = app.$cookies.get("jwt");

		if (!jwt) {
			store.dispatch("auth/logout");
		}

		store.commit("auth/setAccessToken", jwt);
		await store.dispatch("auth/authenticate");
	} catch (e) {
		store.dispatch("auth/logout");
	}
};
