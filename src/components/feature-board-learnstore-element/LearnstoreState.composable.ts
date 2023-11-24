import { createSharedComposable } from "@vueuse/core";
import { ref, Ref } from "vue";
import { LearnstoreElementResponse } from "@/serverApi/v3";
import { Route } from "vue-router";

const element: Ref<LearnstoreElementResponse | null> = ref(null);

const route: Ref<Route | null> = ref(null);

const materialId: Ref<string | null> = ref(null);

export const useSharedLearnstoreState = createSharedComposable(() => {
	const setElement = (
		boardElement: Ref<LearnstoreElementResponse>,
		from?: Route
	) => {
		resetState();
		element.value = boardElement.value;
		if (from) {
			route.value = from;
		}
	};

	const getElement = (): Ref<LearnstoreElementResponse | null> => {
		return element;
	};

	const getElementsRoute = (): Ref<Route | null> => {
		return route;
	};

	const resetState = () => {
		element.value = null;
		route.value = null;
		materialId.value = null;
	};

	const setMaterialId = (id: string) => {
		materialId.value = id;
	};

	const getMaterialId = (): Ref<string | null> => {
		return ref(materialId.value);
	};

	return {
		setElement,
		getMaterialId,
		setMaterialId,
		getElement,
		getElementsRoute,
		resetState,
	};
});
