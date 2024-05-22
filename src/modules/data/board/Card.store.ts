import { defineStore } from "pinia";
import { nextTick, ref } from "vue";
import { envConfigModule } from "@/store";

import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { CardResponse, ContentElementType } from "@/serverApi/v3";
import {
	CreateElementSuccessPayload,
	DeleteCardSuccessPayload,
	DeleteElementSuccessPayload,
	FetchCardSuccessPayload,
	MoveElementSuccessPayload,
	UpdateCardHeightSuccessPayload,
	UpdateCardTitleSuccessPayload,
	UpdateElementSuccessPayload,
} from "./cardActions/cardActionPayload";
import { useCardRestApi } from "./cardActions/cardRestApi.composable";
import { useCardSocketApi } from "./cardActions/cardSocketApi.composable";
import { useSharedLastCreatedElement } from "@util-board";
import { useSharedEditMode } from "@data-board";

export const useCardStore = defineStore("cardStore", () => {
	const cards = ref<Record<string, CardResponse>>({});
	const { lastCreatedElementId } = useSharedLastCreatedElement();

	const restApi = useCardRestApi();
	const isSocketEnabled =
		envConfigModule.getEnv.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

	const socketOrRest = isSocketEnabled ? useCardSocketApi() : restApi;

	const { setFocus } = useBoardFocusHandler();
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

		if (payload.cardId === editModeId.value) {
			setEditModeId(undefined);
		}
		delete cards.value[payload.cardId];
	};

	const createElementRequest = socketOrRest.createElementRequest;

	const createElementSuccess = async (payload: CreateElementSuccessPayload) => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

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

		lastCreatedElementId.value = payload.newElement.id;
		setFocus(payload.newElement.id);
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

	const moveElementRequest = async (
		cardId: string,
		elementId: string,
		elementIndex: number,
		delta: 1 | -1
	) => {
		const card = cards.value[cardId];
		if (card === undefined) return;

		const toPosition = elementIndex + delta;
		if (toPosition < 0) return;
		if (toPosition >= card.elements.length) return;

		socketOrRest.moveElementRequest({
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

	const deleteElementSuccess = async (
		payload: DeleteElementSuccessPayload
	): Promise<void> => {
		const card = cards.value[payload.cardId];
		if (card === undefined) return;

		const index = card.elements.findIndex((e) => e.id === payload.elementId);

		if (index !== undefined && index > -1) {
			card.elements.splice(index, 1);
		}
	};

	const updateElementRequest = socketOrRest.updateElementRequest;

	const updateElementSuccess = async (payload: UpdateElementSuccessPayload) => {
		const _card = Object.values(cards.value).find((c) => {
			if (c.elements.length === 0) return false;
			const element = c.elements.find((e) => e.id === payload.elementId);
			return element !== undefined;
		});
		if (_card === undefined) return;
		const cardId = _card.id;

		if (cardId) {
			const elementIndex = _card.elements.findIndex(
				(e) => e.id === payload.elementId
			);
			cards.value[cardId].elements[elementIndex].content = payload.data.content;
		}
	};

	return {
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
	};
});
