import { ContentElementType } from "@/serverApi/v3";
import { nextTick, onMounted, reactive, toRef } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { BoardCard } from "../types/Card";
import { AnyContentElement } from "../types/ContentElement";
import { ElementMove } from "../types/DragAndDrop";

declare type CardState = {
	isLoading: boolean;
	card: BoardCard | undefined;
};

export type AddCardElement = (
	type: ContentElementType
) => Promise<AnyContentElement | undefined>;

export const useCardState = (id: BoardCard["id"]) => {
	const cardState = reactive<CardState>({ isLoading: true, card: undefined });

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();
	const {
		createElementCall,
		deleteElementCall,
		deleteCardCall,
		moveElementCall,
		updateCardHeightCall,
		updateCardTitle,
	} = useBoardApi();

	const fetchCard = async (id: string): Promise<void> => {
		try {
			cardState.card = await fetchCardFromApi(id);
		} catch (error) {
			console.error(error);
		}
		cardState.isLoading = false;
	};

	const updateTitle = async (newTitle: string): Promise<void> => {
		if (cardState.card === undefined) {
			return;
		}
		await updateCardTitle(cardState.card.id, newTitle);
		cardState.card.title = newTitle;
	};

	const deleteCard = async () => {
		if (cardState.card === undefined) {
			return;
		}

		await deleteCardCall(cardState.card.id);
	};

	const updateCardHeight = async (newHeight: number) => {
		if (cardState.card === undefined) {
			return;
		}
		if (cardState.card.height === newHeight) {
			return;
		}
		await updateCardHeightCall(cardState.card.id, newHeight);
		cardState.card.height = newHeight;
	};

	const addElement = async (type: ContentElementType) => {
		if (cardState.card === undefined) {
			return;
		}
		const result = await createElementCall(cardState.card.id, { type });

		cardState.card.elements.push(result as unknown as AnyContentElement);

		return result;
	};

	const extractElement = async (
		elementId: string
	): Promise<AnyContentElement | undefined> => {
		if (cardState.card === undefined) return;

		const elementIndex = cardState.card.elements.findIndex(
			(element: AnyContentElement) => element.id === elementId
		);
		if (elementIndex > -1) {
			const extractedElements = cardState.card.elements.splice(elementIndex, 1);
			/**
			 * refreshes the board to force rerendering in tracked v-for
			 * to maintain focus when moving cards by keyboard
			 */
			await nextTick();
			return extractedElements[0];
		}
	};

	const moveElementDown = async (elementPayload: ElementMove) => {
		if (cardState.card === undefined) {
			return;
		}
		const { elementIndex, payload } = elementPayload;
		if (
			elementIndex === cardState.card.elements.length - 1 ||
			elementIndex === -1
		) {
			return;
		}

		const element = await extractElement(payload);
		if (element) {
			cardState.card.elements.splice(elementIndex + 1, 0, element);
		}
		await moveElementCall(payload, cardState.card.id, elementIndex + 1);
	};

	const moveElementUp = async (elementPayload: ElementMove) => {
		if (cardState.card === undefined) {
			return;
		}
		const { elementIndex, payload } = elementPayload;
		if (elementIndex <= 0) {
			return;
		}

		const element = await extractElement(payload);
		if (element) {
			cardState.card.elements.splice(elementIndex - 1, 0, element);
		}
		await moveElementCall(payload, cardState.card.id, elementIndex - 1);
	};

	const deleteElement = async (elementId: string) => {
		if (cardState.card === undefined) {
			return;
		}

		await deleteElementCall(elementId);
		extractElement(elementId);
	};

	onMounted(() => fetchCard(id));

	return {
		fetchCard,
		updateTitle,
		deleteCard,
		updateCardHeight,
		addElement,
		moveElementDown,
		moveElementUp,
		deleteElement,
		card: toRef(cardState, "card"),
		isLoading: toRef(cardState, "isLoading"),
	};
};
