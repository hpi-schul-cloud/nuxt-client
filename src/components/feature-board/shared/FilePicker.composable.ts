import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";

export const useFilePicker = createSharedComposable(() => {
	const isFilePickerOpen = ref<boolean>(false);
	const selectedFile = ref<File>();

	const setSelectedFile = (file?: File) => {
		selectedFile.value = file;
	};

	const getSelectedFile = () => {
		return selectedFile.value;
	};

	const openFilePicker = () => {
		isFilePickerOpen.value = true;
	};

	const closeFilePicker = () => {
		isFilePickerOpen.value = false;
	};

	return {
		setSelectedFile,
		getSelectedFile,
		openFilePicker,
		closeFilePicker,
		isFilePickerOpen,
	};
});
