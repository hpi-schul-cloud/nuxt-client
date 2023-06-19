import { ContentElementType } from "@/serverApi/v3";
import { onMounted, reactive, toRef } from "vue";
import { useBoardApi } from "../shared/BoardApi.composable";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { BoardCard } from "../types/Card";
import { AnyContentElement } from "../types/ContentElement";
import { useBoardNotifier } from "../shared/BoardNotifications.composable";

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
		updateCardHeightCall,
		updateCardTitle,
	} = useBoardApi();
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
		const status = await updateCardTitle(cardState.card.id, newTitle);
		if (isErrorCode(status)) {
			await showErrorAndReload(generateErrorText("update"));
			return;
		}
		cardState.card.title = newTitle;
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

	const addElement = async (type: ContentElementType) => {
		if (cardState.card === undefined) {
			return;
		}
		const response = await createElementCall(cardState.card.id, { type });
		if (isErrorCode(response.status)) {
			await showErrorAndReload(generateErrorText("create", "boardElement"));
			return;
		}
		cardState.card.elements.push(response.data as unknown as AnyContentElement);

		return response.data;
	};

	const showErrorAndReload = async (errorText: string | undefined) => {
		if (cardState.card === undefined) return;
		showFailure(errorText);
		await fetchCard(cardState.card.id);
	};

	const deleteElement = async (elementId: string) => {
		if (cardState.card === undefined) {
			return;
		}

		await deleteElementCall(elementId);
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
		deleteCard,
		fetchCard,
		updateCardHeight,
		updateTitle,
		deleteElement,
		card: toRef(cardState, "card"),
		isLoading: toRef(cardState, "isLoading"),
	};
};
