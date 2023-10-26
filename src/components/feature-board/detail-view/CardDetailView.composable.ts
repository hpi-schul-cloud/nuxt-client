import { BoardCard } from "@/types/board/Card";
import { createSharedComposable, MaybeRef } from "@vueuse/core";
import { computed, ref, unref } from "vue";

const internalUseCardDetailView = () => {
	const dialogCard = ref<BoardCard | null>(null);

	const isOpen = computed(() => dialogCard.value !== null);

	const open = (card: MaybeRef<BoardCard | undefined | null>) => {
		const unrefedCard = unref(card);
		if (!unrefedCard) return;
		dialogCard.value = unrefedCard;
	};

	const close = () => {
		dialogCard.value = null;
	};

	return {
		open,
		close,
		isOpen,
		dialogCard,
	};
};

export const useCardDetailView = createSharedComposable(
	internalUseCardDetailView
);
