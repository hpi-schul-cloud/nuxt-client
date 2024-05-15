import { defineStore } from "pinia";
import { nextTick, ref } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { envConfigModule } from "@/store";

import {
	ApiErrorHandlerFactory,
	ErrorType,
	BoardObjectType,
	useErrorHandler,
} from "@/components/error-handling/ErrorHandler.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useBoardStore, useSharedEditMode } from "@data-board";
import { ElementMove } from "@/types/board/DragAndDrop";
import { CardResponse, ContentElementType } from "@/serverApi/v3";
import {
	CreateElementSuccessPayload,
	DeleteCardSuccessPayload,
	FetchCardSuccessPayload,
	UpdateCardHeightSuccessPayload,
	UpdateCardTitleSuccessPayload,
} from "./cardActions/cardActionPayload";
import { useCardRestApi } from "./cardActions/cardRestApi.composable";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";

export const useCardStore = defineStore("cardStore", () => {
	const boardStore = useBoardStore();
	const cards = ref<Record<string, CardResponse>>({});

	const restApi = useCardRestApi();
	const isSocketEnabled =
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

	const socketOrRest = isSocketEnabled ? useCardSocketApi() : restApi;

	const { handleError, notifyWithTemplate } = useErrorHandler();
	const { setFocus } = useBoardFocusHandler();
	const { setEditModeId } = useSharedEditMode();

	const {
		// deleteCardCall,
		deleteElementCall,
		moveElementCall,
	} = useBoardApi();

	const fetchCardRequest = socketOrRest.fetchCardRequest;

	const fetchCardSuccess = (payload: FetchCardSuccessPayload) => {
		for (const card of payload.cards) {
			cards.value[card.id] = card;
		}
	};

	const resetState = () => {
		cards.value = {};
	};

	const getCard = (cardId: string): CardResponse | undefined => {
		return cards.value[cardId];
	};

	const updateCardTitleRequest = socketOrRest.updateCardTitleRequest;

	const updateCardTitleSuccess = async (
		payload: UpdateCardTitleSuccessPayload
	) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		card.title = payload.newTitle;
	};

	const updateCardHeightRequest = socketOrRest.updateCardHeightRequest;

	const updateCardHeightSuccess = async (
		payload: UpdateCardHeightSuccessPayload
	) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		card.height = payload.newHeight;
	};

	const deleteCardRequest = socketOrRest.deleteCardRequest;

	const deleteCardSuccess = async (payload: DeleteCardSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		delete cards.value[payload.cardId];
	};

	const createElementRequest = socketOrRest.createElementRequest;

	const createElementSuccess = async (payload: CreateElementSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		try {
			const { toPosition } = payload;
			if (
				toPosition !== undefined &&
				toPosition >= 0 &&
				toPosition <= card.elements.length
			) {
				card.elements.splice(toPosition, 0, payload.newElement);
			} else {
				card.elements.push(payload.newElement);
			}

			setFocus(payload.newElement.id);
			return payload.newElement;
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notCreated", "boardElement"),
				400: notifyWithTemplate("notCreated", "boardElement"),
			});
		}
	};

	const addTextAfterTitle = async (cardId: string) => {
		const card = cards.value[cardId];
		if (card === undefined) return;

		return await createElementRequest({
			type: ContentElementType.RichText,
			cardId: card.id,
			toPosition: 0,
		});
	};

	const moveElementDown = async (
		cardId: string,
		elementPayload: ElementMove
	) => {
		const card = cards.value[cardId];
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
		const card = cards.value[cardId];
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
		card: CardResponse,
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
		const card = cards.value[cardId];
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

	const extractElement = (card: CardResponse, elementId: string): void => {
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
			boardStore.reloadBoard();
			setEditModeId(undefined);
		};
	};

	return {
		createElementRequest,
		createElementSuccess,
		addTextAfterTitle,
		fetchCardRequest,
		fetchCardSuccess,
		cards,
		deleteCardRequest,
		deleteCardSuccess,
		deleteElement,
		getCard,
		moveElementDown,
		moveElementUp,
		resetState,
		updateCardHeightRequest,
		updateCardHeightSuccess,
		updateCardTitleRequest,
		updateCardTitleSuccess,
	};
});
