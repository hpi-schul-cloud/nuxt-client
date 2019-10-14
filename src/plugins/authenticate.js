export default async ({ app, store }) => {
	try {
		const jwt = app.$cookies.get("jwt");
		if (!jwt) {
			store.dispatch("auth/logout");
		}

		store.commit("auth/setAccessToken", jwt);
		//removed while the legacy client login is in place
		//await store.dispatch("auth/authenticate");
	} catch (e) {
		store.dispatch("auth/logout");
	}
};
