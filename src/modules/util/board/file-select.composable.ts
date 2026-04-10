import { createSharedComposable } from "@vueuse/core";
import { Ref, ref } from "vue";

const useFileSelect = () => {
	const isFileSelectOnMountEnabled: Ref<boolean> = ref(true);

	const resetFileSelectOnMountEnabled = () => {
		isFileSelectOnMountEnabled.value = true;
	};

	const disableFileSelectOnMount = () => {
		isFileSelectOnMountEnabled.value = false;
	};

	return {
		isFileSelectOnMountEnabled,
		resetFileSelectOnMountEnabled,
		disableFileSelectOnMount,
	};
};

export const useSharedFileSelect = createSharedComposable(useFileSelect);
