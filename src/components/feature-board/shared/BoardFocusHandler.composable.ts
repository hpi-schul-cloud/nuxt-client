import {
	createSharedComposable,
	MaybeComputedRef,
	useEventListener,
	useFocus,
	useFocusWithin,
	VueInstance,
} from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref, Ref } from "vue";
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
		if (id !== focusedId.value) {
			return;
		}
		try {
			// element.value?.focus();
			((element.value as unknown as VueInstance)?.$el as HTMLElement).focus();
			/**
			 * investigate if setting aria-hidden OR setting a temporary message for the screenreader is a good idea
			 */
		} catch (e) {
			console.error(e);
		}
	};

	return {
		isFocused,
		isFocusWithin,
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
		console.log("new shared focus set", id);
		focusedId.value = id.toString();
	};

	return {
		focusedId,
		// announceFocusLost,
		announceFocusReceived,
	};
});
