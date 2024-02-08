import { authModule } from "@/store";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { createSharedComposable } from "@vueuse/core";

const boardPermissions = (): BoardPermissionChecks => {
	const permissions = authModule?.getUserPermissions || [];
	const userRoles = authModule?.getUserRoles || [];

	return {
		hasMovePermission: true,
		hasCreateCardPermission: permissions.includes("course_create"),
		hasCreateColumnPermission: permissions.includes("course_create"),
		hasEditPermission: true,
		hasDeletePermission: true,
		isTeacher: userRoles.includes("teacher"),
		isStudent: userRoles.includes("student"),
	};
};

/**
 * Shares user permissions (/me)
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);
