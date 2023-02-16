import { ref } from "vue";
import { BoardCard } from "./types/BoardCard";

export const useCardState = () => {
	const isLoading = ref<boolean>(false);
	const pool = ref<string[]>([]);

	const fetchCard = async (id: string): Promise<void> => {
		await new Promise((r) => {
			pool.value = [...pool.value, id];
			console.log(pool.value, pool.value.length);
			setTimeout(r, Math.floor(Math.random() * 10000));
		});

		card.value = MOCK_CARD;
		isLoading.value = false;
	};

	const card = ref<BoardCard | undefined>(undefined);

	return {
		fetchCard,
		card,
		isLoading,
	};
};

const MOCK_CARD: BoardCard = {
	id: "889b0ff2-ad1e-11ed-afa1-0242ac120004",
	title: "MyFirstCard!",
	height: 200,
	elements: [],
	cardType: "legacy-task-reference",
	visibility: {
		publishedAt: "2022-01-01 20:00:00",
	},
};
