import { createSharedComposable, useElementBounding } from "@vueuse/core";
import { ref, Ref, unref } from "vue";

// TODO create factory by groupName to have a shared handler for a group -- NOT A GLOBAL HANDLER!!!

export const useDragAndDropListManager = createSharedComposable(() => {
	const elements = ref<HTMLElement[]>([]);

	const isDragging = ref(false);
	const currentlyDraggedElement = ref<HTMLElement | null>(null);

	const handlerStartDrag = (payload: { element: Ref<HTMLElement | null> }) => {
		console.log("drag started in handler");
		currentlyDraggedElement.value = payload.element.value;
		isDragging.value = true;
	};

	const handlerStopDrag = () => {
		console.log("drag started in handler");
		currentlyDraggedElement.value = null;
		isDragging.value = false;
	};

	const register = (ref: Ref<HTMLElement | null>) => {
		// how do we sort the elements into the list?
		return {
			handlerStartDrag,
			handlerStopDrag,
		};
	};

	return {
		register,
		elements,
		isDragging,
	};
});

const getElementBoundingBoxes = (
	elements: Ref<HTMLElement[]>
): ReturnType<typeof useElementBounding>[] => {
	return unref(elements).map((e) => useElementBounding(e));
};

// const getElementBoundingBoxesCenters // wtf?
