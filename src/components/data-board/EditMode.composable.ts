import { createSharedComposable } from "@vueuse/core";
import { computed, ComputedRef, ref, Ref } from "vue";

/**
 * Handles EditMode for a specific card.
 *
 * Use this to set a card to edit mode from **inside** a card scope.
 */
export const useEditMode = (id: string) => {
	// TODO const { hasEditPermission } = useBoardPermissions();
	const { editModeId, setEditModeId } = useSharedEditMode();

	const isEditMode = computed(() => {
		//if (!hasEditPermission) return false;
		return editModeId.value !== undefined && id === editModeId.value;
	});

	const startEditMode = () => {
		//if (!hasEditPermission) return;
		setEditModeId(id);
	};

	const stopEditMode = () => {
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

	return { editModeId, setEditModeId, isInEditMode };
};

export const useSharedEditMode = createSharedComposable(sharedEditMode);
