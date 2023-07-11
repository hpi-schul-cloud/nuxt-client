import {
	createSharedComposable,
	MaybeComputedRef,
	useEventListener,
	useFocus,
	useFocusWithin,
} from "@vueuse/core";
import { computed, nextTick, onMounted, onUnmounted, ref, Ref } from "vue";
import { AnyContentElement } from "../types/ContentElement";
import { BoardColumn } from "../types/Board";
import { BoardCard } from "../types/Card";
import { useInlineEditInteractionHandler } from "./InlineEditInteractionHandler.composable";

declare type FocusableId =
	| BoardColumn["id"]
	| BoardCard["id"]
	| AnyContentElement["id"];

declare type GlobalUsageReturn = {
	setFocus: (id: FocusableId) => void;
	isAnythingFocused: Ref<boolean>;
};
declare type LocalUsageReturn = {
	isFocused: Ref<boolean>;
	isFocusWithin: Ref<boolean>;
	isFocusContained: Ref<boolean>;
};
/**
 * Use this composable to force focus on a focusable element on the Board.
 */
export function useBoardFocusHandler(): GlobalUsageReturn;
/**
 * Keeps track of focused elements on the Board to retain focus state across Board changes.
 * Also keeps track of focus of child-elements.
 *
 * **Example:** A Card can receive focus again after being moved from one column to the next.
 *
 * @param id The ID that is used to track this element.
 *
 * **Example:** A CardID
 *
 * @param element TemplateRef of the focusable element.
 *
 * **Example:** The VCard representing a Card on the board.
 * @see https://vuejs.org/guide/essentials/template-refs.html
 */
export function useBoardFocusHandler(
	id: MaybeComputedRef<FocusableId>,
	element: Ref<HTMLElement | undefined>,
	onFocusReceived?: () => void
): LocalUsageReturn;
export function useBoardFocusHandler(
	id?: MaybeComputedRef<FocusableId>,
	element?: Ref<HTMLElement | undefined>,
	onFocusReceived?: () => void
): GlobalUsageReturn & LocalUsageReturn {
	const { focused: isFocused } = useFocus(element);
	const { focused: isFocusWithin } = useFocusWithin(element);

	const isFocusContained = computed(
		() => isFocused.value || isFocusWithin.value
	);

	const { setFocus, focusedId } = useSharedFocusedId();

	const isAnythingFocused = ref(focusedId.value !== undefined);

	/**
	 * Listening to 'focusin' event allows to also register focus events contained within the observed elements.
	 * This way we can keep track of focus events of child-elements.
	 */
	const cleanupFocusListener = useEventListener(
		element,
		"focusin",
		(event: FocusEvent) => {
			if (id?.valueOf()) {
				event.stopPropagation();
				setFocus(id);
			}
		}
	);

	onMounted(async () => {
		await regainFocus();
	});

	const regainFocus = async () => {
		if (id !== focusedId.value) {
			return;
		}
		await nextTick();
		isFocused.value = true;
		if (onFocusReceived !== undefined) onFocusReceived();
	};

	useInlineEditInteractionHandler(regainFocus);

	onUnmounted(() => {
		cleanupFocusListener();
	});

	return {
		/**
		 * If the observed element is focused.
		 *
		 * Setting this value manually to true focuses the element.
		 */
		isFocused,
		/**
		 * A child of the observed element is focused.
		 */
		isFocusWithin,
		/**
		 * Element isFocused or isFocusWithin.
		 */
		isFocusContained,
		/**
		 * If any BoardContent is focused at the moment
		 */
		isAnythingFocused,
		/**
		 * Set Focus for a given ID
		 */
		setFocus,
	};
}

// const useBoardFocusHandlerComposable =

const useSharedFocusedId = createSharedComposable(() => {
	const focusedId = ref<FocusableId | undefined>(undefined);

	const setFocus = (id: MaybeComputedRef<FocusableId>) => {
		if (focusedId.value === id.valueOf()) {
			return;
		}
		focusedId.value = id.toString();
	};

	return {
		focusedId,
		setFocus,
	};
});
