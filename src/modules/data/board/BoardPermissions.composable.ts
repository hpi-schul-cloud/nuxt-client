import { authModule } from "@/store";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { createSharedComposable } from "@vueuse/core";

const boardPermissions = (): BoardPermissionChecks => {
	const permissions = authModule?.getUserPermissions || [];
	const userRoles = authModule?.getUserRoles || [];

	return {
		hasMovePermission: permissions.includes("course_create"),
		hasCreateCardPermission: permissions.includes("course_create"),
		hasCreateColumnPermission: permissions.includes("course_create"),
		hasCreateToolPermission: permissions.includes("context_tool_admin"),
		hasEditPermission: permissions.includes("course_edit"),
		hasDeletePermission: permissions.includes("course_remove"),
		isTeacher: userRoles.includes("teacher"),
		isStudent: userRoles.includes("student"),
	};
};

/**
 * Shares user permissions (/me)
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);
