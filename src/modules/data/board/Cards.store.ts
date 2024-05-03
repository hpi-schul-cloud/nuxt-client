import { BoardCard } from "@/types/board/Card";
import { defineStore } from "pinia";
import { nextTick, ref } from "vue";
import { delay } from "@/utils/helpers";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { useBoardApi } from "./BoardApi.composable";

import {
	ApiErrorHandlerFactory,
	ErrorType,
	BoardObjectType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";

import { ElementMove } from "@/types/board/DragAndDrop";
import {
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";

export const useCardStore = defineStore("cardStore", () => {
	const cards = ref<BoardCard[]>([]);
	const isLoading = ref<boolean>(false);

	const { handleError, notifyWithTemplate } = useErrorHandler();
	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const { setFocus } = useBoardFocusHandler();
	const {
		createElementCall,
		deleteElementCall,
		updateCardTitle,
		updateCardHeightCall,
		moveElementCall,
	} = useBoardApi();

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

	const addElement = async (
		type: ContentElementType,
		cardId: string,
		atFirstPosition?: boolean
	) => {
		const card = getCard(cardId);
		if (card === undefined) return;

		try {
			const params: CreateContentElementBodyParams = { type };
			if (atFirstPosition) {
				params.toPosition = 0;
			}
			const response = await createElementCall(card.id, params);

			if (atFirstPosition) {
				card.elements.splice(0, 0, response.data);
			} else {
				card.elements.push(response.data);
			}

			setFocus(response.data.id);
			return response.data;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardElement"),
				400: notifyWithTemplate("notCreated", "boardElement"),
			});
		}
	};

	const addTextAfterTitle = async (cardId: string) => {
		const card = getCard(cardId);
		if (card === undefined) return;

		return await addElement(ContentElementType.RichText, card.id, true);
	};

	const moveElementDown = async (
		cardId: string,
		elementPayload: ElementMove
	) => {
		const card = getCard(cardId);
		if (card === undefined) return;
		try {
			const { elementIndex, payload: elementId } = elementPayload;
			if (elementIndex === card.elements.length - 1 || elementIndex === -1) {
				return;
			}
			await moveElement(card, elementIndex, elementId, "down");
			await moveElementCall(elementId, cardId, elementIndex + 1);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const moveElementUp = async (cardId: string, elementPayload: ElementMove) => {
		const card = getCard(cardId);
		if (card === undefined) return;

		try {
			const { elementIndex, payload: elementId } = elementPayload;
			if (elementIndex <= 0) return;

			await moveElement(card, elementIndex, elementId, "up");
			await moveElementCall(elementId, cardId, elementIndex - 1);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const moveElement = async (
		card: BoardCard,
		elementIndex: number,
		elementId: string,
		direction: "up" | "down"
	) => {
		if (card === undefined) return;

		const element = card.elements.filter(
			(element) => element.id === elementId
		)[0];

		const delta = direction === "up" ? -1 : 1;

		card.elements.splice(elementIndex, 1);
		await nextTick();
		card.elements.splice(elementIndex + delta, 0, element);
	};

	const deleteElement = async (
		cardId: string,
		elementId: string
	): Promise<void> => {
		const card = getCard(cardId);
		if (card === undefined) return;

		try {
			await deleteElementCall(elementId);
			extractElement(card, elementId);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notUpdated"),
			});
		}
	};

	const extractElement = (card: BoardCard, elementId: string): void => {
		const index = card.elements.findIndex((e) => e.id === elementId);

		if (index !== undefined && index > -1) {
			card.elements.splice(index, 1);
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
		addElement,
		addTextAfterTitle,
		addCardToState,
		cards,
		deleteElement,
		fetchCard,
		getCard,
		isLoading,
		moveElementDown,
		moveElementUp,
		resetState,
		updateCardHeight,
		updateTitle,
	};
});
