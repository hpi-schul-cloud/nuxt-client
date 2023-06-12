import { ref } from "vue";
import { createSharedComposable } from "@vueuse/core";

export const useSelectedFile = createSharedComposable(() => {
	const selectedFile = ref<File>();

	const setSelectedFile = (file?: File) => {
		selectedFile.value = file;
	};

	const getSelectedFile = () => {
		return selectedFile.value;
	};

	return {
		setSelectedFile,
		getSelectedFile,
	};
});
