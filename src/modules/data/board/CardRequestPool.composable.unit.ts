import { BoardCardApiInterface } from "@/serverApi/v3";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import * as serverApi from "@/serverApi/v3/api";

let mockReturnData: { data: { data: { id: string }[] } };
const cardsApiFactoryMock = {
	cardControllerGetCards: jest.fn().mockImplementation(() => mockReturnData),
};

const setup = (...cardIds: string[]) => {
	const returnedCards = cardIds.map((id) => ({ id }));
	mockReturnData = { data: { data: returnedCards } };

	jest
		.spyOn(serverApi, "BoardCardApiFactory")
		.mockReturnValue(cardsApiFactoryMock as unknown as BoardCardApiInterface);

	return { cardsApiFactoryMock };
};

describe("card-request-pool.composable", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return Card data", async () => {
		const CARD_ID = "test-id";
		const { cardsApiFactoryMock } = setup(CARD_ID);

		const { fetchCard } = useSharedCardRequestPool();
		await fetchCard(CARD_ID);

		expect(cardsApiFactoryMock.cardControllerGetCards).toHaveBeenCalledWith([
			CARD_ID,
		]);
	});

	it("should batch requests", async () => {
		const CARD_ID1 = "test-id1";
		const CARD_ID2 = "test-id2";
		const CARD_ID3 = "test-id3";

		const { cardsApiFactoryMock } = setup(CARD_ID1, CARD_ID2, CARD_ID3);

		const { fetchCard } = useSharedCardRequestPool();

		await Promise.all([
			fetchCard(CARD_ID1),
			fetchCard(CARD_ID2),
			fetchCard(CARD_ID3),
		]);

		expect(cardsApiFactoryMock.cardControllerGetCards).toHaveBeenCalledTimes(1);
	});
});
