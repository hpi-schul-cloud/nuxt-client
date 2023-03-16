import { onMounted, ref } from "vue";
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

export const useCardState = (id: AnyCard["id"]) => {
	const isLoading = ref<boolean>(true);

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();

	const fetchCard = async (id: string): Promise<void> => {
		if (id === DUMMY_CARD.id) {
			card.value = DUMMY_CARD;
			isLoading.value = false;
			return;
		}
		try {
			card.value = await fetchCardFromApi(id);
		} catch (error) {
			console.error(error);
		}
		isLoading.value = false;
	};

	const updateTitle = (newTitle: string): void => {
		if (card.value === undefined) {
			return;
		}
		console.log("new Title!", newTitle);
		card.value.title = newTitle;
	};

	const deleteCard = () => {
		console.log("DELETE CARD");
	};

	const card = ref<AnyCard | undefined>(undefined);

	onMounted(() => fetchCard(id));

	return {
		fetchCard,
		updateTitle,
		deleteCard,
		card,
		isLoading,
	};
};
