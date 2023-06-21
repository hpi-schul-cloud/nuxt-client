import { createSharedComposable } from "@vueuse/core";
import { authModule } from "@/store";
import { BoardPermissionsTypes } from "../types/Board";

const boardPermissions = (): BoardPermissionsTypes => {
	const permissions = authModule?.getUserPermissions || [];
	const userRoles = authModule?.getUserRoles || [];

	return {
		hasMovePermission: permissions.includes("course_create"),
		hasCreateCardPermission: permissions.includes("course_create"),
		hasCreateColumnPermission: permissions.includes("course_create"),
		hasEditPermission: permissions.includes("course_edit"),
		hasDeletePermission: permissions.includes("course_remove"),
		isTeacher: userRoles.includes("teacher"),
	};
};

/**
 * Shares user permissions (/me)
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);
