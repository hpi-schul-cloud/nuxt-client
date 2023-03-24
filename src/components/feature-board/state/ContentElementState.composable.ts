import { watchDebounced } from "@vueuse/core";
import { ref, toRef, unref, watch } from "vue";
import { useContentElementInteractionHandler } from "../ContentElementInteractionHandler.composable";
import { AnyContentElement } from "../types/ContentElement";

export const useContentElementState = <T extends AnyContentElement>(
	props: {
		element: T;
		isEditMode: boolean;
	},
	options: { autoSaveDebounce?: number } = { autoSaveDebounce: 300 }
) => {
	useContentElementInteractionHandler(() => {
		isAutoFocus.value = true;
	});
	const elementRef = toRef(props, "element");
	const isEditModeRef = toRef(props, "isEditMode");

	const isAutoFocus = ref<boolean>(false);
	const modelValue = ref<T["content"]>(unref<T>(elementRef).content);

	watchDebounced(
		modelValue.value,
		(modelValue) => {
			updateElement(unref(modelValue));
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
		}
	);

	const updateElement = (payload: T["content"]) => {
		console.log("update element", { ...payload });
	};

	return {
		/**
		 * Contains the content property of the element.
		 *
		 * Will be saved automatically after a debounce
		 */
		modelValue,
		/**
		 * Will be set to true when the element should receive focus after switching to edit-mode.
		 * Resets to false when leaving edit-mode.
		 */
		isAutoFocus,
	};
};
