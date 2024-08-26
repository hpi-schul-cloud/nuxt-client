import { createSharedComposable } from "@vueuse/core";
import { computed, ComputedRef, ref, Ref } from "vue";

// TODO: Combine with useEditMode in Board.

export const useEditMode = (id: string) => {
	const { editModeId, setEditModeId } = useSharedEditMode();

	const isEditMode = computed(() => {
		return editModeId.value !== undefined && id === editModeId.value;
	});

	const startEditMode = () => {
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
