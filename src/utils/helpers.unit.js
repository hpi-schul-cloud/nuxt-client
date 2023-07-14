import { delay, delayWithAbort } from "./helpers";

describe("helpers", () => {
	describe("delay", () => {
		test("should not resolve until timeout has passed", async () => {
			jest.useFakeTimers();
			const spy = jest.fn();
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
			jest.useFakeTimers();

			expect(delay(1)).toBeInstanceOf(Promise);
		});
	});

	describe("delayWithAbort", () => {
		test("should not resolve until timeout has passed", async () => {
			const abortController = new AbortController();
			const signal = abortController.signal;

			jest.useFakeTimers();
			const thenSpy = jest.fn();
			const catchSpy = jest.fn();
			delayWithAbort(100, { signal: signal }).then(thenSpy).catch(catchSpy);

			// not resolved after half time
			jest.advanceTimersByTime(50);
			await Promise.resolve();
			expect(thenSpy).not.toHaveBeenCalled();
			expect(catchSpy).not.toHaveBeenCalled();

			// resolved after full time
			jest.advanceTimersByTime(50);
			await Promise.resolve();
			expect(thenSpy).toHaveBeenCalled();
			expect(catchSpy).not.toHaveBeenCalled();
		});

		it("should return a promise", () => {
			const abortController = new AbortController();
			const signal = abortController.signal;

			expect(delayWithAbort(1, { signal: signal })).toBeInstanceOf(Promise);
		});

		test("should throw an error when aborted", async () => {
			const abortController = new AbortController();
			const signal = abortController.signal;

			jest.useFakeTimers();
			const thenSpy = jest.fn();
			const catchSpy = jest.fn();
			delayWithAbort(100, { signal: signal }).then(thenSpy).catch(catchSpy);

			// not resolved after half time
			jest.advanceTimersByTime(50);
			await Promise.resolve();
			expect(thenSpy).not.toHaveBeenCalled();
			expect(catchSpy).not.toHaveBeenCalled();

			// abort the delay function
			abortController.abort();
			await Promise.resolve();

			expect(thenSpy).not.toHaveBeenCalled();
			expect(catchSpy).toHaveBeenCalled();
		});
	});
});
