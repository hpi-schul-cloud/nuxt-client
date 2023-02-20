import { onMounted, ref } from "vue";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { BoardCard } from "./types/BoardCard";

export const useCardState = (id: BoardCard["id"]) => {
	const isLoading = ref<boolean>(true);

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();

	const fetchCard = async (id: string): Promise<void> => {
		card.value = await fetchCardFromApi(id);
		isLoading.value = false;
	};

	const card = ref<BoardCard | undefined>(undefined);

	onMounted(() => fetchCard(id));

	return {
		fetchCard,
		card,
		isLoading,
	};
};
