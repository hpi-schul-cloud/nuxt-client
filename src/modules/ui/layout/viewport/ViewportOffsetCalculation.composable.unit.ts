import { useViewportOffsetTop } from "./ViewportOffsetCalculation.composable";

describe("ViewportOffsetCalculation.composable", () => {
	beforeEach(() => {
		jest.spyOn(window, "getComputedStyle").mockImplementation((element) => {
			if (element === document.documentElement) {
				return {
					getPropertyValue: (property: string) => {
						switch (property) {
							case "--topbar-height":
								return "50";
							case "--breadcrumbs-height":
								return "30";
							case "--board-header-height":
								return "40";
							default:
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

		const mockColumnHeader = document.createElement("div");
		mockColumnHeader.classList.add("board-column-header");
		Object.defineProperty(mockColumnHeader, "offsetHeight", { value: 60 });
		document.body.appendChild(mockColumnHeader);
	});

	afterEach(() => {
		jest.clearAllMocks();
		document.body.innerHTML = "";
	});

	it("should calculate the correct viewport offset when board-column-header class exists", async () => {
		const result = useViewportOffsetTop();

		// Expected calculation:
		// staticOffsetTop = 50 (topbar) + 30 (breadcrumbs) + 40 (board header) = 120
		// offsetTop = staticOffsetTop + 60 (header height) + 10 (margin-top) + 15 (margin-bottom) = 205
		expect(result.offsetTop.value).toBe(205);
	});

	it("should calculate the correct viewport offset when board-column-header class does not exist", async () => {
		const element = document.getElementsByClassName("board-column-header")[0];
		if (element) {
			element.remove();
		}

		const result = useViewportOffsetTop();

		// Expected calculation:
		// staticOffsetTop = 50 (topbar) + 30 (breadcrumbs) + 40 (board header) = 120
		expect(result.offsetTop.value).toBe(120);
	});
});
