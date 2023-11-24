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

	return {
		element,
		setElement,
		materialId,
		getElement,
		getElementsRoute,
	};
});
