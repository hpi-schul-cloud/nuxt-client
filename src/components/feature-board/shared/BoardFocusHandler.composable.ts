import {
	createSharedComposable,
	MaybeComputedRef,
	useEventListener,
	useFocus,
	useFocusWithin,
} from "@vueuse/core";
import { computed, nextTick, onMounted, onUnmounted, ref, Ref } from "vue";
import { BoardColumn } from "../types/Board";
import { BoardCard } from "../types/Card";

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
export const useBoardFocusHandler = (
	id: MaybeComputedRef<BoardColumn["id"] | BoardCard["id"]>,
	element: Ref<HTMLElement | undefined>
) => {
	const { focused: isFocused } = useFocus(element);
	const { focused: isFocusWithin } = useFocusWithin(element);

	const isFocusContained = computed(
		() => isFocused.value || isFocusWithin.value
	);

	const { announceFocusReceived, focusedId } = useSharedFocusedId();

	/**
	 * Listen to 'focusin' allows the also register focus events contained within the observed elements.
	 * This way we can keep track of focus events of child-elements.
	 */
	const cleanupFocusListener = useEventListener(element, "focusin", () => {
		if (id?.valueOf()) {
			announceFocusReceived(id);
		}
	});

	onMounted(async () => {
		await trySetFocus();
	});

	onUnmounted(() => {
		cleanupFocusListener();
	});

	const trySetFocus = async () => {
		if (id !== focusedId.value) {
			return;
		}
		await nextTick();
		isFocused.value = true;
	};

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
	};
};

const useSharedFocusedId = createSharedComposable(() => {
	const focusedId = ref<BoardColumn["id"] | BoardCard["id"] | undefined>(
		undefined
	);

	const announceFocusReceived = (
		id: MaybeComputedRef<BoardColumn["id"] | BoardCard["id"]>
	) => {
		if (focusedId.value === id.valueOf()) {
			return;
		}
		focusedId.value = id.toString();
	};

	return {
		focusedId,
		announceFocusReceived,
	};
});
