import { createSharedComposable } from "@vueuse/core";
import { Ref, ref } from "vue";

const useFileSelect = () => {
	const triggerFileSelect: Ref<boolean> = ref(true);

	const resetTriggerFileSelect = () => {
		triggerFileSelect.value = true;
	};

	return {
		triggerFileSelect,
		resetTriggerFileSelect,
	};
};

export const useSharedFileSelect = createSharedComposable(useFileSelect);
