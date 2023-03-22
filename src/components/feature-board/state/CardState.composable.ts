import { onMounted, reactive, toRef } from "vue";
import { useSharedCardRequestPool } from "../CardRequestPool.composable";
import { BoardCard } from "../types/Card";

const DUMMY_CARD: BoardCard = {
	id: "0123456789abcdef00000003",
	elements: [
		{
			type: "text",
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

export const useCardState = (id: BoardCard["id"]) => {
	const cardState = reactive<CardState>({ isLoading: true, card: undefined });

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();

	const fetchCard = async (id: string): Promise<void> => {
		if (id === DUMMY_CARD.id) {
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
		cardState.card.title = newTitle;
	};

	const deleteCard = () => {
		console.log("DELETE CARD");
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

	onMounted(() => fetchCard(id));

	return {
		fetchCard,
		updateTitle,
		deleteCard,
		updateCardHeight,
		card: toRef(cardState, "card"),
		isLoading: toRef(cardState, "isLoading"),
	};
};
