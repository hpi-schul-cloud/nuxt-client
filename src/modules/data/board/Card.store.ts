import { CreateCardSuccessPayload } from "./boardActions/boardActionPayload.types";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import {
	CreateElementRequestPayload,
	CreateElementSuccessPayload,
	DeleteCardSuccessPayload,
	DeleteElementSuccessPayload,
	DuplicateCardSuccessPayload,
	FetchCardSuccessPayload,
	MoveElementSuccessPayload,
	UpdateCardHeightSuccessPayload,
	UpdateCardTitleSuccessPayload,
	UpdateElementSuccessPayload,
} from "./cardActions/cardActionPayload.types";
import { useCardRestApi } from "./cardActions/cardRestApi.composable";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";
import { CardResponse, ContentElementType, PreferredToolResponse, ToolContextType } from "@/serverApi/v3";
import { useEnvConfig } from "@data-env";
import { useSharedEditMode, useSharedLastCreatedElement } from "@util-board";
import { defineStore } from "pinia";
import { nextTick, Ref, ref } from "vue";

export const useCardStore = defineStore("cardStore", () => {
	const cards: Ref<Record<string, CardResponse>> = ref({});
	const preferredTools: Ref<PreferredToolResponse[]> = ref([]);
	const isPreferredToolsLoading: Ref<boolean> = ref(false);

	const { lastCreatedElementId } = useSharedLastCreatedElement();

	const restApi = useCardRestApi();
	const isSocketEnabled = useEnvConfig().value.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

	const socketOrRest = isSocketEnabled ? useCardSocketApi() : restApi;

	const { setFocus, forceFocus } = useBoardFocusHandler();
	const { setEditModeId, editModeId } = useSharedEditMode();

	const fetchCardRequest = socketOrRest.fetchCardRequest;

	const fetchCardSuccess = (payload: FetchCardSuccessPayload) => {
		for (const card of payload.cards) {
			cards.value[card.id] = card;
		}
	};

	const resetState = () => {
		cards.value = {};
	};

	const getCard = (cardId: string): CardResponse | undefined => cards.value[cardId];

	const createCardSuccess = (payload: CreateCardSuccessPayload) => {
		if (payload.newCard) {
			cards.value[payload.newCard.id] = payload.newCard;
		}
	};

	const updateCardTitleRequest = socketOrRest.updateCardTitleRequest;

	const updateCardTitleSuccess = (payload: UpdateCardTitleSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		card.title = payload.newTitle;
	};

	const updateCardHeightRequest = socketOrRest.updateCardHeightRequest;

	const updateCardHeightSuccess = (payload: UpdateCardHeightSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		card.height = payload.newHeight;
	};

	const duplicateCardRequest = socketOrRest.duplicateCardRequest;

	const duplicateCardSuccess = (payload: DuplicateCardSuccessPayload) => {
		if (payload.duplicatedCard.id) {
			cards.value[payload.duplicatedCard.id] = payload.duplicatedCard;
		}
	};

	const deleteCardRequest = socketOrRest.deleteCardRequest;

	const deleteCardSuccess = (payload: DeleteCardSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		if (payload.cardId === editModeId.value) {
			setEditModeId(undefined);
		}
		delete cards.value[payload.cardId];
	};

	const createElementRequest = socketOrRest.createElementRequest;

	const createPreferredElement = (payload: CreateElementRequestPayload, tool: PreferredToolResponse) => {
		restApi.createPreferredElement(payload, tool);
	};

	const createElementSuccess = (payload: CreateElementSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		const { toPosition } = payload;
		if (toPosition !== undefined && toPosition >= 0 && toPosition <= card.elements.length) {
			card.elements.splice(toPosition, 0, payload.newElement);
		} else {
			card.elements.push(payload.newElement);
		}

		if (payload.isOwnAction === true) {
			lastCreatedElementId.value = payload.newElement.id;
			setFocus(payload.newElement.id);
		}

		return payload.newElement;
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

	const moveElementRequest = async (cardId: string, elementId: string, elementIndex: number, delta: 1 | -1) => {
		const card = cards.value[cardId];
		if (card === undefined) return;

		const toPosition = elementIndex + delta;
		if (toPosition < 0) return;
		if (toPosition >= card.elements.length) return;

		await socketOrRest.moveElementRequest({
			elementId,
			toCardId: cardId,
			toPosition,
		});
	};

	const moveElementSuccess = async (payload: MoveElementSuccessPayload) => {
		const card = cards.value[payload.toCardId];
		if (card === undefined) return;

		const element = card.elements.find((e) => e.id === payload.elementId);

		if (element) {
			card.elements.splice(card.elements.indexOf(element), 1);
			await nextTick();
			const toPosition = Math.min(payload.toPosition, card.elements.length);
			card.elements.splice(toPosition, 0, element);
		}
	};

	const deleteElementRequest = socketOrRest.deleteElementRequest;

	const deleteElementSuccess = (payload: DeleteElementSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		const { focusedId } = useBoardFocusHandler(payload.elementId);
		if (focusedId?.value === payload.elementId) {
			const previousId = getPreviousElementId(payload.elementId, payload.cardId);

			if (!previousId) return;
			forceFocus(previousId);
		}

		const index = card.elements.findIndex((e) => e.id === payload.elementId);
		if (index !== undefined && index > -1) {
			card.elements.splice(index, 1);
		}
		setEditModeId(payload.cardId);
	};

	const updateElementRequest = socketOrRest.updateElementRequest;

	const updateElementSuccess = (payload: UpdateElementSuccessPayload) => {
		const cardToUpdate = Object.values(cards.value).find((c) => c.elements.some((e) => e.id === payload.elementId));
		if (cardToUpdate === undefined) return;
		const cardId = cardToUpdate.id;

		if (cardId) {
			const elementIndex = cardToUpdate.elements.findIndex((e) => e.id === payload.elementId);
			cards.value[cardId].elements[elementIndex].content = payload.data.content;
		}
	};

	const getPreviousElementId = (elementId: string, cardId: string): string | undefined => {
		const elements = cards.value[cardId].elements;
		if (elements.length === 0) return cardId;

		const elementIndex = elements.findIndex((e) => e.id === elementId);
		if (elementIndex <= 0) return cardId;

		const previousElement = elements[elementIndex - 1];
		const { setEditModeId } = useSharedEditMode();
		setEditModeId(cardId);

		if (previousElement.type === ContentElementType.RichText) {
			return getPreviousElementId(previousElement.id, cardId);
		}

		return previousElement.id;
	};

	const loadPreferredTools = async (contextType: ToolContextType) => {
		isPreferredToolsLoading.value = true;

		preferredTools.value = (await restApi.getPreferredTools(contextType)) || [];

		isPreferredToolsLoading.value = false;
	};

	const disconnectSocketRequest = () => {
		socketOrRest.disconnectSocketRequest();
	};

	return {
		createPreferredElement,
		createCardSuccess,
		createElementRequest,
		createElementSuccess,
		deleteElementRequest,
		deleteElementSuccess,
		updateElementRequest,
		updateElementSuccess,
		addTextAfterTitle,
		fetchCardRequest,
		fetchCardSuccess,
		cards,
		duplicateCardRequest,
		duplicateCardSuccess,
		deleteCardRequest,
		deleteCardSuccess,
		getCard,
		moveElementRequest,
		moveElementSuccess,
		resetState,
		updateCardHeightRequest,
		updateCardHeightSuccess,
		updateCardTitleRequest,
		updateCardTitleSuccess,
		loadPreferredTools,
		preferredTools,
		isPreferredToolsLoading,
		disconnectSocketRequest,
	};
});
