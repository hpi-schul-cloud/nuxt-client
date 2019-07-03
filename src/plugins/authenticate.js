export default async (ctx) => {
	try {
		const jwt = ctx.app.$cookies.get("jwt");

		// if (!jwt) {
		// 	store.dispatch("auth/logout");
		// }

		ctx.store.commit("auth/setAccessToken", jwt);
		await store.dispatch("auth/authenticate");
	} catch (e) {
		// store.dispatch("auth/logout");
	}
};
