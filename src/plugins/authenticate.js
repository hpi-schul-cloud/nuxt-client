export default async ({ app, store }) => {
	try {
		if (location.pathname.startsWith("/error/proxy")) {
			// Do not populate store on error pages
			// otherwise we may get into a loop.
			return;
		}
		const jwt = app.$cookies.get("jwt");
		if (!jwt) {
			return store.dispatch("auth/logout");
		}
		store.commit("auth/setAccessToken", jwt);
		await store.dispatch("auth/authenticate");
	} catch (e) {
		store.dispatch("auth/logout");
	}
};
