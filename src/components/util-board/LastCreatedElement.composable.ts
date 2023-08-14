import { createSharedComposable } from "@vueuse/core";
import { Ref, ref } from "vue";

const useLastCreatedElement = () => {
	const lastCreatedElementId: Ref<string | undefined> = ref(undefined);

	const resetLastCreatedElementId = () => {
		setTimeout(() => {
			lastCreatedElementId.value = undefined;
		}, 1000);
	};

	return {
		lastCreatedElementId,
		resetLastCreatedElementId,
	};
};

export const useSharedLastCreatedElement = createSharedComposable(
	useLastCreatedElement
);
