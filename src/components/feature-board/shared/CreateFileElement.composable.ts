import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

export const useCreateFileElement = createSharedComposable(() => {
	const isFilePickerOpen = ref<boolean>(false);

	const triggerFilePicker = () => {
		isFilePickerOpen.value = !isFilePickerOpen.value;
	};

	return {
		isFilePickerOpen,
		triggerFilePicker,
	};
});
