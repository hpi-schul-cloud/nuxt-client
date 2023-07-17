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
			let signal = abortController.signal;
			signal = {
				...signal,
				throwIfAborted: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			};

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
			let signal = abortController.signal;
			signal = {
				...signal,
				throwIfAborted: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
			};

			expect(delayWithAbort(1, { signal: signal })).toBeInstanceOf(Promise);
		});

		test("should throw an error when aborted", async () => {
			let abortController = new AbortController();
			abortController = { ...abortController, abort: () => signal.abort() };

			let signal = abortController.signal;
			let _listener = undefined;
			const addEventListenerMock = jest
				.fn()
				.mockImplementation((type, listener) => {
					_listener = listener;
				});
			const removeEventListenerMock = jest
				.fn()
				.mockImplementation((type, listener) => {
					_listener = undefined;
				});
			const abortMock = () => {
				_listener();
			};
			signal = {
				...signal,
				throwIfAborted: jest.fn(),
				addEventListener: addEventListenerMock,
				removeEventListener: removeEventListenerMock,
				abort: abortMock,
			};

			jest.useFakeTimers();
			const thenSpy = jest.fn();
			const catchSpy = jest.fn();
			delayWithAbort(100, { signal: signal }).then(thenSpy).catch(catchSpy);

			// not resolved after half time
			jest.advanceTimersByTime(50);
			await Promise.resolve();
			await jest.runAllTicks();
			expect(thenSpy).not.toHaveBeenCalled();
			expect(catchSpy).not.toHaveBeenCalled();

			// abort the delay function
			abortController.abort();
			await Promise.resolve();
			await jest.runAllTicks();

			expect(thenSpy).not.toHaveBeenCalled();
			expect(catchSpy).toHaveBeenCalled();
		});
	});
});
