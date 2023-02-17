import { onMounted, ref } from "vue";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { AnyCard } from "./types/Card";

export const useCardState = (id: AnyCard["id"]) => {
	const isLoading = ref<boolean>(true);

	const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();

	const fetchCard = async (id: string): Promise<void> => {
		card.value = await fetchCardFromApi(id);
		isLoading.value = false;
	};

	const card = ref<AnyCard | undefined>(undefined);

	onMounted(() => fetchCard(id));

	return {
		fetchCard,
		card,
		isLoading,
	};
};
