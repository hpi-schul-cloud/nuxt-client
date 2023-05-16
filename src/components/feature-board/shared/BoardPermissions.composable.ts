import { createSharedComposable } from "@vueuse/core";
import { ref, Ref } from "vue";
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

declare type boardObjectPermissionType = {
	id: string;
	permissions: Array<string>;
};

const permissions: Ref<Array<boardObjectPermissionType>> = ref([]);
/**
 *
 * Shares board element specific permissions
 */
export const useBoardElementPermissions = (
	id: string
): boardObjectPermissionType | undefined => {
	permissions.value = [
		{
			id: "643ea6ebe8ba9e586e041e8c", // card
			permissions: ["edit", "delete", "create"],
		},
		{
			id: "643ea6ebe8ba9e586e041e8a", // card
			permissions: ["edit", "delete", "create"],
		},
		{
			id: "643ea6ebe8ba9e586e041e89", // card
			permissions: ["edit", "delete"],
		},
		{
			id: "643ea6ebe8ba9e586e041ed3", // text content element
			permissions: ["edit", "delete"],
		},
	];

	return permissions.value.find((boardObject) => boardObject.id === id);
};

/**
 *
 * Adds board object specific permissions into reactive array
 */
export const addBoardObjectPermission = (
	payload: boardObjectPermissionType
) => {
	const index = permissions.value.findIndex(
		(boardObject) => boardObject.id === payload.id
	);

	if (!index) {
		permissions.value.push(payload);
		return;
	}

	permissions.value.splice(index, 0, payload);
};
