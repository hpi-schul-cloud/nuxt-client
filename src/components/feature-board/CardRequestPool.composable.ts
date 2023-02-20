import { CardsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { createSharedComposable } from "@vueuse/core";
import { AnyCard } from "./types/Card";

const useCardRequestPool = () => {
	console.log("pool init");

	const cardsApi = CardsApiFactory(undefined, "/v3", $axios);

	const fetchCard = async (cardId: string): Promise<AnyCard> => {
		const result = await cardsApi.cardsControllerGetCards([cardId]);
		const cardData = result.data.data.find(({ id }) => id === cardId);
		if (cardData) {
			return cardData as unknown as AnyCard;
		} else {
			return Promise.reject();
		}
	};

	return { fetchCard };
};

export const useSharedCardRequestPool =
	createSharedComposable(useCardRequestPool);
