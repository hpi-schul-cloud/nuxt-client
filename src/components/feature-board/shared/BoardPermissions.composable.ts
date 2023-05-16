import { createSharedComposable } from "@vueuse/core";
import { authModule } from "@/store";

const boardPermissions = () => {
	const permissions = authModule.getUserPermissions;

	return {
		permissions,
		hasBoardMovePermission: permissions.includes("course_create"),
		hasBoardCardCreatePermission: permissions.includes("course_create"),
		hasBoardColumnCreatePermission: permissions.includes("course_create"),
		hasBoardEditPermission: permissions.includes("course_edit"),
		hasBoardDeletePermission: permissions.includes("course_remove"),
	};
};

/**
 * Shares user permissions (/me)
 *
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);
