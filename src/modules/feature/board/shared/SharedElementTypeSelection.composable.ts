import { createSharedComposable } from "@vueuse/core";
import { computed, ref } from "vue";

export interface ElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: () => Promise<void>;
	testId: string;
}

export const useSharedElementTypeSelection = createSharedComposable(() => {
	const isDialogOpen = ref<boolean>(false);
	const isDialogLoading = ref<boolean>(false);
	const staticElementTypeOptions = ref<Array<ElementTypeSelectionOptions>>([]);
	const dynamicElementTypeOptions = ref<Array<ElementTypeSelectionOptions>>([]);

	const elementTypeOptions = computed(() => {
		const combined = [
			...staticElementTypeOptions.value,
			...dynamicElementTypeOptions.value,
		];
		const alphabeticalSorted = combined.sort((a, b) =>
			a.label.localeCompare(b.label)
		);

		return alphabeticalSorted;
	});

	const closeDialog = () => {
		isDialogOpen.value = false;
	};

	return {
		isDialogOpen,
		isDialogLoading,
		closeDialog,
		staticElementTypeOptions,
		dynamicElementTypeOptions,
		elementTypeOptions,
	};
});
