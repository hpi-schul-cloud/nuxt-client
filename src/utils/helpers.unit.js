import { delay } from "./helpers";

describe("helpers", () => {
	describe("delay", () => {
		it("should wait for the specified amount of time", async () => {
			const start = Date.now();

			await delay(100);

			const end = Date.now();
			expect(end - start).toBeGreaterThanOrEqual(100);
		});

		it("should return a promise", () => {
			expect(delay(1)).toBeInstanceOf(Promise);
		});
	});
});
