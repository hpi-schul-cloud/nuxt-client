import {
	ContentElementType,
	CreateContentElementBodyParams,
} from "@/serverApi/v3";
import { nextTick, onMounted, reactive, toRef } from "vue";
import { useBoardApi } from "./BoardApi.composable";
import { useBoardFocusHandler } from "./BoardFocusHandler.composable";
import { useBoardNotifier } from "@util-board";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { BoardCard } from "@/types/board/Card";
import { ElementMove } from "@/types/board/DragAndDrop";

declare type CardState = {
	isLoading: boolean;
	card: BoardCard | undefined;
};

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
	const { setFocus } = useBoardFocusHandler();
	const { isErrorCode, showFailure, generateErrorText } = useBoardNotifier();

	const fetchCard = async (id: string): Promise<void> => {
		try {
			cardState.card = await fetchCardFromApi(id);
		} catch (error) {
			const errorText = generateErrorText("read", "boardCard");
			showFailure(errorText);
			console.error(error);
		}
		cardState.isLoading = false;
	};

	const updateTitle = async (newTitle: string): Promise<void> => {
		if (cardState.card === undefined) {
			return;
		}
		cardState.card.title = newTitle;
		const status = await updateCardTitle(cardState.card.id, newTitle);
		if (isErrorCode(status)) {
			await showErrorAndReload(generateErrorText("update"));
		}
	};

	const deleteCard = async () => {
		if (cardState.card === undefined) return;

		const status = await deleteCardCall(cardState.card.id);
		if (isErrorCode(status)) {
			await showErrorAndReload(generateErrorText("delete", "boardCard"));
		}
	};

	const updateCardHeight = async (newHeight: number) => {
		if (cardState.card === undefined) {
			return;
		}
		if (cardState.card.height === newHeight) {
			return;
		}
		const status = await updateCardHeightCall(cardState.card.id, newHeight);
		if (isErrorCode(status)) {
			await showErrorAndReload(generateErrorText("update"));
			return;
		}
		cardState.card.height = newHeight;
	};

	const addElement = async (
		type: ContentElementType,
		atFirstPosition?: boolean
	) => {
		if (cardState.card === undefined) {
			return;
		}
		const params: CreateContentElementBodyParams = { type };
		if (atFirstPosition) {
			params.toPosition = 0;
		}
		const response = await createElementCall(cardState.card.id, params);
		if (isErrorCode(response.status)) {
			await showErrorAndReload(generateErrorText("create", "boardElement"));
			return;
		}

		if (atFirstPosition) {
			cardState.card.elements.splice(0, 0, response.data);
		} else {
			cardState.card.elements.push(response.data);
		}

		setFocus(response.data.id);

		return response.data;
	};

	const addTextAfterTitle = async () => {
		return await addElement(ContentElementType.RichText, true);
	};

	const showErrorAndReload = async (errorText: string | undefined) => {
		if (cardState.card === undefined) return;
		showFailure(errorText);
		await fetchCard(cardState.card.id);
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

		const element = cardState.card.elements.filter(
			(element) => element.id === payload
		)[0];

		cardState.card.elements.splice(elementIndex, 1);
		await nextTick();
		cardState.card.elements.splice(elementIndex + 1, 0, element);

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

		const element = cardState.card.elements.filter(
			(element) => element.id === payload
		)[0];

		cardState.card.elements.splice(elementIndex, 1);
		await nextTick();
		cardState.card.elements.splice(elementIndex - 1, 0, element);

		await moveElementCall(payload, cardState.card.id, elementIndex - 1);
	};

	const deleteElement = async (elementId: string): Promise<void> => {
		if (cardState.card === undefined) {
			return;
		}

		const status = await deleteElementCall(elementId);
		if (isErrorCode(status)) {
			await showErrorAndReload(generateErrorText("update"));
			return;
		}
		extractElement(elementId);
	};

	const extractElement = (elementId: string): void => {
		const index = cardState.card?.elements.findIndex((e) => e.id === elementId);

		if (index !== undefined && index > -1) {
			cardState.card?.elements.splice(index, 1);
		}
	};

	onMounted(() => fetchCard(id));

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
	};
};
