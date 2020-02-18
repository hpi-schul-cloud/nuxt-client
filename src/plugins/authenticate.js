export default async ({ app, store, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	try {
		const jwt = app.$cookies.get("jwt");
		if (!jwt && !isPublic) {
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
