import {
	createSharedComposable,
	MaybeComputedRef,
	useEventListener,
	useFocus,
	useFocusWithin,
	VueInstance,
} from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref, Ref, unref } from "vue";
import { BoardColumn } from "../types/Board";
import { BoardCard } from "../types/Card";

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

	const cleanupFocusListener = useEventListener(element, "focus", () => {
		console.log("received manual focus", id.valueOf());
		if (id?.valueOf()) {
			announceFocusReceived(id);
		}
	});

	onMounted(() => {
		console.log(
			"mounted with cardId: ",
			id,
			"shared focusId:",
			focusedId.value
		);
		trySetFocus();
	});

	onUnmounted(() => {
		cleanupFocusListener();
	});

	const trySetFocus = () => {
		const hostElement = unref(element);
		if (id !== focusedId.value) {
			return;
		}
		if (hostElement === undefined) {
			return;
		}
		try {
			if (hostElement.focus !== undefined) {
				// element.value.setAttribute("aria-hidden", "true");
				hostElement.focus();
				// element.value.setAttribute("aria-hidden", "false");
			} else {
				extractHtmlElementFromVueComponent(
					hostElement as unknown as VueInstance
				).focus();
			}
		} catch (e: unknown) {
			console.error(e);
		}
	};

	return {
		isFocused,
		isFocusWithin,
		isFocusContained,
	};
};

const extractHtmlElementFromVueComponent = (
	component: VueInstance
): HTMLElement => {
	return component?.$el as HTMLElement;
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
		console.log("new shared focus set", id);
		focusedId.value = id.toString();
	};

	return {
		focusedId,
		// announceFocusLost,
		announceFocusReceived,
	};
});
