import { useBoardPermissions } from "@data-board";
import { createSharedComposable } from "@vueuse/core";
import { computed, ComputedRef, ref, Ref } from "vue";

export type EditModePermissions = {
	hasEditPermission: boolean;
};

export const useCourseBoardEditMode = (id: string) =>
	useEditMode(id, useBoardPermissions());

export const useMediaBoardEditMode = (id: string) =>
	useEditMode(id, { hasEditPermission: true });

/**
 * Handles EditMode for a specific card.
 *
 * Use this to set a card to edit mode from **inside** a card scope.
 */
const useEditMode = (
	id: string,
	permissions: EditModePermissions = { hasEditPermission: true }
) => {
	const { editModeId, setEditModeId } = useSharedEditMode();

	const isEditMode: ComputedRef<boolean> = computed(() => {
		if (!permissions.hasEditPermission) {
			return false;
		}

		return editModeId.value !== undefined && id === editModeId.value;
	});

	const startEditMode = (): void => {
		if (!permissions.hasEditPermission) {
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

	const isInEditMode: ComputedRef<boolean> = computed(
		() => editModeId.value !== undefined
	);

	return {
		editModeId,
		setEditModeId,
		isInEditMode,
	};
};

export const useSharedEditMode = createSharedComposable(sharedEditMode);
