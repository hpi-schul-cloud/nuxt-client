import { createMock } from "@golevelup/ts-vitest";
import { useElementFocus } from "./elementFocus.composable";

describe("elementFocus.composable", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.clearAllMocks();
	});
	describe("when there is a node to focus", () => {
		const setup = () => {
			Object.defineProperty(window, "location", {
				get: () =>
					createMock<Location>({
						hash: "#card-12345",
					}),
			});

			const domElementMock = createMock<HTMLElement>();
			const querySelectorSpy = vi.spyOn(document, "querySelector");
			querySelectorSpy.mockReturnValueOnce(domElementMock);

			return {
				domElementMock,
			};
		};

		it("should scroll to and focus the element", () => {
			const { domElementMock } = setup();

			useElementFocus().focusNodeFromHash();
			vi.runAllTimers();

			expect(domElementMock.scrollIntoView).toHaveBeenCalledWith({
				block: "center",
				inline: "center",
			});
			expect(domElementMock.focus).toHaveBeenCalled();
		});
	});
});
