import { watchDebounced } from "@vueuse/core";
import { ref, toRef, unref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";
import { AnyContentElement } from "@/types/board/ContentElement";

export const useContentElementState = <T extends AnyContentElement>(
	props: {
		element: T;
		isEditMode: boolean;
	},
	options: { autoSaveDebounce?: number } = { autoSaveDebounce: 300 }
) => {
	const elementRef = toRef(props, "element");
	const modelValue = ref<T["content"]>(unref<T>(elementRef).content);

	const { updateElementCall } = useBoardApi();
	const { isErrorCode, showFailure, generateErrorText } = useBoardNotifier();

	watchDebounced(
		modelValue.value,
		async (modelValue) => {
			await updateElement(unref(modelValue));
		},
		{ debounce: options.autoSaveDebounce, maxWait: 2500 }
	);

	// TODO: refactor this to be properly typed
	const updateElement = async (payload: T["content"]) => {
		const status = await updateElementCall(props.element);
		if (isErrorCode(status)) {
			showFailure(generateErrorText("update", "boardElement"));
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
