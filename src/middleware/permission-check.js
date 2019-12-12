export default async ({ app, store, route }) => {
	const { user } = store.state.auth;

	const userHasPermission = (permission) =>
		user.permissions.includes(permission);

	const ACCESS_ALLOWED = route.meta.reduce((allowed, meta) => {
		if (!allowed || !meta.requiredPermissions) {
			return allowed;
		}
		if (!user) {
			throw new Error(app.i18n.t("error.401"));
		}
		const REQUIRED_PERMISSIONS = Array.isArray(meta.requiredPermissions)
			? meta.requiredPermissions
			: meta.requiredPermissions.permissions;
		const OPERATOR = Array.isArray(meta.requiredPermissions)
			? "AND"
			: meta.requiredPermissions.operator;
		return OPERATOR === "AND"
			? REQUIRED_PERMISSIONS.every(userHasPermission)
			: REQUIRED_PERMISSIONS.some(userHasPermission);
	}, true);
	if (ACCESS_ALLOWED) {
		return true; // Access allowed
	}
	throw new Error(app.i18n.t("error.401"));
};
