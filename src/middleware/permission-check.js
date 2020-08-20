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

		let andPermissions = [];
		let orPermissions = [];
		let notPermissions = [];

		const processPermissionObject = function (element) {
			if (element.operator.toUpperCase() === "AND") {
				andPermissions = [...andPermissions, ...element.permissions];
			} else if (element.operator.toUpperCase() === "OR") {
				orPermissions = [...orPermissions, ...element.permissions];
			} else if (element.operator.toUpperCase() === "NOT") {
				notPermissions = [...notPermissions, ...element.permissions];
			}
		};

		if (Array.isArray(meta.requiredPermissions)) {
			meta.requiredPermissions.forEach((element) => {
				if (typeof element === "string") {
					andPermissions.push(element);
				} else {
					processPermissionObject(element);
				}
			});
		} else {
			processPermissionObject(meta.requiredPermissions);
		}

		const hasAndPermission = andPermissions.every(userHasPermission);
		if (
			(andPermissions.length && !hasAndPermission) ||
			(orPermissions.length && !orPermissions.some(userHasPermission)) ||
			(notPermissions.length && notPermissions.some(userHasPermission))
		) {
			return false;
		}

		return true;
	}, true);

	if (ACCESS_ALLOWED) {
		return true; // Access allowed
	}
	throw new Error(app.i18n.t("error.401"));
};
