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
		"board_edit_",
	];

	return {
		permissions,
	};
};
