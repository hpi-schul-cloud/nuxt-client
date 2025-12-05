import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export const useAddCollaboraFile = createSharedComposable(() => {
	const isCollaboraFileDialogOpen = ref<boolean>(false);

	const closeCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = false;
	};

	const openCollaboraFileDialog = () => {
		isCollaboraFileDialogOpen.value = true;
	};

	return {
		isCollaboraFileDialogOpen,
		openCollaboraFileDialog,
		closeCollaboraFileDialog,
	};
});
