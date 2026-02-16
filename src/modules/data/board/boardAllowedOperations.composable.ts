import { useBoardStore } from "./Board.store";
import { BoardResponseAllowedOperations } from "@/serverApi/v3";
import { storeToRefs } from "pinia";
import { computed, ComputedRef } from "vue";

export const useBoardAllowedOperations = () => {
	const { board } = storeToRefs(useBoardStore());

	const allowedOperations: ComputedRef<BoardResponseAllowedOperations> = computed(
		(): BoardResponseAllowedOperations => {
			if (board.value?.allowedOperations) {
				return board.value.allowedOperations;
			} else {
				return new Proxy({} as BoardResponseAllowedOperations, {
					get: () => false,
				});
			}
		}
	);

	return {
		allowedOperations,
	};
};
