import { authModule } from "@/store";
import { createApplicationError } from "@/utils/create-application-error.factory";
import { HttpStatusCode } from "@/store/types/http-status-code.enum";

export default async ({ route }) => {
	const user = authModule.getUser;

	const userHasPermission = (permission) =>
		user.permissions.includes(permission);

	const ACCESS_ALLOWED = route.meta.reduce((allowed, meta) => {
		if (!allowed || !meta.requiredPermissions) {
			return allowed;
		}
		if (!user) {
			return false;
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
		return true;
	}
	throw createApplicationError(HttpStatusCode.Unauthorized);
};
