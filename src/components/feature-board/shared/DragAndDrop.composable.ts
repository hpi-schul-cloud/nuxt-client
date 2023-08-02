import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

const dragAndDrop = () => {
	const isDragging = ref(false);
	const dragStart = (): void => {
		isDragging.value = true;
	};
	const dragEnd = (): void => {
		isDragging.value = false;
	};

	return {
		isDragging,
		dragStart,
		dragEnd,
	};
};

/**
 * Shares user permissions (/me)
 */
export const useDragAndDrop = createSharedComposable(dragAndDrop);
