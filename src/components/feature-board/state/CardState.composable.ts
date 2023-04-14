import { onMounted, reactive, toRef } from "vue";
import { useSharedCardRequestPool } from "../shared/CardRequestPool.composable";
import { BoardCard } from "../types/Card";
import {
	ContentElementType,
	TextContentElement,
} from "../types/ContentElement";

const DUMMY_CARD: BoardCard = {
	cardId: "0123456789abcdef00000003",
	elements: [
		{
			type: ContentElementType.TEXT,
			content: { text: "MyElementContent" },
			id: "0123456789abcdef00067003",
		},
	],
	height: 250,
	title: "CardTitle",
	visibility: {
		publishedAt:
			"Thu Feb 23 2023 11:56:51 GMT+0100 (Central European Standard Time)",
	},
};

declare type CardState = {
	isLoading: boolean;
	card: BoardCard | undefined;
};

export const useCardState = (id: BoardCard["cardId"]) => {
	const cardState = reactive<CardState>({ isLoading: true, card: undefined });

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();

	const fetchCard = async (id: string): Promise<void> => {
		if (id === DUMMY_CARD.cardId) {
			cardState.card = { ...DUMMY_CARD };
			cardState.isLoading = false;
			return;
		}
		try {
			cardState.card = await fetchCardFromApi(id);
		} catch (error) {
			console.error(error);
		}
		cardState.isLoading = false;
	};

	const updateTitle = (newTitle: string): void => {
		if (cardState.card === undefined) {
			return;
		}
		console.log("update title", newTitle);
		cardState.card.title = newTitle;
	};

	const deleteCard = (cardId: string) => {
		console.log("DELETE CARD", cardId);
	};

	const updateCardHeight = (newHeight: number) => {
		if (cardState.card === undefined) {
			return;
		}
		if (cardState.card.height === newHeight) {
			return;
		}
		cardState.card.height = newHeight;
	};

	const addElement = (type: ContentElementType) => {
		if (cardState.card === undefined) {
			return;
		}
		if (type === "text") {
			const newTextContentElement: TextContentElement = {
				id: "0123456789abcdef00067043",
				type,
				content: { text: "" },
			};
			cardState.card.elements.push(newTextContentElement);
		}
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
