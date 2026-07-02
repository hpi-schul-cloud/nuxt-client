import { useBoardScrollMode } from "./BoardScrollMode.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";

const htmlTag = document.documentElement;

describe("useBoardScrollMode", () => {
	beforeEach(() => {
		localStorage.clear();
		htmlTag.classList.remove("board-page-scroll");
		htmlTag.style.removeProperty("max-height");
		htmlTag.style.removeProperty("--v-layout-top");
	});

	describe("initial state", () => {
		it("should default to 'columns' scroll mode", () => {
			const { scrollMode } = useBoardScrollMode();

			expect(scrollMode.value).toBe("columns");
		});

		it("should have isPageScrollMode as false by default", () => {
			const { isPageScrollMode } = useBoardScrollMode();

			expect(isPageScrollMode.value).toBe(false);
		});
	});

	describe("toggleScrollMode", () => {
		it("should switch from 'columns' to 'page' mode", () => {
			const { scrollMode, toggleScrollMode } = useBoardScrollMode();

			toggleScrollMode();

			expect(scrollMode.value).toBe("page");
		});

		it("should set isPageScrollMode to true after toggling from columns", () => {
			const { isPageScrollMode, toggleScrollMode } = useBoardScrollMode();

			toggleScrollMode();

			expect(isPageScrollMode.value).toBe(true);
		});

		it("should switch back from 'page' to 'columns' mode", () => {
			const { scrollMode, toggleScrollMode } = useBoardScrollMode();

			toggleScrollMode();
			toggleScrollMode();

			expect(scrollMode.value).toBe("columns");
		});
	});

	describe("localStorage persistence", () => {
		it("should restore scroll mode from localStorage", () => {
			localStorage.setItem("board-column-scroll-mode", "page");

			const { isPageScrollMode } = useBoardScrollMode();

			expect(isPageScrollMode.value).toBe(true);
		});
	});

	describe("DOM side effects", () => {
		it("should set max-height on html element when initialised in columns mode", () => {
			useBoardScrollMode();

			expect(htmlTag.style.getPropertyValue("max-height")).toBe("100vh");
		});

		it("should add board-page-scroll class when initialised with stored page mode", () => {
			localStorage.setItem("board-column-scroll-mode", "page");

			useBoardScrollMode();

			expect(htmlTag.classList.contains("board-page-scroll")).toBe(true);
		});

		it("should add board-page-scroll class and set --v-layout-top when toggled to page mode", () => {
			const { toggleScrollMode } = useBoardScrollMode();

			toggleScrollMode();

			expect(htmlTag.classList.contains("board-page-scroll")).toBe(true);
			expect(htmlTag.style.getPropertyValue("--v-layout-top")).toBe("0px");
			expect(htmlTag.style.getPropertyValue("max-height")).toBe("");
		});

		it("should remove board-page-scroll class and restore max-height when toggled back to columns", () => {
			const { toggleScrollMode } = useBoardScrollMode();

			toggleScrollMode();
			toggleScrollMode();

			expect(htmlTag.classList.contains("board-page-scroll")).toBe(false);
			expect(htmlTag.style.getPropertyValue("max-height")).toBe("100vh");
			expect(htmlTag.style.getPropertyValue("--v-layout-top")).toBe("");
		});
	});

	describe("cleanup on unmount", () => {
		it("should remove board-page-scroll class and restore styles when component unmounts", () => {
			const { toggleScrollMode, wrapper } = mountComposable(() => useBoardScrollMode());

			toggleScrollMode();
			expect(htmlTag.classList.contains("board-page-scroll")).toBe(true);

			wrapper.unmount();

			expect(htmlTag.classList.contains("board-page-scroll")).toBe(false);
			expect(htmlTag.style.getPropertyValue("max-height")).toBe("100vh");
			expect(htmlTag.style.getPropertyValue("--v-layout-top")).toBe("");
		});
	});
});
