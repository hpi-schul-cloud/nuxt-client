import { BoardCard } from "@/types/board/Card";
import { defineStore } from "pinia";
import { nextTick, ref } from "vue";
import { delay } from "@/utils/helpers";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
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
import {
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";
import {
	DeleteCardSuccessPayload,
	UpdateCardHeightSuccessPayload,
	UpdateCardTitleSuccessPayload,
} from "./cardActions/cardActionPayload";
import { useCardRestApi } from "./cardActions/cardRestApi.composable";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";

export const useCardStore = defineStore("cardStore", () => {
	const boardStore = useBoardStore();
	const cards = ref<BoardCard[]>([]);
	// const isLoading = ref<boolean>(false);

	const restApi = useCardRestApi();
	const isSocketEnabled =
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

	const socketOrRest = isSocketEnabled ? useCardSocketApi() : restApi;

	const { handleError, notifyWithTemplate } = useErrorHandler();
	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const { setFocus } = useBoardFocusHandler();
	const { setEditModeId } = useSharedEditMode();

	const {
		createElementCall,
		// deleteCardCall,
		deleteElementCall,
		moveElementCall,
	} = useBoardApi();

	const fetchCard = async (id: string): Promise<void> => {
		await delay(100);
		try {
			const card = await fetchCardFromApi(id);

			addCardToState(card);
		} catch (error) {
			handleError(error, {
				404: notifyWithTemplateAndReload("notLoaded", "boardCard"),
			});
		} finally {
			// isLoading.value = false;
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

	const updateCardTitleRequest = socketOrRest.updateCardTitleRequest;

	const updateCardTitleSuccess = async (
		payload: UpdateCardTitleSuccessPayload
	) => {
		const card = getCard(payload.cardId);
		if (card === undefined) return;

		card.title = payload.newTitle;
	};

	const updateCardHeightRequest = socketOrRest.updateCardHeightRequest;

	const updateCardHeightSuccess = async (
		payload: UpdateCardHeightSuccessPayload
	) => {
		const card = getCard(payload.cardId);
		if (card === undefined) return;

		card.height = payload.newHeight;
	};

	const deleteCardRequest = socketOrRest.deleteCardRequest;

	const deleteCardSuccess = async (payload: DeleteCardSuccessPayload) => {
		const card = getCard(payload.cardId);
		if (card === undefined) return;

		cards.value = cards.value.filter((c) => c.id !== payload.cardId);
		boardStore.deleteCardSuccess(payload);
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

	const isCardLoadingState = (cardId: string) => {
		const card = getCard(cardId);
		if (card === undefined) return true;
		return false;
	};

	const notifyWithTemplateAndReload: ApiErrorHandlerFactory = (
		errorType: ErrorType,
		boardObjectType?: BoardObjectType
	) => {
		return () => {
			notifyWithTemplate(errorType, boardObjectType)();
			// TODO: find a way to trigger reload of the board in the board store
			//  emit("reload:board");
			setEditModeId(undefined);
		};
	};

	return {
		addElement,
		addTextAfterTitle,
		addCardToState,
		cards,
		deleteCardRequest,
		deleteCardSuccess,
		deleteElement,
		fetchCard,
		getCard,
		isCardLoadingState,
		// isLoading,
		moveElementDown,
		moveElementUp,
		resetState,
		updateCardHeightRequest,
		updateCardHeightSuccess,
		updateCardTitleRequest,
		updateCardTitleSuccess,
	};
});
