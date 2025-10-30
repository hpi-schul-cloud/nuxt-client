import { getGridContainerColumnsCount } from "./element.utils";
import { describe, expect, it, vi } from "vitest";

describe("getGridContainerColumnsCount", () => {
	it("should return 1 when gridElement is undefined", () => {
		expect(getGridContainerColumnsCount(undefined)).toBe(1);
	});

	it("should return the correct number of columns", () => {
		const mockElement = document.createElement("div");

		vi.spyOn(window, "getComputedStyle").mockReturnValue({
			gridTemplateColumns: "100px 200px 150px",
		} as CSSStyleDeclaration);

		expect(getGridContainerColumnsCount(mockElement)).toBe(3);
	});

	it("should handle single column", () => {
		const mockElement = document.createElement("div");

		vi.spyOn(window, "getComputedStyle").mockReturnValue({
			gridTemplateColumns: "1fr",
		} as CSSStyleDeclaration);

		expect(getGridContainerColumnsCount(mockElement)).toBe(1);
	});
});
