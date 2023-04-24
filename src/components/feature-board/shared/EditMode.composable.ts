import { createSharedComposable } from "@vueuse/core";
import { computed, ref, Ref } from "vue";
import { BoardCard } from "../types/Card";

/**
 * Handles EditMode for a specific card.
 *
 * Use this to set a card to edit mode from **inside** a card scope.
 */
export const useEditMode = (card: Ref<BoardCard | undefined>) => {
	const { editModeCardId, setEditModeCardId } = useSharedEditMode();

	const isEditMode = computed(
		() =>
			editModeCardId.value !== undefined &&
			card.value?.id === editModeCardId.value
	);

	const startEditMode = () => {
		setEditModeCardId(card.value?.id);
	};

	const stopEditMode = () => {
		if (isEditMode.value === true) {
			setEditModeCardId(undefined);
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
	const editModeCardId: Ref<BoardCard["id"] | undefined> = ref(undefined);

	const setEditModeCardId = (cardId: BoardCard["id"] | undefined) => {
		editModeCardId.value = cardId;
	};

	return { editModeCardId, setEditModeCardId };
};

export const useSharedEditMode = createSharedComposable(sharedEditMode);
