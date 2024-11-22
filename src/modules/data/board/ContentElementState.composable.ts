import { AnyContentElement } from "@/types/board/ContentElement";
import { watchDebounced } from "@vueuse/core";
import { computed, ComputedRef, Ref, ref, toRef, watch } from "vue";
import { useCardStore } from "./Card.store";

export const useContentElementState = <T extends AnyContentElement>(
	props: {
		element: T;
		isEditMode: boolean;
	},
	options: { autoSaveDebounce?: number } = { autoSaveDebounce: 300 }
) => {
	const cardStore = useCardStore();
	const _elementRef: Ref<T> = toRef(props, "element");

	const modelValue: Ref<T["content"]> = ref(_elementRef.value.content);

	const computedElement: ComputedRef<T> = computed(() => _elementRef.value);

	const isLoading: Ref<boolean> = ref<boolean>(false);

	watchDebounced<T["content"]>(
		modelValue.value,
		async (modelValue: T["content"]): Promise<void> => {
			await cardStore.updateElementRequest({
				element: {
					..._elementRef.value,
					content: modelValue,
				},
			});
		},
		{ debounce: options.autoSaveDebounce, maxWait: 2500 }
	);

	return {
		/**
		 * Contains the content property of the element.
		 * Will be saved automatically after a debounce
		 */
		modelValue,
		/**
		 * Contains the whole element as it is currently known in the backend
		 */
		computedElement,
		isLoading,
	};
};
