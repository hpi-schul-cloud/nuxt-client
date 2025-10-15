import { createSharedComposable } from "@vueuse/core";
import { computed, ref } from "vue";

export interface ElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: () => Promise<void>;
	testId: string;
}
export interface CollaboraElementTypeSelectionOptions {
	icon: string;
	label: string;
	action: (fileName: string) => Promise<void>;
	testId: string;
}

export const useSharedElementTypeSelection = createSharedComposable(() => {
	const isDialogOpen = ref<boolean>(false);
	const isDialogLoading = ref<boolean>(false);
	const isCollaboraDialogOpen = ref<boolean>(false);
	const staticElementTypeOptions = ref<Array<ElementTypeSelectionOptions>>([]);
	const dynamicElementTypeOptions = ref<Array<ElementTypeSelectionOptions>>([]);
	const collaboraElementTypeOptions = ref<Array<CollaboraElementTypeSelectionOptions>>([]);

	const elementTypeOptions = computed(() => {
		const combined = [...staticElementTypeOptions.value, ...dynamicElementTypeOptions.value];
		const alphabeticalSorted = combined.sort((a, b) => a.label.localeCompare(b.label));

		return alphabeticalSorted;
	});

	const closeDialog = () => {
		isDialogOpen.value = false;
	};

	const closeCollaboraDialog = () => {
		isCollaboraDialogOpen.value = false;
	};

	return {
		isDialogOpen,
		isDialogLoading,
		isCollaboraDialogOpen,
		closeDialog,
		closeCollaboraDialog,
		staticElementTypeOptions,
		dynamicElementTypeOptions,
		elementTypeOptions,
		collaboraElementTypeOptions,
	};
});
