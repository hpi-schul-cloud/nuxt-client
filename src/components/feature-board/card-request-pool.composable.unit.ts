import { useSharedCardRequestPool } from "./card-request-pool.composable";

describe("card-request-pool.composable", () => {
	it("should return Card data", async () => {
		const { fetchCard: fetchCardFromApi } = useSharedCardRequestPool();

		const result = await fetchCardFromApi("test-id");

		expect(result.id).toStrictEqual("test-id");
		expect(typeof result).toBe("object");
	});
});
