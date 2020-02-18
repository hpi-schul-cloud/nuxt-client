export default async ({ app, store, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	if (isPublic) return; // we don't need authentication for this page.
	try {
		const jwt = app.$cookies.get("jwt");
		if (!jwt) {
			await store.dispatch("auth/logout");
			window.location = `${process.env.NOT_AUTHENTICATED_REDIRECT_URL}?redirect=${window.location}`;
		} else {
			store.commit("auth/setAccessToken", jwt);
			await store.dispatch("auth/authenticate");
		}
	} catch (error) {
		console.error(error);
		store.dispatch("auth/logout");
		window.location = process.env.NOT_AUTHENTICATED_REDIRECT_URL;
	}
};
