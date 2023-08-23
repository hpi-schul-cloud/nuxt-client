import {
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";
import { nextTick, onMounted, reactive, ref, toRef } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { BoardCard } from "@/types/board/Card";
import { ElementMove } from "@/types/board/DragAndDrop";
import { handleError } from "../error-handling/handleError";
import { handleWithNotifier } from "@/components/error-handling/handlers/handleWithNotifier";

declare type CardState = {
	isLoading: boolean;
	card: BoardCard | undefined;
};

export const useCardState = (id: BoardCard["id"]) => {
	const needsBoardReload = ref(false);
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
	const { setFocus } = useBoardFocusHandler();

	const fetchCard = async (id: string): Promise<void> => {
		try {
			cardState.card = await fetchCardFromApi(id);
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notLoaded", "boardCard"),
			});
		} finally {
			cardState.isLoading = false;
		}
	};

	const updateTitle = async (newTitle: string): Promise<void> => {
		if (cardState.card === undefined) return;

		try {
			cardState.card.title = newTitle;
			await updateCardTitle(cardState.card.id, newTitle);
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notUpdated"),
			});
		}
	};

	const deleteCard = async () => {
		if (cardState.card === undefined) return;

		try {
			await deleteCardCall(cardState.card.id);
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notDeleted", "boardCard"),
			});
		}
	};

	const updateCardHeight = async (newHeight: number) => {
		if (cardState.card === undefined) return;

		try {
			await updateCardHeightCall(cardState.card.id, newHeight);
			cardState.card.height = newHeight;
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notUpdated"),
			});
		}
	};

	const addElement = async (
		type: ContentElementType,
		atFirstPosition?: boolean
	) => {
		if (cardState.card === undefined) return;

		try {
			const params: CreateContentElementBodyParams = { type };
			if (atFirstPosition) {
				params.toPosition = 0;
			}
			const response = await createElementCall(cardState.card.id, params);

			if (atFirstPosition) {
				cardState.card.elements.splice(0, 0, response.data);
			} else {
				cardState.card.elements.push(response.data);
			}

			setFocus(response.data.id);
			return response.data;
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notCreated", "boardElement"),
			});
		}
	};

	const addTextAfterTitle = async () => {
		return await addElement(ContentElementType.RichText, true);
	};

	const moveElementDown = async (elementPayload: ElementMove) => {
		if (cardState.card === undefined) return;
		try {
			const { elementIndex, payload: elementId } = elementPayload;
			if (
				elementIndex === cardState.card.elements.length - 1 ||
				elementIndex === -1
			) {
				return;
			}
			await moveElement(elementIndex, elementId, "down");
			await moveElementCall(elementId, cardState.card.id, elementIndex + 1);
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notUpdated"),
			});
		}
	};

	const moveElementUp = async (elementPayload: ElementMove) => {
		if (cardState.card === undefined) return;

		try {
			const { elementIndex, payload: elementId } = elementPayload;
			if (elementIndex <= 0) {
				return;
			}

			await moveElement(elementIndex, elementId, "up");
			await moveElementCall(elementId, cardState.card.id, elementIndex - 1);
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notUpdated"),
			});
		}
	};

	const moveElement = async (
		elementIndex: number,
		elementId: string,
		direction: "up" | "down"
	) => {
		if (cardState.card === undefined) return;

		const element = cardState.card.elements.filter(
			(element) => element.id === elementId
		)[0];

		const delta = direction === "up" ? -1 : 1;

		cardState.card.elements.splice(elementIndex, 1);
		await nextTick();
		cardState.card.elements.splice(elementIndex + delta, 0, element);
	};

	const deleteElement = async (elementId: string): Promise<void> => {
		if (cardState.card === undefined) return;

		try {
			await deleteElementCall(elementId);
			extractElement(elementId);
		} catch (error) {
			handleError(error, {
				404: handleWithNotifier("notUpdated"),
			});
		}
	};

	const extractElement = (elementId: string): void => {
		const index = cardState.card?.elements.findIndex((e) => e.id === elementId);

		if (index !== undefined && index > -1) {
			cardState.card?.elements.splice(index, 1);
		}
	};

	onMounted(() => {
		fetchCard(id).then(() => ({
			// do nothing but celebrating sonarcloud
		}));
	});

	return {
		addElement,
		moveElementDown,
		moveElementUp,
		deleteCard,
		fetchCard,
		updateCardHeight,
		updateTitle,
		deleteElement,
		addTextAfterTitle,
		card: toRef(cardState, "card"),
		isLoading: toRef(cardState, "isLoading"),
		needsBoardReload, // WIP: discuss with others: better way? composable ==(emit)==> "parent"
	};
};
