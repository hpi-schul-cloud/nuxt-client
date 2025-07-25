import { delay } from "./helpers";

describe("helpers", () => {
	describe("delay", () => {
		test("should not resolve until timeout has passed", async () => {
			vi.useFakeTimers();
			const spy = vi.fn();
			delay(100).then(spy);

			// not resolved after half time
			vi.advanceTimersByTime(50);
			await Promise.resolve();
			expect(spy).not.toHaveBeenCalled();

			// resolved after full time
			vi.advanceTimersByTime(50);
			await Promise.resolve();
			expect(spy).toHaveBeenCalled();
		});

		it("should return a promise", () => {
			expect(delay(1)).toBeInstanceOf(Promise);
		});
	});
});
