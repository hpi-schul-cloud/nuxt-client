import { createSharedComposable } from "@vueuse/core";
import { authModule } from "@/store";
import { BoardPermissionsTypes } from "../types/Board";

const boardPermissions = (): BoardPermissionsTypes => {
	const permissions = authModule?.getUserPermissions || [];

	return {
		hasMovePermission: permissions.includes("course_create"),
		hasCreateCardPermission: permissions.includes("course_create"),
		hasCreateColumnPermission: permissions.includes("course_create"),
		hasEditPermission: permissions.includes("course_edit"),
		hasDeletePermission: permissions.includes("course_remove"),
	};
};

/**
 * Shares user permissions (/me)
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);
