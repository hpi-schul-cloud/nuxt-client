import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export interface ElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: () => Promise<void>;
	testId: string;
}

export const useSharedElementTypeSelection = createSharedComposable(() => {
	const isDialogOpen = ref<boolean>(false);
	const elementTypeOptions = ref<Array<ElementTypeSelectionOptions>>([]);

	const closeDialog = () => {
		isDialogOpen.value = false;
	};

	return {
		isDialogOpen,
		closeDialog,
		elementTypeOptions,
	};
});
