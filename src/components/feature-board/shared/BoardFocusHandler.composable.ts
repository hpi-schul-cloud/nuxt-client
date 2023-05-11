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
		focusedId.value = id.toString();
	};

	return {
		focusedId,
		announceFocusReceived,
	};
});
