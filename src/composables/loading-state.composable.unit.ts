import { useLoadingState } from "./loading-state.composable";

describe("useLoadingState", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should initialise isLoading as false", () => {
		const { isLoading } = useLoadingState();

		expect(isLoading.value).toBe(false);
	});

	it("should return the result of the wrapped function", async () => {
		const { withLoadingState } = useLoadingState({ delay: 0, minDisplayTime: 0 });
		const fn = vi.fn().mockResolvedValue("result");

		const promise = withLoadingState(fn);
		await vi.runAllTimersAsync();

		await expect(promise).resolves.toBe("result");
	});

	it("should set isLoading to true after the delay fires", async () => {
		const { isLoading, withLoadingState } = useLoadingState({ delay: 200, minDisplayTime: 0 });
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));

		const promise = withLoadingState(fn);

		await vi.advanceTimersByTimeAsync(199);
		expect(isLoading.value).toBe(false);

		await vi.advanceTimersByTimeAsync(1);
		expect(isLoading.value).toBe(true);

		await vi.runAllTimersAsync();
		await promise;
	});

	it("should set isLoading back to false once the function finishes", async () => {
		const { isLoading, withLoadingState } = useLoadingState({ delay: 0, minDisplayTime: 0 });
		const fn = vi.fn().mockResolvedValue("ok");

		const promise = withLoadingState(fn);
		await vi.runAllTimersAsync();
		await promise;

		expect(isLoading.value).toBe(false);
	});

	it("should not set isLoading if the function completes before the delay", async () => {
		const { isLoading, withLoadingState } = useLoadingState({ delay: 200, minDisplayTime: 0 });
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("fast"), 100)));

		const promise = withLoadingState(fn);
		await vi.runAllTimersAsync();
		await promise;

		expect(isLoading.value).toBe(false);
	});

	it("should propagate errors from the wrapped function", async () => {
		const { withLoadingState } = useLoadingState({ delay: 0, minDisplayTime: 0 });
		const fn = vi.fn().mockRejectedValue(new Error("boom"));

		const assertion = expect(withLoadingState(fn)).rejects.toThrow("boom");
		await vi.runAllTimersAsync();
		await assertion;
	});

	it("should reset isLoading to false when the function throws after the delay", async () => {
		const { isLoading, withLoadingState } = useLoadingState({ delay: 0, minDisplayTime: 0 });
		const fn = vi.fn().mockRejectedValue(new Error("boom"));

		const assertion = expect(withLoadingState(fn)).rejects.toThrow("boom");
		await vi.runAllTimersAsync();
		await assertion;

		expect(isLoading.value).toBe(false);
	});

	it("should allow per-call overrides to take precedence over composable-level params", async () => {
		const { isLoading, withLoadingState } = useLoadingState({ delay: 500, minDisplayTime: 0 });
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));

		const promise = withLoadingState(fn, { delay: 100 });

		await vi.advanceTimersByTimeAsync(99);
		expect(isLoading.value).toBe(false);

		await vi.advanceTimersByTimeAsync(1);
		expect(isLoading.value).toBe(true);

		await vi.runAllTimersAsync();
		await promise;
	});
});
