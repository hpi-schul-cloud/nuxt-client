import { createMock } from "@golevelup/ts-jest";
import { useElementFocus } from "./elementFocus.composable";

describe("elementFocus.composable", () => {
	describe("when there is a node to focus", () => {
		const setup = () => {
			Object.defineProperty(window, "location", {
				get: () =>
					createMock<Location>({
						hash: "#card-12345",
					}),
			});

			const domElementMock = createMock<HTMLElement>();
			const querySelectorSpy = jest.spyOn(document, "querySelector");
			querySelectorSpy.mockReturnValueOnce(domElementMock);

			return {
				domElementMock,
			};
		};

		it("should scroll to and focus the element", () => {
			const { domElementMock } = setup();

			useElementFocus().focusNodeFromHash();

			expect(domElementMock.scrollIntoView).toHaveBeenCalledWith({
				block: "center",
				inline: "center",
			});
			expect(domElementMock.focus).toHaveBeenCalled();
		});
	});
});
