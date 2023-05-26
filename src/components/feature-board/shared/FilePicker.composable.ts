import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export const useFilePicker = createSharedComposable(() => {
	const isFilePickerOpen = ref<boolean>(false);
	const file = ref<File>();

	const triggerFilePicker = () => {
		isFilePickerOpen.value = !isFilePickerOpen.value;
	};

	return {
		isFilePickerOpen,
		file,
		triggerFilePicker,
	};
});
