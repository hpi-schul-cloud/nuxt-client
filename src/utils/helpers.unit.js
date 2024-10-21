import { delay } from "./helpers";

describe("helpers", () => {
	describe("delay", () => {
		test("should not resolve until timeout has passed", async () => {
			jest.useFakeTimers();
			const spy = vi.fn();
			delay(100).then(spy);

			// not resolved after half time
			jest.advanceTimersByTime(50);
			await Promise.resolve();
			expect(spy).not.toHaveBeenCalled();

			// resolved after full time
			jest.advanceTimersByTime(50);
			await Promise.resolve();
			expect(spy).toHaveBeenCalled();
		});

		it("should return a promise", () => {
			expect(delay(1)).toBeInstanceOf(Promise);
		});
	});
});
