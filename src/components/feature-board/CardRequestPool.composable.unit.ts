import { useSharedCardRequestPool } from "./CardRequestPool.composable";

describe("card-request-pool.composable", () => {
	it("should return Card data", async () => {
		const mockFetchCard = jest.spyOn(useSharedCardRequestPool(), "fetchCard");

		useSharedCardRequestPool().fetchCard("test-id");

		expect(mockFetchCard).toHaveBeenCalledWith("test-id");
	});
});
