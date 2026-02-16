import { useBoardAllowedOperations } from "./boardAllowedOperations.composable";
import { createSharedComposable } from "@vueuse/core";
import { computed, ComputedRef, Ref, ref } from "vue";

export type EditModePermissions = {
	hasEditPermission: Ref<boolean>;
};

export const useCourseBoardEditMode = (id: string) => {
	const { allowedOperations } = useBoardAllowedOperations();
	const hasEditPermission = computed(() => allowedOperations.value.updateElement ?? false);
	return useEditMode(id, hasEditPermission);
};

export const useMediaBoardEditMode = (id: string) => useEditMode(id, ref(true));

/**
 * Handles EditMode for a specific card.
 *
 * Use this to set a card to edit mode from **inside** a card scope.
 */
export const useEditMode = (id: string, hasEditPermission: Ref<boolean>) => {
	const { editModeId, setEditModeId } = useSharedEditMode();

	const isEditMode: ComputedRef<boolean> = computed(() => {
		if (!hasEditPermission.value) {
			return false;
		}

		return editModeId.value !== undefined && id === editModeId.value;
	});

	const startEditMode = (): void => {
		if (!hasEditPermission.value) {
			return;
		}

		setEditModeId(id);
	};

	const stopEditMode = (): void => {
		if (isEditMode.value) {
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

	const setEditModeId = (id: string | undefined): void => {
		editModeId.value = id;
	};

	const isInEditMode: ComputedRef<boolean> = computed(() => editModeId.value !== undefined);

	return {
		editModeId,
		setEditModeId,
		isInEditMode,
	};
};

export const useSharedEditMode = createSharedComposable(sharedEditMode);
