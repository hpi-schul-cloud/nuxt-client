import { watchDebounced } from "@vueuse/core";
import { computed, ComputedRef, Ref, ref, toRef, unref, UnwrapRef } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { AnyContentElement } from "@/types/board/ContentElement";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

export const useContentElementState = <T extends AnyContentElement>(
	props: {
		element: T;
		isEditMode: boolean;
	},
	options: { autoSaveDebounce?: number } = { autoSaveDebounce: 300 }
) => {
	const _elementRef: Ref<T> = toRef(props, "element");
	const _responseValue = ref<T>(unref<T>(_elementRef));

	const { handleError, notifyWithTemplate } = useErrorHandler();
	const { updateElementCall } = useBoardApi();

	const modelValue = ref<T["content"]>(unref<T>(_elementRef).content);

	const computedElement: ComputedRef<T> = computed(() => ({
		..._elementRef.value,
		..._responseValue.value,
	}));

	const isLoading = ref<boolean>(false);

	watchDebounced<T["content"]>(
		modelValue.value,
		async (modelValue) => {
			await updateElement(modelValue);
		},
		{ debounce: options.autoSaveDebounce, maxWait: 2500 }
	);

	// TODO: refactor this to be properly typed
	const updateElement = async (content: T["content"]) => {
		isLoading.value = true;
		const payload = {
			...computedElement.value,
			content: { ...content },
		};
		try {
			const response = await updateElementCall(payload);
			_responseValue.value = response.data as UnwrapRef<T>;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notUpdated", "boardElement"),
			});
		} finally {
			isLoading.value = false;
		}
	};

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
