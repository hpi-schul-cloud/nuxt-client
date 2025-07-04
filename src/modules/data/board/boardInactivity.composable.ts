import { useDocumentVisibility } from "@vueuse/core";
import { useTimeoutFn } from "@vueuse/shared";
import { nextTick, ref, watch } from "vue";
import { useBoardStore } from "./Board.store";
import { useCardStore } from "./Card.store";

export const connectionOptions = {
	isTimeoutReached: false,
	maxTimeOutForInactivity: 0,
};

export const useBoardInactivity = (
	maxInactivityTime: number = connectionOptions.maxTimeOutForInactivity
) => {
	const boardStore = useBoardStore();
	const cardStore = useCardStore();

	const timeoutFn = useTimeoutFn(() => {
		connectionOptions.isTimeoutReached = true;
	}, maxInactivityTime);

	const visibility = ref(useDocumentVisibility());

	watch(visibility, async (current, previous) => {
		if (!(boardStore.board && cardStore.cards)) return;
		if (timeoutFn.isPending) timeoutFn.stop();

		if (current === "visible" && previous === "hidden") {
			if (connectionOptions.isTimeoutReached) {
				await boardStore.reloadBoard();
				await cardStore.fetchCardRequest({
					cardIds: Object.keys(cardStore.cards),
				});
				await nextTick();
			}

			timeoutFn.stop();
			connectionOptions.isTimeoutReached = false;
			return;
		}

		timeoutFn.start();
	});

	return { visibility };
};
