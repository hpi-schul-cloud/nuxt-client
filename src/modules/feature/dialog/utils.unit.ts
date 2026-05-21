import { withLoadingState } from "./utils";
import * as featureDialog from "@feature-dialog";
import { flushPromises } from "@vue/test-utils";

vi.mock("@feature-dialog", () => ({
	openCancellableDialog: vi.fn(),
}));

const openCancellableDialogSpy = vi.mocked(featureDialog.openCancellableDialog);

describe("withLoadingState", () => {
	let cancelMock: ReturnType<typeof vi.fn>;

	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
		cancelMock = vi.fn();
		openCancellableDialogSpy.mockReturnValue({
			result: Promise.resolve({ completed: false, data: undefined }),
			cancel: cancelMock,
		});
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns the result of the wrapped function", async () => {
		const fn = vi.fn().mockResolvedValue("value");

		const resultPromise = withLoadingState(fn, "Loading...");
		await vi.runAllTimersAsync();
		const result = await resultPromise;

		expect(result).toBe("value");
	});

	it("opens a loadingState dialog with the given message after the delay fires", async () => {
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));

		const promise = withLoadingState(fn, "Please wait");

		// Before the default 200ms delay — dialog should not be opened yet
		await vi.advanceTimersByTimeAsync(199);
		expect(openCancellableDialogSpy).not.toHaveBeenCalled();

		// After the delay — dialog should now be open
		await vi.advanceTimersByTimeAsync(1);
		expect(openCancellableDialogSpy).toHaveBeenCalledWith("loadingState", {
			loadingText: "Please wait",
		});

		await vi.runAllTimersAsync();
		await promise;
	});

	it("does not open a dialog if the function completes before the delay", async () => {
		const fn = vi.fn().mockResolvedValue("fast");

		const promise = withLoadingState(fn, "Loading...");
		// Flush microtasks so the `await fn()` continuation runs and clears the timer
		// before fake time is advanced past the 200ms delay
		await flushPromises();

		expect(openCancellableDialogSpy).not.toHaveBeenCalled();
		await promise;
	});

	it("cancels the dialog when the function completes", async () => {
		const fn = vi.fn().mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("ok"), 1000)));

		const promise = withLoadingState(fn, "Loading...");

		await vi.advanceTimersByTimeAsync(200); // delay fires → dialog opens
		await vi.runAllTimersAsync();
		await promise;
		await flushPromises();

		expect(cancelMock).toHaveBeenCalled();
	});
});
