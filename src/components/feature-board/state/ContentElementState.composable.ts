import { watchDebounced } from "@vueuse/core";
import { ref, toRef, unref, watch } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useInlineEditInteractionHandler } from "../shared/InlineEditInteractionHandler.composable";
import { AnyContentElement } from "../types/ContentElement";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";

export const useContentElementState = <T extends AnyContentElement>(
	props: {
		element: T;
		isEditMode: boolean;
		focusOnCreate?: boolean;
	},
	options: { autoSaveDebounce?: number } = { autoSaveDebounce: 300 }
) => {
	useInlineEditInteractionHandler(() => {
		isAutoFocus.value = true;
	});
	const elementRef = toRef(props, "element");
	const isEditModeRef = toRef(props, "isEditMode");

	const isAutoFocus = ref<boolean>(false);
	const modelValue = ref<T["content"]>(unref<T>(elementRef).content);
	const focusOnCreateRef = ref<boolean>(props.focusOnCreate || false);

	const { updateElementCall } = useBoardApi();
	const { isErrorCode, showFailure, generateErrorText } = useBoardNotifier();

	watchDebounced(
		modelValue.value,
		async (modelValue) => {
			await updateElement(unref(modelValue));
		},
		{ debounce: options.autoSaveDebounce, maxWait: 2500 }
	);

	watch(
		() => isEditModeRef.value,
		(newValue, oldValue) => {
			if (newValue || !oldValue) {
				return;
			}
			isAutoFocus.value = false;
			focusOnCreateRef.value = false;
		}
	);

	const updateElement = async (payload: T["content"]) => {
		console.log("update element", { ...payload });
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
		/**
		 * Will be set to true when the element should receive focus after switching to edit-mode.
		 * Resets to false when leaving edit-mode.
		 */
		isAutoFocus,
		/**
		 * Will be set to true when the element should receive focus after creation.
		 * Resets to false when leaving edit-mode and stays false when switching back into edit-mode
		 */
		focusOnCreateRef,
	};
};
