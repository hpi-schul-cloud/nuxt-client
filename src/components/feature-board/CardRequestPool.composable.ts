import { CardsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { createSharedComposable, useDebounceFn } from "@vueuse/core";
import { BoardCard } from "./types/Card";

type CardRequest = {
	id: string;
	resolve: (value: BoardCard | PromiseLike<BoardCard>) => void;
	reject: (error: Error) => void;
};

const MAX_CARDIDS_PER_REQUEST = 100;
const WAIT_AFTER_LAST_CALL_IN_MS = 5;
const MAX_WAIT_BEFORE_FIRST_CALL_IN_MS = 200;

const useCardRequestPool = () => {
	const cardsApi = CardsApiFactory(undefined, "/v3", $axios);
	const requestPool: CardRequest[] = [];

	const fetchCard = async (cardId: string): Promise<BoardCard> => {
		return new Promise((resolve, reject) => {
			requestPool.push({ id: cardId, resolve, reject });
			debouncedFetchCards();
		});
	};

	const debouncedFetchCards = useDebounceFn(
		async () => {
			const poolCopy = requestPool.splice(0, 9999999); // atomic operation
			const requestChunks = cutIntoChunks(poolCopy, MAX_CARDIDS_PER_REQUEST);
			await fetchCardChunks(requestChunks);
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
		const promises = [];
		for (const chunk of chunks) {
			promises.push(fetchCards(chunk));
		}
		return Promise.all(promises); // TODO: handle failed requests
	};

	const fetchCards = async (cardRequests: CardRequest[]) => {
		const cardIds = cardRequests.map(({ id }) => id);
		const response = await cardsApi.cardControllerGetCards(cardIds);
		const cards = response.data.data as unknown as BoardCard[];

		if (cards) {
			for (const card of cards) {
				const requestEntry = cardRequests.find(({ id }) => id === card.id);
				if (requestEntry) {
					requestEntry.resolve(card);
				}
			}
		}
	};

	return { fetchCard };
};

export const useSharedCardRequestPool =
	createSharedComposable(useCardRequestPool);
