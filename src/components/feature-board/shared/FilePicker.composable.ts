import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";

export const useFilePicker = createSharedComposable(() => {
	const isFilePickerOpen = ref<boolean>(false);
	const selectedFiles = ref<File>();

	const setSelectedFiles = (file?: File) => {
		selectedFiles.value = file;
	};

	const getSelectedFiles = () => {
		return selectedFiles.value;
	};

	const openFilePicker = () => {
		isFilePickerOpen.value = true;
	};

	const closeFilePicker = () => {
		isFilePickerOpen.value = false;
	};

	return {
		setSelectedFiles,
		getSelectedFiles,
		openFilePicker,
		closeFilePicker,
		isFilePickerOpen,
	};
});
