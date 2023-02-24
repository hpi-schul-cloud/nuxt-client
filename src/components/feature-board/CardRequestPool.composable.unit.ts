import { CardsApiInterface } from "@/serverApi/v3";
import { useSharedCardRequestPool } from "./CardRequestPool.composable";
import * as serverApi from "../../serverApi/v3/api";
import * as axios from "axios";
import { initializeAxios } from "@/utils/api";

initializeAxios({
	get: async (path: string) => {
		return {
			data: {
				data: [{ id: "test-id1" }, { id: "test-id2" }, { id: "test-id3" }],
			},
		};
	},
	post: async (path: string) => {
		return { data: [] };
	},
	request: async (path: string) => {
		return {
			data: {
				data: [{ id: "test-id1" }, { id: "test-id2" }, { id: "test-id3" }],
			},
		};
	},
} as axios.AxiosInstance);

jest.mock("axios");

const setup = () => {
	const cardsApiFactoryMock = {
		cardsControllerGetCards: jest.fn().mockResolvedValue({
			data: {
				data: [{ id: "test-id1" }, { id: "test-id2" }, { id: "test-id3" }],
			},
		}),
	};
	jest
		.spyOn(serverApi, "CardsApiFactory")
		.mockReturnValue(cardsApiFactoryMock as unknown as CardsApiInterface);

	return { cardsApiFactoryMock };
};

describe("card-request-pool.composable", () => {
	it("should return Card data", async () => {
		const mockFetchCard = jest.spyOn(useSharedCardRequestPool(), "fetchCard");

		useSharedCardRequestPool().fetchCard("test-id");

		expect(mockFetchCard).toHaveBeenCalledWith("test-id");
	});

	it("should batch requests", async () => {
		const { cardsApiFactoryMock } = setup();

		const { fetchCard } = useSharedCardRequestPool();
		await Promise.all([
			fetchCard("test-id1"),
			fetchCard("test-id2"),
			fetchCard("test-id3"),
		]);

		expect(cardsApiFactoryMock.cardsControllerGetCards).toHaveBeenCalledTimes(
			1
		);
	});
});
