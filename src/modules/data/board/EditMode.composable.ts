import { createSharedComposable } from "@vueuse/core";
import { computed, ref, Ref } from "vue";
import { useBoardPermissions } from "./BoardPermissions.composable";

/* const useBoardEditMode = (id: string) => {

	const base = useEditMode(id, useBoardPermissions());
} */

/**
 * Handles EditMode for a specific card.
 *
 * Use this to set a card to edit mode from **inside** a card scope.
 */
export const useEditMode = (id: string, /* permissionComposable: */ ) => {
	const { hasEditPermission } = useBoardPermissions();
	const { editModeId, setEditModeId } = useSharedEditMode();

	const isEditMode = computed(() => {
		if (!hasEditPermission) return false;
		return editModeId.value !== undefined && id === editModeId.value;
	});

	const startEditMode = () => {
		if (!hasEditPermission) return;
		setEditModeId(id);
	};

	const stopEditMode = () => {
		if (isEditMode.value === true) {
			setEditModeId(undefined);
		}
	};

	return {
		isEditMode,
		startEditMode,
		stopEditMode,
	};
};

/**
 * Handles the currently editable card across the whole Board.
 *
 * Use this to set a card to edit mode from **outside** a card scope.
 */
const sharedEditMode = () => {
	const editModeId: Ref<string | undefined> = ref(undefined);

	const setEditModeId = (id: string | undefined) => {
		editModeId.value = id;
	};

	return { editModeId, setEditModeId };
};

export const useSharedEditMode = createSharedComposable(sharedEditMode);
