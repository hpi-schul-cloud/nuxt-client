import { onMounted, reactive, ref, toRef, unref } from "vue";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { AnyCard, BoardCardType, LegacyLessonCard } from "./types/Card";

const DUMMY_CARD: LegacyLessonCard = {
	id: "0123456789abcdef00000003",
	cardType: BoardCardType.LegacyLesson,
	elements: [],
	height: 250,
	lessonId: "anystring",
	title: "CardTitle",
	visibility: {
		publishedAt:
			"Thu Feb 23 2023 11:56:51 GMT+0100 (Central European Standard Time)",
	},
};

declare type CardState = {
	isLoading: boolean;
	card: AnyCard | undefined;
};

export const useCardState = (id: AnyCard["id"]) => {
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
