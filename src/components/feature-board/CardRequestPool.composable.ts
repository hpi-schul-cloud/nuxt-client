import { createSharedComposable } from "@vueuse/core";
import { BoardCard } from "./types/BoardCard";

const useCardRequestPool = () => {
	console.log("pool init");
	const fetchCard = async (id: string): Promise<BoardCard> => {
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
