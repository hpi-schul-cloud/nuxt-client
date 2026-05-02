import { useLoadingStore } from "./loading.store";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

describe("useLoadingStore", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
	});

	it("should have initial state", () => {
		const store = useLoadingStore();

		expect(store.isLoading).toBe(false);
		expect(store.loadingText).toBe("");
	});

	describe("setLoadingState", () => {
		it("should set loading state to true with text", () => {
			const store = useLoadingStore();
			const text = "Loading...";
			store.setLoadingState(true, text);

			expect(store.isLoading).toBe(true);
			expect(store.loadingText).toBe(text);
		});

		it("should set loading state to false", () => {
			const store = useLoadingStore();
			store.setLoadingState(true, "");
			store.setLoadingState(false);

			expect(store.isLoading).toBe(false);
		});
	});

	describe("withLoadingState", () => {
		beforeEach(() => {
			vi.useFakeTimers();
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("should execute function and return result", async () => {
			const store = useLoadingStore();
			const mockFn = vi.fn().mockResolvedValue("test-result");

			const resultPromise = store.withLoadingState(mockFn, "Loading...", 0, 0);

			await vi.runAllTimersAsync();
			const result = await resultPromise;

			expect(mockFn).toHaveBeenCalledTimes(1);
			expect(result).toBe("test-result");
		});

		it("should set loading state to true during execution", async () => {
			const store = useLoadingStore();
			let fnResolve!: (value: string) => void;
			const mockFn = vi.fn().mockImplementation(
				() =>
					new Promise<string>((resolve) => {
						fnResolve = resolve;
					})
			);

			const resultPromise = store.withLoadingState(mockFn, "Loading...", 0, 0);

			// Advance by 0ms to fire the delay=0 timer (onStart)
			await vi.advanceTimersByTimeAsync(0);
			expect(store.isLoading).toBe(true);
			expect(store.loadingText).toBe("Loading...");

			fnResolve("result");
			await resultPromise;
		});

		it("should set loading state to false after completion", async () => {
			const store = useLoadingStore();
			const mockFn = vi.fn().mockResolvedValue("result");

			const resultPromise = store.withLoadingState(mockFn, "Loading...", 0, 0);

			await vi.runAllTimersAsync();
			await resultPromise;

			expect(store.isLoading).toBe(false);
		});

		it("should respect minimum display time", async () => {
			const store = useLoadingStore();
			// fn resolves after 100ms so the delay=0 timer fires first
			const mockFn = vi
				.fn()
				.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("result"), 100)));

			const resultPromise = store.withLoadingState(mockFn, "Loading...", 500, 0);

			// Start loading immediately due to delay=0
			await vi.advanceTimersByTimeAsync(0);
			expect(store.isLoading).toBe(true);

			// fn resolves at 100ms (elapsed=100ms), remaining=400ms → onEnd fires at 500ms
			await vi.advanceTimersByTimeAsync(499);
			expect(store.isLoading).toBe(true);

			await vi.advanceTimersByTimeAsync(1);
			await resultPromise;

			expect(store.isLoading).toBe(false);
		});

		it("should respect delay before showing loading", async () => {
			const store = useLoadingStore();
			// fn resolves after 1000ms so the 200ms delay timer fires first
			const mockFn = vi
				.fn()
				.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("result"), 1000)));

			const resultPromise = store.withLoadingState(mockFn, "Loading...", 500, 200);

			// Before delay, loading should be false
			await vi.advanceTimersByTimeAsync(199);
			expect(store.isLoading).toBe(false);

			// After delay, loading should be true
			await vi.advanceTimersByTimeAsync(1);
			expect(store.isLoading).toBe(true);

			await vi.runAllTimersAsync();
			await resultPromise;
			expect(store.isLoading).toBe(false);
		});

		it("should not show loading if execution is faster than delay", async () => {
			const store = useLoadingStore();
			const mockFn = vi.fn().mockResolvedValue("result");

			const resultPromise = store.withLoadingState(mockFn, "Loading...", 500, 200);

			// Function completes before delay
			await vi.advanceTimersByTimeAsync(100);

			await resultPromise;
			await vi.runAllTimersAsync();

			expect(store.isLoading).toBe(false);
		});

		it("should use default values for minDisplayTime and delay", async () => {
			const store = useLoadingStore();
			// fn resolves at 210ms: onStart fires at 200ms, elapsed=10ms, remaining=490ms → onEnd at 700ms
			const mockFn = vi
				.fn()
				.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("result"), 210)));

			const resultPromise = store.withLoadingState(mockFn, "Loading...");

			// Default delay is 200ms
			await vi.advanceTimersByTimeAsync(199);
			expect(store.isLoading).toBe(false);
			await vi.advanceTimersByTimeAsync(1);
			expect(store.isLoading).toBe(true);

			// Default minDisplayTime is 500ms (onEnd fires at t=700ms)
			await vi.advanceTimersByTimeAsync(499);
			expect(store.isLoading).toBe(true);
			await vi.advanceTimersByTimeAsync(1);

			await resultPromise;
			expect(store.isLoading).toBe(false);
		});
	});

	it("should handle function errors and still clear loading state", async () => {
		const store = useLoadingStore();
		const error = new Error("Test error");
		const mockFn = vi.fn().mockRejectedValue(error);

		const resultPromise = store.withLoadingState(mockFn, "Loading...");

		await vi.runAllTimersAsync();

		await expect(resultPromise).rejects.toThrow("Test error");
		expect(store.isLoading).toBe(false);
	});

	it("should set correct loading message", async () => {
		vi.useFakeTimers();
		const store = useLoadingStore();
		// fn must outlive the default 200ms delay so onStart fires
		const mockFn = vi
			.fn()
			.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("result"), 1000)));

		const resultPromise = store.withLoadingState(mockFn, "Custom loading message");

		await vi.advanceTimersByTimeAsync(200); // default delay fires onStart
		expect(store.loadingText).toBe("Custom loading message");

		await vi.runAllTimersAsync();
		await resultPromise;
		vi.useRealTimers();
	});

	it("should handle concurrent loading operations", async () => {
		vi.useFakeTimers();
		const store = useLoadingStore();
		// fns must outlive the default 200ms delay so onStart fires
		const mockFn1 = vi
			.fn()
			.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("result1"), 1000)));
		const mockFn2 = vi
			.fn()
			.mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("result2"), 1000)));

		const promise1 = store.withLoadingState(mockFn1, "Loading 1");
		const promise2 = store.withLoadingState(mockFn2, "Loading 2");

		await vi.advanceTimersByTimeAsync(200); // default delay fires onStart for both
		expect(store.isLoading).toBe(true);

		await vi.runAllTimersAsync();

		const [result1, result2] = await Promise.all([promise1, promise2]);

		expect(result1).toBe("result1");
		expect(result2).toBe("result2");
		expect(store.isLoading).toBe(false);
		vi.useRealTimers();
	});
});
