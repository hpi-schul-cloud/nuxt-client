import { authModule, applicationErrorModule } from "@/store";

export default async ({ app, route }) => {
	const error = {
		message: app.i18n.t("error.401"),
		statusCode: 401,
	};
	const user = authModule.getUser;

	const userHasPermission = (permission) =>
		user.permissions.includes(permission);

	const ACCESS_ALLOWED = route.meta.reduce((allowed, meta) => {
		if (!allowed || !meta.requiredPermissions) {
			return allowed;
		}
		if (!user) {
			applicationErrorModule.setError(error);
			throw new Error(error.message);
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
	applicationErrorModule.setError(error);
	throw new Error(error.message);
};
