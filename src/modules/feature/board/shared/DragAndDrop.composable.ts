import { createSharedComposable } from "@vueuse/core";
import { ref } from "vue";

// TODO: move out of board module into util/

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
 * Shares dragAndDrop state
 */
export const useDragAndDrop = createSharedComposable(dragAndDrop);
