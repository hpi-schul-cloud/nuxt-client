import { createSharedComposable } from "@vueuse/core";
import { Ref, ref } from "vue";

const useLastCreatedElement = () => {
	const lastCreatedElementId: Ref<string | undefined> = ref(undefined);

	const resetLastCreatedElementId = () => {
		lastCreatedElementId.value = undefined;
	};

	return {
		lastCreatedElementId,
		resetLastCreatedElementId,
	};
};

export const useSharedLastCreatedElement = createSharedComposable(useLastCreatedElement);
