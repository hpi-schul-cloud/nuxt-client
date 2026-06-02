import { useDebouncedLoading } from "./debounced-loading.composable";

describe("useDebouncedLoading", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should return the result of the wrapped function", async () => {
		const { withLoadingState } = useDebouncedLoading();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("value"), 300)));
		const resultPromise = withLoadingState(fn, { delay: 0, minDisplayTime: 0 });
		await vi.runAllTimersAsync();

		expect(await resultPromise).toBe("value");
	});

	it("should start with loadingState 'idle'", () => {
		const { loadingState } = useDebouncedLoading();

		expect(loadingState.value).toBe("idle");
	});

	it("should transition to 'loading' after the delay", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));
		withLoadingState(fn, { delay: 200 });

		await vi.advanceTimersByTimeAsync(199);
		expect(loadingState.value).toBe("idle");

		await vi.advanceTimersByTimeAsync(1);
		expect(loadingState.value).toBe("loading");
	});

	it("should transition to 'loaded' without showing the spinner for fast operations", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("fast"), 100)));
		const resultPromise = withLoadingState(fn, { delay: 200 });

		await vi.runAllTimersAsync();
		await resultPromise;

		expect(loadingState.value).toBe("loaded");
	});

	it("should transition to 'extLoading' while waiting for minDisplayTime", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		// fn resolves at 300ms; delay=0 → loading at 0ms; minDisplayTime=500ms → extLoading from 300ms to 500ms
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 300)));
		withLoadingState(fn, { delay: 0, minDisplayTime: 500 });

		await vi.advanceTimersByTimeAsync(0);
		expect(loadingState.value).toBe("loading");

		await vi.advanceTimersByTimeAsync(300);
		expect(loadingState.value).toBe("extLoading");
	});

	it("should transition to 'loaded' after minDisplayTime expires", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		// fn resolves at 300ms; delay=0; minDisplayTime=500ms → loaded at 500ms
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 300)));
		const resultPromise = withLoadingState(fn, { delay: 0, minDisplayTime: 500 });

		await vi.advanceTimersByTimeAsync(499);
		expect(loadingState.value).not.toBe("loaded");

		await vi.advanceTimersByTimeAsync(1);
		await resultPromise;
		expect(loadingState.value).toBe("loaded");
	});

	it("should transition to 'loaded' immediately when minDisplayTime has already elapsed", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		// fn takes 700ms; delay=0; minDisplayTime=500ms → elapsed > minDisplayTime, no extLoading phase
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 700)));
		const resultPromise = withLoadingState(fn, { delay: 0, minDisplayTime: 500 });

		await vi.advanceTimersByTimeAsync(700);
		await resultPromise;

		expect(loadingState.value).toBe("loaded");
	});

	it("should use default delay of 200ms when not specified", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));
		withLoadingState(fn);

		await vi.advanceTimersByTimeAsync(199);
		expect(loadingState.value).toBe("idle");

		await vi.advanceTimersByTimeAsync(1);
		expect(loadingState.value).toBe("loading");
	});

	it("should use default minDisplayTime of 500ms when not specified", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		// fn resolves at 250ms; delay=0; elapsed=250ms, remaining=250ms → loaded at 500ms
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 250)));
		const resultPromise = withLoadingState(fn, { delay: 0 });

		await vi.advanceTimersByTimeAsync(499);
		expect(loadingState.value).not.toBe("loaded");

		await vi.advanceTimersByTimeAsync(1);
		await resultPromise;
		expect(loadingState.value).toBe("loaded");
	});

	it("should reset loadingState to 'idle' at the start of a new call", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 300)));

		const first = withLoadingState(fn, { delay: 0, minDisplayTime: 0 });
		await vi.runAllTimersAsync();
		await first;
		expect(loadingState.value).toBe("loaded");

		withLoadingState(fn, { delay: 200, minDisplayTime: 0 });
		expect(loadingState.value).toBe("idle");
	});

	it("should propagate errors from the wrapped function", async () => {
		const { withLoadingState } = useDebouncedLoading();
		const error = new Error("boom");
		const fn = vi.fn().mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(error), 100)));
		const resultPromise = withLoadingState(fn, { delay: 0, minDisplayTime: 0 });
		const assertion = expect(resultPromise).rejects.toThrow("boom");
		await vi.runAllTimersAsync();
		await assertion;
	});

	it("should transition to 'loaded' if the function throws after the delay has passed", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		// fn rejects at 500ms; delay=0 → loading immediately; minDisplayTime=0 → loaded after reject
		const fn = vi
			.fn()
			.mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(new Error("late fail")), 500)));
		const resultPromise = withLoadingState(fn, { delay: 0, minDisplayTime: 0 });
		const assertion = expect(resultPromise).rejects.toThrow("late fail");
		await vi.runAllTimersAsync();
		await assertion;

		expect(loadingState.value).toBe("loaded");
	});

	it("should transition to 'loaded' without showing the spinner when the function throws before the delay", async () => {
		const { loadingState, withLoadingState } = useDebouncedLoading();
		const fn = vi
			.fn()
			.mockImplementation(() => new Promise((_, reject) => setTimeout(() => reject(new Error("fast fail")), 100)));
		const resultPromise = withLoadingState(fn, { delay: 200 });
		const assertion = expect(resultPromise).rejects.toThrow("fast fail");
		await vi.runAllTimersAsync();
		await assertion;

		expect(loadingState.value).toBe("loaded");
	});
});
