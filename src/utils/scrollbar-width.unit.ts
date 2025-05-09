import { setComputedScrollbarWidthAsCssVar } from "./scrollbarWidth";

describe("setScrollbarWidthAsCssVar", () => {
	it("should set the scrollbar width as a CSS variable", () => {
		setComputedScrollbarWidthAsCssVar();

		expect(
			document.documentElement.style.getPropertyValue(
				"--computed-scrollbar-width"
			)
		).toMatch(/^\d+px$/);
	});
});
