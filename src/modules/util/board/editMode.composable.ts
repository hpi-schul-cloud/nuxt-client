import { useBoardPermissions } from "@data-board";
import { createSharedComposable } from "@vueuse/core";
import { computed, ComputedRef, Ref, ref } from "vue";

export type EditModePermissions = {
	hasEditPermission: Ref<boolean>;
};

export type EditModeType = "board" | "column" | "card";

export type EditModeItem = {
	id: string;
	type: EditModeType;
};

export const useCourseBoardEditMode = (id: string) => useEditMode(id, useBoardPermissions());

export const useMediaBoardEditMode = (id: string) => useEditMode(id, { hasEditPermission: ref(true) });

/**
 * Handles EditMode for a specific card.
 *
 * Use this to set a card to edit mode from **inside** a card scope.
 */
const useEditMode = (id: string, permissions: EditModePermissions = { hasEditPermission: ref(true) }) => {
	const { editModeId, setEditModeId, setEditModeType } = useSharedEditMode();

	const isEditMode: ComputedRef<boolean> = computed(() => {
		if (!permissions.hasEditPermission.value) {
			return false;
		}

		return editModeId.value !== undefined && id === editModeId.value;
	});

	const startEditMode = (type?: EditModeType): void => {
		if (!permissions.hasEditPermission.value) {
			return;
		}

		setEditModeId(id);
		if (type) {
			setEditModeType(type);
		}
	};

	const stopEditMode = (): void => {
		if (isEditMode.value) {
			setEditModeId(undefined);
			setEditModeType(undefined);
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
	const editModeType: Ref<EditModeType | undefined> = ref(undefined);

	const setEditModeId = (id: string | undefined): void => {
		editModeId.value = id;
	};

	const setEditModeType = (type: EditModeType | undefined): void => {
		editModeType.value = type;
	};

	const isInEditMode: ComputedRef<boolean> = computed(() => editModeId.value !== undefined);

	return {
		editModeId,
		editModeType,
		setEditModeId,
		setEditModeType,
		isInEditMode,
	};
};

export const useSharedEditMode = createSharedComposable(sharedEditMode);
