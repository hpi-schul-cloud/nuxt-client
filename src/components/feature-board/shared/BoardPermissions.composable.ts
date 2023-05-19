import { createSharedComposable } from "@vueuse/core";
import { authModule } from "@/store";
import { BoardPermissionsTypes } from "../types/Board";

const boardPermissions = (): BoardPermissionsTypes => {
	const permissions = authModule?.getUserPermissions || [];

	return {
		hasBoardMovePermission: permissions.includes("course_create"),
		hasBoardCardCreatePermission: permissions.includes("course_create"),
		hasBoardColumnCreatePermission: permissions.includes("course_create"),
		hasBoardEditPermission: permissions.includes("course_edit"),
		hasBoardDeletePermission: permissions.includes("course_remove"),
	};
};

/**
 * Shares user permissions (/me)
 */
export const useBoardPermissions = createSharedComposable(boardPermissions);

/**
 *
 * @param permission - board action permission
 * @param callback - board action callback
 * @param args - rest of the action's parameters
 */
export const handlePermittedAction = async <T, P>(
	permission: boolean | undefined,
	callback: (...params: Array<P>) => Promise<T>,
	...args: Array<P>
): Promise<T | void> => {
	console.log({ ...args, callback: callback.name });
	if (permission) await callback(...args);
};
