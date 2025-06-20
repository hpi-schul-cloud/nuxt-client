import { ref } from "vue";
import { useViewportOffsetTop } from "./ViewportOffsetCalculation.composable";

describe("ViewportOffsetCalculation.composable", () => {
	beforeEach(() => {
		vi.spyOn(window, "getComputedStyle").mockImplementation((element) => {
			if (element === document.documentElement) {
				return {
					getPropertyValue: (property: string) => {
						if (property === "--topbar-height") {
							return "50";
						} else {
							return "0";
						}
					},
				} as CSSStyleDeclaration;
			}

			if (element.classList.contains("board-column-header")) {
				return {
					getPropertyValue: (property: string) => {
						switch (property) {
							case "margin-top":
								return "10";
							case "margin-bottom":
								return "15";
							default:
								return "0";
						}
					},
				} as CSSStyleDeclaration;
			}

			return {} as CSSStyleDeclaration;
		});

		const mockWirefameHeader = document.createElement("div");
		mockWirefameHeader.classList.add("wireframe-header");
		Object.defineProperty(mockWirefameHeader, "offsetHeight", { value: 70 });
		document.body.appendChild(mockWirefameHeader);

		const mockColumnHeader = document.createElement("div");
		mockColumnHeader.classList.add("board-column-header");
		Object.defineProperty(mockColumnHeader, "offsetHeight", { value: 60 });
		document.body.appendChild(mockColumnHeader);
	});

	afterEach(() => {
		vi.clearAllMocks();
		document.body.innerHTML = "";
	});

	it("should calculate the correct viewport offset when board-column-header class exists", async () => {
		const result = useViewportOffsetTop(0, ref(false));

		// Expected calculation:
		// topbarAndWireframeHeight = 50 (topbar) + 70 (wireframe header) = 120
		// offsetTop = topbarAndWireframeHeight + 60 (column header height) + 10 (margin-top) + 15 (margin-bottom) = 205
		expect(result.offsetTop.value).toBe(205);
	});

	it("should calculate the correct viewport offset when board-column-header class does not exist", async () => {
		const element = document.getElementsByClassName("board-column-header")[0];
		if (element) {
			element.remove();
		}

		const result = useViewportOffsetTop(0, ref(false));

		// Expected calculation:
		// topbarAndWireframeHeight = 50 (topbar) + 70 (wireframe) = 120
		expect(result.offsetTop.value).toBe(120);
	});

	it("should calculate the correct viewport offset when isListLayout is true", async () => {
		const result = useViewportOffsetTop(0, ref(true));

		// Expected calculation:
		// topbarAndWireframeHeight = 50 (topbar) + 70 (wireframe header) = 120
		expect(result.offsetTop.value).toBe(120);
	});

	it("should calculate the correct viewport offset when wireframe class does not exist", async () => {
		const element = document.getElementsByClassName("wireframe-header")[0];
		if (element) {
			element.remove();
		}

		const result = useViewportOffsetTop(0, ref(false));

		// Expected calculation:
		// topbarAndWireframeHeight = 50 (topbar) + 60 (column header height) + 10 (margin-top) + 15 (margin-bottom) = 135
		expect(result.offsetTop.value).toBe(135);
	});
});
