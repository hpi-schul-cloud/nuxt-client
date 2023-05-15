import { createSharedComposable } from "@vueuse/core";
import { ref, Ref } from "vue";
import { authModule } from "@/store";

/**
 * Shares board permissions
 *
 */
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
export const useBoardPermissions = createSharedComposable(boardPermissions);

declare type boardObjectPermissionType = {
	id: string;
	permissions: Array<string>;
};

export const useBoardElementPermissions = (id: string) => {
	const permissions: Ref<Array<boardObjectPermissionType>> = ref([]);
	// TODO: find a way to push each board object's permissions here
	permissions.value = [
		{
			id: "643ea6ebe8ba9e586e041e8c", // card
			permissions: ["edit", "change", "delete", "create"],
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

	const result = permissions.value.find(
		(boardObject) => boardObject.id === id
	)?.permissions;

	return result;
};
