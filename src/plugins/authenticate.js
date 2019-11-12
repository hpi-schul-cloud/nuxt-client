export default async ({ app, store, route }) => {
	const isPublic = route.meta.some((meta) => meta.isPublic);
	try {
		const jwt = app.$cookies.get("jwt");
		if (!jwt & !isPublic) {
			await store.dispatch("auth/logout");
			window.location = "/";
		}
		store.commit("auth/setAccessToken", jwt);
		await store.dispatch("auth/authenticate");
	} catch (e) {
		store.dispatch("auth/logout");
	}
};
