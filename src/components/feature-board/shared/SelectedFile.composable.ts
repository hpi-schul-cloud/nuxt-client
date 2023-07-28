import { ENV_CONFIG_MODULE_KEY, injectStrict } from "@/utils/inject";
import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";
import { useFileStorageNotifier } from "./FileStorageNotifications.composable";

export const useSelectedFile = createSharedComposable(() => {
	const selectedFile = ref<File>();
	const envConfigModule = injectStrict(ENV_CONFIG_MODULE_KEY);
	const { showFileTooBigError } = useFileStorageNotifier();

	const setSelectedFile = (file?: File) => {
		if (file && file.size > envConfigModule.getMaxFileSize) {
			showFileTooBigError();
			return false;
		}

		selectedFile.value = file;
		return true;
	};

	const getSelectedFile = () => {
		return selectedFile.value;
	};

	return {
		setSelectedFile,
		getSelectedFile,
	};
});
