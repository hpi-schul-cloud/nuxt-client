export default async ({ app, store, route }) => {
	const user = store.getters["auth/getUser"];

	const userExternallyManaged = !!user?.externallyManaged;

	const ACCESS_ALLOWED = route.meta.reduce((allowed, meta) => {
		if (!allowed || !meta.userNotExternallyManaged) {
			return allowed;
		}
		if (!user) {
			throw new Error(app.i18n.t("error.401"));
		}
		return !userExternallyManaged;
	}, true);
	if (ACCESS_ALLOWED) {
		return true; // Access allowed
	}
	throw new Error(app.i18n.t("error.401"));
};
