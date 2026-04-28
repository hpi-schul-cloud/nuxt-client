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

			const resultPromise = store.withLoadingState(mockFn, "Loading...");

			await vi.runAllTimersAsync();
			const result = await resultPromise;

			expect(mockFn).toHaveBeenCalledTimes(1);
			expect(result).toBe("test-result");
		});

		it("should set loading state to true during execution", async () => {
			const store = useLoadingStore();
			const mockFn = vi.fn().mockImplementation(async () => {
				expect(store.isLoading).toBe(true);
				expect(store.loadingText).toBe("Loading...");
				return "result";
			});

			const resultPromise = store.withLoadingState(mockFn, "Loading...");

			await vi.runAllTimersAsync();
			await resultPromise;
		});

		it("should set loading state to false after completion", async () => {
			const store = useLoadingStore();
			const mockFn = vi.fn().mockResolvedValue("result");

			const resultPromise = store.withLoadingState(mockFn, "Loading...");

			await vi.runAllTimersAsync();
			await resultPromise;

			expect(store.isLoading).toBe(false);
		});

		it("should respect minimum display time", async () => {
			const store = useLoadingStore();
			const mockFn = vi.fn().mockResolvedValue("result");

			const resultPromise = store.withLoadingState(mockFn, "Loading...", 500);

			// Function completes immediately, but should wait for minimum time
			await vi.advanceTimersByTimeAsync(499);
			expect(store.isLoading).toBe(true);

			await vi.advanceTimersByTimeAsync(1);
			await resultPromise;

			expect(store.isLoading).toBe(false);
		});

		it("should use default minimum display time of 300ms", async () => {
			const store = useLoadingStore();
			const mockFn = vi.fn().mockResolvedValue("result");

			const resultPromise = store.withLoadingState(mockFn, "Loading...");

			await vi.advanceTimersByTimeAsync(299);
			expect(store.isLoading).toBe(true);

			await vi.advanceTimersByTimeAsync(1);
			await resultPromise;

			expect(store.isLoading).toBe(false);
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
			const store = useLoadingStore();
			const mockFn = vi.fn().mockResolvedValue("result");

			store.withLoadingState(mockFn, "Custom loading message");

			expect(store.loadingText).toBe("Custom loading message");

			await vi.runAllTimersAsync();
		});

		it("should handle concurrent loading operations", async () => {
			const store = useLoadingStore();
			const mockFn1 = vi.fn().mockResolvedValue("result1");
			const mockFn2 = vi.fn().mockResolvedValue("result2");

			const promise1 = store.withLoadingState(mockFn1, "Loading 1");
			const promise2 = store.withLoadingState(mockFn2, "Loading 2");

			expect(store.isLoading).toBe(true);

			await vi.runAllTimersAsync();

			const [result1, result2] = await Promise.all([promise1, promise2]);

			expect(result1).toBe("result1");
			expect(result2).toBe("result2");
			expect(store.isLoading).toBe(false);
		});
	});
});
