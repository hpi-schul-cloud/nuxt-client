import { ref, Ref } from "vue";

/**
 * Shares board permissions
 *
 */
export const useBoardPermissions = () => {
	const permissions: Ref<Array<string>> = ref([]);
	// permissions = authModule.getUserPermissions;
	// can be mapped board spesific permissions
	permissions.value = [
		"move",
		"card_create",
		"card_delete",
		"column_create",
		"board_edit",
	];

	const hasMovePermission = permissions.value.includes("move");
	const hasCardCreatePermission = permissions.value.includes("card_create");
	const hasColumnCreatePermission = permissions.value.includes("column_create");
	const hasEditPermission = permissions.value.includes("board_edit");

	return {
		permissions,
		hasMovePermission,
		hasCardCreatePermission,
		hasColumnCreatePermission,
		hasEditPermission,
	};
};
