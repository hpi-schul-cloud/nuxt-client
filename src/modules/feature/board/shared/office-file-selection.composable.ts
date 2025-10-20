import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

interface OfficeFileSelectionOptions {
	id: string;
	label: string;
	action: (fileName: string, caption: string) => Promise<void>;
}

export const useOfficeFileSelection = createSharedComposable(() => {
	const isOfficeFileDialogOpen = ref<boolean>(false);
	const officeFileSelectionOptions = ref<Array<OfficeFileSelectionOptions>>([]);

	const closeOfficeFileDialog = () => {
		isOfficeFileDialogOpen.value = false;
	};

	const openOfficeFileDialog = () => {
		isOfficeFileDialogOpen.value = true;
	};

	return {
		openOfficeFileDialog,
		closeOfficeFileDialog,
		isOfficeFileDialogOpen,
		officeFileSelectionOptions,
	};
});
