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
		createElement,
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
		const response = await updateCardTitle(cardState.card.id, newTitle);
		if (isErrorCode(response?.status)) {
			await showErrorAndReload(generateErrorText("update"));
			return;
		}
		cardState.card.title = newTitle;
	};

	const deleteCard = async () => {
		if (cardState.card === undefined) return;

		const response = await deleteCardCall(cardState.card.id);
		if (isErrorCode(response?.status)) {
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
		await updateCardHeightCall(cardState.card.id, newHeight);
		cardState.card.height = newHeight;
	};

	const addElement = async (type: ContentElementType) => {
		if (cardState.card === undefined) {
			return;
		}
		const result = await createElement(cardState.card.id, { type });
		if (!result.id) {
			await showErrorAndReload(generateErrorText("create", "boardElement"));
			return;
		}
		cardState.card.elements.push(result as unknown as AnyContentElement);

		return result;
	};

	const showErrorAndReload = async (errorText: string | undefined) => {
		if (cardState.card === undefined) return;
		showFailure(errorText);
		await fetchCard(cardState.card.id);
	};

	onMounted(() => fetchCard(id));

	return {
		fetchCard,
		updateTitle,
		deleteCard,
		updateCardHeight,
		addElement,
		card: toRef(cardState, "card"),
		isLoading: toRef(cardState, "isLoading"),
	};
};
