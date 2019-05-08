export default async (ctx) => {
	const { store } = ctx;

	store.subscribe((mutation, state) => {
		if (mutation.type === "auth/unsetAuthenticatePending") {
			ctx.app.$cookies.set("jwt", ctx.app.$cookies.get("feathers-jwt"), {
				path: "/",
				maxAge: 60 * 60 * 24 * 7,
			});
		}
		if (mutation.type === "auth/unsetLogoutPending") {
			ctx.app.$cookies.remove("jwt");
		}
	});
};
