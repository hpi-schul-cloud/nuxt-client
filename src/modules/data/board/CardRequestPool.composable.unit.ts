import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import { BoardCardApiInterface } from "@/serverApi/v3";
import * as serverApi from "@/serverApi/v3/api";

let mockReturnData: { data: { data: { id: string }[] } };
const cardsApiFactoryMock = {
	cardControllerGetCards: vi.fn().mockImplementation(() => mockReturnData),
};

const setup = (...cardIds: string[]) => {
	const returnedCards = cardIds.map((id) => ({ id }));
	mockReturnData = { data: { data: returnedCards } };

	vi.spyOn(serverApi, "BoardCardApiFactory").mockReturnValue(cardsApiFactoryMock as unknown as BoardCardApiInterface);

	return { cardsApiFactoryMock };
};

describe("card-request-pool.composable", () => {
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should return Card data", async () => {
		vi.useFakeTimers();

		const CARD_ID = "test-id";
		const { cardsApiFactoryMock } = setup(CARD_ID);

		const { fetchCard } = useSharedCardRequestPool();

		const promise = fetchCard(CARD_ID);

		// Advance timers to trigger the debounced fetch
		await vi.advanceTimersByTimeAsync(500);
		await promise;

		expect(cardsApiFactoryMock.cardControllerGetCards).toHaveBeenCalledWith([CARD_ID]);
	});

	it("should batch requests", async () => {
		vi.useFakeTimers();

		const CARD_ID1 = "test-id1";
		const CARD_ID2 = "test-id2";
		const CARD_ID3 = "test-id3";

		const { cardsApiFactoryMock } = setup(CARD_ID1, CARD_ID2, CARD_ID3);

		const { fetchCard } = useSharedCardRequestPool();

		// Call fetchCard in parallel
		const promise = Promise.all([fetchCard(CARD_ID1), fetchCard(CARD_ID2), fetchCard(CARD_ID3)]);

		// Advance timers to trigger the debounced fetch
		await vi.advanceTimersByTimeAsync(500);
		await promise;

		expect(cardsApiFactoryMock.cardControllerGetCards).toHaveBeenCalledTimes(1);
		expect(cardsApiFactoryMock.cardControllerGetCards).toHaveBeenCalledWith([CARD_ID1, CARD_ID2, CARD_ID3]);
	});
});
