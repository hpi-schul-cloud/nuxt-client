import { CardsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { createSharedComposable } from "@vueuse/core";
import { AnyCard, LegacyTaskCard } from "./types/Card";

const useCardRequestPool = () => {
	console.log("pool init");

	const cardsApi = CardsApiFactory(undefined, "/v3", $axios);

	const fetchCard = async (id: string): Promise<AnyCard> => {
		cardsApi.cardsControllerGetCards([id]);
		return new Promise((r) => {
			setTimeout(
				() => r({ ...MOCK_CARD, id }),
				Math.floor(Math.random() * 2000)
			);
		});
	};

	return { fetchCard };
};

export const useSharedCardRequestPool =
	createSharedComposable(useCardRequestPool);

const MOCK_CARD: LegacyTaskCard = {
	id: "889b0ff2-ad1e-11ed-afa1-0242ac120004",
	title: "MyFirstCard!",
	height: 200,
	elements: [],
	taskId: "25",
	cardType: "legacy-task-reference",
	visibility: {
		publishedAt: "2022-01-01 20:00:00",
	},
};
