import { withLoadingDelay } from "./loading-utils";

describe("withLoadingDelay", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should return the result of the wrapped function", async () => {
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("value"), 300)));
		const resultPromise = withLoadingDelay(fn, { onStart: vi.fn(), onEnd: vi.fn(), delay: 0, minDisplayTime: 0 });
		await vi.runAllTimersAsync();
		const result = await resultPromise;

		expect(result).toBe("value");
	});

	it("should call onStart after the delay", async () => {
		const onStart = vi.fn();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));
		withLoadingDelay(fn, { onStart, onEnd: vi.fn(), delay: 200 });

		await vi.advanceTimersByTimeAsync(199);
		expect(onStart).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(1);
		expect(onStart).toHaveBeenCalledTimes(1);
	});

	it("should not call onStart if the function completes before the delay", async () => {
		const onStart = vi.fn();
		const onEnd = vi.fn();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("fast"), 100)));
		const resultPromise = withLoadingDelay(fn, { onStart, onEnd, delay: 200 });

		await vi.runAllTimersAsync();
		await resultPromise;

		expect(onStart).not.toHaveBeenCalled();
		expect(onEnd).not.toHaveBeenCalled();
	});

	it("should call onEnd after minDisplayTime when function completes quickly", async () => {
		const onStart = vi.fn();
		const onEnd = vi.fn();
		// fn resolves at 300ms; delay=0 fires onStart at 0ms; elapsed=300ms, remaining=200ms → onEnd at 500ms
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 300)));
		const resultPromise = withLoadingDelay(fn, { onStart, onEnd, delay: 0, minDisplayTime: 500 });

		await vi.advanceTimersByTimeAsync(0); // onStart fires
		expect(onStart).toHaveBeenCalledTimes(1);

		await vi.advanceTimersByTimeAsync(499);
		expect(onEnd).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(1);
		await resultPromise;
		expect(onEnd).toHaveBeenCalledTimes(1);
	});

	it("should call onEnd immediately once minDisplayTime has already elapsed", async () => {
		const onEnd = vi.fn();
		// fn takes 700ms; delay=0; minDisplayTime=500ms → elapsed=700ms > 500ms, onEnd fires right away
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 700)));
		const resultPromise = withLoadingDelay(fn, { onStart: vi.fn(), onEnd, delay: 0, minDisplayTime: 500 });
		await vi.runAllTimersAsync();
		await resultPromise;

		expect(onEnd).toHaveBeenCalledTimes(1);
	});

	it("should use default delay of 200ms when not specified", async () => {
		const onStart = vi.fn();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));
		withLoadingDelay(fn, { onStart, onEnd: vi.fn() });

		await vi.advanceTimersByTimeAsync(199);
		expect(onStart).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(1);
		expect(onStart).toHaveBeenCalledTimes(1);
	});

	it("should use default minDisplayTime of 500ms when not specified", async () => {
		const onEnd = vi.fn();
		// fn resolves at 250ms; delay=0; elapsed=250ms, remaining=250ms → onEnd at 500ms
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 250)));
		const resultPromise = withLoadingDelay(fn, { onStart: vi.fn(), onEnd, delay: 0 });

		await vi.advanceTimersByTimeAsync(499);
		expect(onEnd).not.toHaveBeenCalled();

		await vi.advanceTimersByTimeAsync(1);
		await resultPromise;
		expect(onEnd).toHaveBeenCalledTimes(1);
	});

	it("should propagate errors from the wrapped function", async () => {
		const onEnd = vi.fn();
		const onStart = vi.fn();
		const error = new Error("boom");
		const fn = vi.fn().mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(error), 100)));
		const resultPromise = withLoadingDelay(fn, { onStart, onEnd, delay: 0, minDisplayTime: 0 });
		const assertion = expect(resultPromise).rejects.toThrow("boom");
		await vi.runAllTimersAsync();
		await assertion;
	});

	it("should call onEnd if the function throws after onStart fires", async () => {
		const onStart = vi.fn();
		const onEnd = vi.fn();
		// fn rejects at 500ms; delay=0 fires onStart immediately → onEnd must still be called
		const fn = vi
			.fn()
			.mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(new Error("late fail")), 500)));
		const resultPromise = withLoadingDelay(fn, { onStart, onEnd, delay: 0, minDisplayTime: 0 });
		const assertion = expect(resultPromise).rejects.toThrow("late fail");
		await vi.runAllTimersAsync();
		await assertion;

		expect(onStart).toHaveBeenCalledTimes(1);
		expect(onEnd).toHaveBeenCalledTimes(1);
	});

	it("should not call onEnd if the function throws before onStart fires", async () => {
		const onStart = vi.fn();
		const onEnd = vi.fn();
		const fn = vi
			.fn()
			.mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(new Error("fast fail")), 100)));
		const resultPromise = withLoadingDelay(fn, { onStart, onEnd, delay: 200 });
		const assertion = expect(resultPromise).rejects.toThrow("fast fail");
		await vi.runAllTimersAsync();
		await assertion;

		expect(onStart).not.toHaveBeenCalled();
		expect(onEnd).not.toHaveBeenCalled();
	});
});
