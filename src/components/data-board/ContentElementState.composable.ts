import { toValue, watchDebounced } from "@vueuse/core";
import { Ref, ref, toRef, unref } from "vue";
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
	const { handleError, notifyWithTemplate } = useErrorHandler();
	const elementRef: Ref<T> = toRef(props, "element");
	const modelValue = ref<T["content"]>(unref<T>(elementRef).content);

	const { updateElementCall } = useBoardApi();

	watchDebounced<T["content"]>(
		modelValue.value,
		async (modelValue) => {
			await updateElement(modelValue);
		},
		{ debounce: options.autoSaveDebounce, maxWait: 2500 }
	);

	// TODO: refactor this to be properly typed
	const updateElement = async (content: T["content"]) => {
		const payload = {
			...elementRef.value,
			content: { ...content },
		};
		try {
			await updateElementCall(payload);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplate("notUpdated", "boardElement"),
			});
		}
	};

	return {
		/**
		 * Contains the content property of the element.
		 * Will be saved automatically after a debounce
		 */
		modelValue,
	};
};
