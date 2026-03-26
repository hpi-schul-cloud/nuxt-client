import { useElementFocus } from "./elementFocus.composable";
import { logger } from "@util-logger";
import { mock } from "vitest-mock-extended";

describe("elementFocus.composable", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
	});

	const setup = () => {
		Object.defineProperty(window, "location", {
			get: () => ({
				hash: "#card-12345",
			}),
		});

		const domElementMock = mock<HTMLElement>();
		const querySelectorSpy = vi.spyOn(document, "querySelector");
		querySelectorSpy.mockReturnValueOnce(domElementMock);
		const { focusNodeFromHash } = useElementFocus();

		return {
			domElementMock,
			focusNodeFromHash,
		};
	};
	describe("when there is a node to focus", () => {
		it("should scroll to and focus the element", () => {
			const { domElementMock, focusNodeFromHash } = setup();

			focusNodeFromHash();
			vi.runAllTimers();

			expect(domElementMock.scrollIntoView).toHaveBeenCalledWith({
				block: "center",
				inline: "center",
			});
			expect(domElementMock.focus).toHaveBeenCalled();
		});
	});

	describe("when hash is empty", () => {
		it("should do nothing if hash is empty", async () => {
			Object.defineProperty(window, "location", {
				get: () => ({ hash: "" }),
			});

			const { focusNodeFromHash } = setup();
			await expect(focusNodeFromHash()).resolves.toBeUndefined();
		});
	});

	describe("when element is not found after attempts", () => {
		it("should log error if element not found after attempts", async () => {
			Object.defineProperty(window, "location", {
				get: () => ({ hash: "#not-found" }),
			});

			const querySelectorSpy = vi.spyOn(document, "querySelector");
			querySelectorSpy.mockReturnValue(null);

			const loggerErrorSpy = vi.spyOn(logger, "error").mockImplementation(vi.fn());

			const { focusNodeFromHash } = useElementFocus();
			const promise = focusNodeFromHash();
			vi.advanceTimersByTime(20000);
			await promise;
			expect(loggerErrorSpy).toHaveBeenCalledWith("Element not found after multiple attempts.");
		});
	});
});
