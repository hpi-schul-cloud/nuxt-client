import { setScrollbarWidthAsCssVar } from "./scrollbarWidth";

describe("setScrollbarWidthAsCssVar", () => {
	it("should set the scrollbar width as a CSS variable", () => {
		setScrollbarWidthAsCssVar();

		expect(
			document.documentElement.style.getPropertyValue("--scrollbar-width")
		).toMatch(/^\d+px$/);
	});
});
