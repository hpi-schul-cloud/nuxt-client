import { BoardCardApiFactory, CardResponse } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { createTestableSharedComposable } from "@/utils/create-shared-composable";
import { useDebounceFn } from "@vueuse/core";

type CardRequest = {
	id: string;
	resolve: (value: CardResponse | PromiseLike<CardResponse>) => void;
	reject: (error: Error) => void;
};

const MAX_CARDIDS_PER_REQUEST = 100;
const WAIT_AFTER_LAST_CALL_IN_MS = 5;
const MAX_WAIT_BEFORE_FIRST_CALL_IN_MS = 200;

const useCardRequestPool = () => {
	const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
	const requestPool: CardRequest[] = [];

	const fetchCard = async (cardId: string): Promise<CardResponse> =>
		new Promise((resolve, reject) => {
			requestPool.push({ id: cardId, resolve, reject });
			debouncedFetchCards();
		});

	const debouncedFetchCards = useDebounceFn(
		() => {
			const poolCopy = requestPool.splice(0, 9999999); // atomic operation
			const requestChunks = cutIntoChunks(poolCopy, MAX_CARDIDS_PER_REQUEST);
			fetchCardChunks(
				requestChunks
			).then(/* show sonarcloud that you know that the function is async but it does not matter */);
		},
		WAIT_AFTER_LAST_CALL_IN_MS,
		{ maxWait: MAX_WAIT_BEFORE_FIRST_CALL_IN_MS }
	);

	const cutIntoChunks = <T>(data: T[], chunkSize: number): T[][] => {
		const chunks = [];
		for (let i = 0; i < data.length; i += chunkSize) {
			chunks.push(data.slice(i, i + chunkSize));
		}
		return chunks;
	};

	const fetchCardChunks = async (chunks: CardRequest[][]) => {
		const promises: Promise<unknown>[] = [];
		for (const chunk of chunks) {
			promises.push(fetchCards(chunk));
		}
		const results = await Promise.allSettled(promises);
		const fulfilled = results.filter((result) => result.status === "fulfilled");
		return fulfilled;
	};

	const fetchCards = async (cardRequests: CardRequest[]) => {
		const cardIds = cardRequests.map(({ id }) => id);
		const response = await cardsApi.cardControllerGetCards(cardIds);
		const cards = response.data.data as unknown as CardResponse[];

		if (cards) {
			for (const card of cards) {
				const requestEntry = cardRequests.find(({ id }) => id === card.id);
				if (requestEntry) {
					requestEntry.resolve(card);
				}
			}
			const cardIds: string[] = cards.map((card) => card.id);
			const failed = cardRequests.filter(({ id }) => !cardIds.includes(id));
			failed.forEach((requestEntry) => requestEntry.reject(new Error()));
		}
	};

	return { fetchCard };
};

export const useSharedCardRequestPool = createTestableSharedComposable(useCardRequestPool);
