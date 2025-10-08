import { BoardColumn } from "@/types/board/Board";
import { BoardCard } from "@/types/board/Card";
import { AnyContentElement } from "@/types/board/ContentElement";
import { useInlineEditInteractionHandler } from "@util-board";
import { createSharedComposable, MaybeRefOrGetter, useEventListener, useFocus, useFocusWithin } from "@vueuse/core";
import { computed, nextTick, onMounted, onUnmounted, Ref, ref } from "vue";

declare type FocusableId = BoardColumn["id"] | BoardCard["id"] | AnyContentElement["id"];

declare type FocusHandler = {
	isFocused: Ref<boolean>;
	isFocusWithin: Ref<boolean>;
	isFocusContained: Ref<boolean>;
	isFocusedById: Ref<boolean>;
	setFocus: (id: FocusableId) => void;
	forceFocus: (id: FocusableId) => void;
	isAnythingFocused: Ref<boolean>;
	focusedId: Ref<string | undefined>;
};

/**
 * Use this composable to force focus on a focusable element on the Board.
 */
export function useBoardFocusHandler(): Pick<FocusHandler, "isAnythingFocused" | "setFocus" | "forceFocus">;
/**
 * Keeps track of focused elements on the Board to retain focus state across Board changes.
 * Also keeps track of focus of child-elements. The Composable associates the given ID to the given element
 * and tries to focus it in onMounted hook when the ID matches the currently focused ID.
 * It also watches the element to update the focused ID automatically.
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
 * @param onFocusReceived Callback when the element should become focused.
 * This overwrites the default behavior of the composable.
 *
 * **Example:** When you want to do more than just focusing the elementRef.
 * e.g. when your elementRef is a custom component and not a HTMLElement
 */
export function useBoardFocusHandler(
	id: MaybeRefOrGetter<FocusableId>,
	element: Ref<HTMLElement | null>,
	onFocusReceived?: () => void
): Pick<FocusHandler, "isFocusContained" | "isFocusWithin" | "isFocused" | "isFocusedById" | "focusedId">;
/**
 * Internal type to enable mocking of overloads
 */
export function useBoardFocusHandler(id?: string, element?: never, onFocusReceived?: never): Partial<FocusHandler>;
export function useBoardFocusHandler(
	id?: MaybeRefOrGetter<FocusableId> | string,
	element?: Ref<HTMLElement | null>,
	onFocusReceived?: () => void
): Partial<FocusHandler> {
	const { setFocus, focusedId, forceFocus } = useSharedFocusedId();

	const isAnythingFocused = ref(focusedId.value !== undefined);

	if (!id?.valueOf()) {
		return {
			/**
			 * If any BoardContent is focused at the moment
			 */
			isAnythingFocused,
			/**
			 * Set Focus for a given ID
			 */
			setFocus,
			forceFocus,
		};
	}

	if (id?.valueOf() && element === undefined) {
		return {
			setFocus,
			focusedId,
		};
	}

	const { focused: isFocused } = useFocus(element);
	const { focused: isFocusWithin } = useFocusWithin(element);

	const isFocusContained = computed(() => isFocused.value || isFocusWithin.value);

	const isFocusedById = computed(() => id.valueOf() === focusedId.value);

	onMounted(() => {
		if (id !== focusedId.value) {
			return;
		}
		forceFocusOnMount();
	});

	const forceFocusOnMount = async () => {
		await nextTick();
		if (onFocusReceived !== undefined) {
			onFocusReceived();
			setFocus(id);
			return;
		}
		isFocused.value = true;
	};

	/**
	 * Listening to 'focusin' event allows to also register focus events contained within the observed elements.
	 * This way we can keep track of focus events of child-elements.
	 */
	const cleanupFocusListener = useEventListener(element, "focusin", (event: FocusEvent) => {
		if (id?.valueOf()) {
			event.stopPropagation();
			setFocus(id);
		}
	});

	/**
	 * If an InlineEditInteraction is fired within the element boundary, force focus on this element
	 */
	useInlineEditInteractionHandler(async () => {
		await forceFocusOnMount();
	});

	onUnmounted(() => {
		cleanupFocusListener();
	});

	return {
		/**
		 * If the observed element is focused by the browser.
		 *
		 * Setting this value manually to true focuses the element.
		 */
		isFocused,
		/**
		 * A child of the observed element is focused by the browser.
		 */
		isFocusWithin,
		/**
		 * Element isFocused or isFocusWithin.
		 */
		isFocusContained,
		/**
		 * The element is registered as the currently focused element.
		 * This is not concerned whether the browser is actually focusing the element or not
		 */
		isFocusedById,
	};
}

const useSharedFocusedId = createSharedComposable(() => {
	const focusedId = ref<FocusableId | undefined>(undefined);

	const setFocus = (id: MaybeRefOrGetter<FocusableId>) => {
		if (focusedId.value === id.valueOf()) {
			return;
		}
		focusedId.value = id.toString();
	};

	const forceFocus = (id: MaybeRefOrGetter<FocusableId>) => {
		const element = document.getElementById(id.toString()) as HTMLElement;

		element?.focus();
	};

	return {
		focusedId,
		setFocus,
		forceFocus,
	};
});
