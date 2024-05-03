import { BoardCard } from "@/types/board/Card";
import { defineStore } from "pinia";
import { ref } from "vue";
import { delay } from "@/utils/helpers";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { useBoardApi } from "./BoardApi.composable";

import {
	ApiErrorHandlerFactory,
	ErrorType,
	BoardObjectType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";

export const useCardStore = defineStore("cardStore", () => {
	const cards = ref<BoardCard[]>([]);
	const isLoading = ref<boolean>(false);

	const { handleError, notifyWithTemplate } = useErrorHandler();
	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const { updateCardTitle, updateCardHeightCall } = useBoardApi();

	const fetchCard = async (id: string): Promise<void> => {
		await delay(100);
		try {
			const card = await fetchCardFromApi(id);
			isLoading.value = true;

			addCardToState(card);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notLoaded", "boardCard"),
			});
		} finally {
			isLoading.value = false;
		}
	};

	const addCardToState = (card: BoardCard) => {
		if (cards.value.find((c) => c.id === card.id) !== undefined) return;
		cards.value.push(card);
	};

	const resetState = () => {
		cards.value = [];
	};

	const getCard = (cardId: string) => {
		return cards.value.find((c) => c.id === cardId);
	};

	const updateTitle = async (
		newTitle: string,
		cardId: string
	): Promise<void> => {
		const card = getCard(cardId);
		if (card === undefined) return;

		try {
			card.title = newTitle;
			await updateCardTitle(cardId, newTitle);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const updateCardHeight = async (cardId: string, newHeight: number) => {
		const card = getCard(cardId);
		if (card === undefined) return;

		try {
			await updateCardHeightCall(cardId, newHeight);
			card.height = newHeight;
		} catch (error) {
			handleError(error, {});
		}
	};

	const notifyWithTemplateAndReload: ApiErrorHandlerFactory = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			notifyWithTemplate(errorType, boardObjectType)();
			// emit("reload:board");
			// setEditModeId(undefined);
		};
	};

	return {
		addCardToState,
		cards,
		fetchCard,
		getCard,
		isLoading,
		resetState,
		updateCardHeight,
		updateTitle,
	};
});
