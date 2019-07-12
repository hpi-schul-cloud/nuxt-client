export default async (ctx) => {
	try {
		const jwt = ctx.app.$cookies.get("jwt");

		if (!jwt) {
			store.dispatch("auth/logout");
		}

		ctx.store.commit("auth/setAccessToken", jwt);
		await ctx.store.dispatch("auth/authenticate");
	} catch (e) {
		ctx.store.dispatch("auth/logout");
	}
};
