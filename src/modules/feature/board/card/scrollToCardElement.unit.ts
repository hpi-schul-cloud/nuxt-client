import { scrollToCardElement } from "./scrollToCardElement";

describe("scrollToCardElement", () => {
	const setup = () => {
		const container = document.createElement("div");
		container.scrollTo = vi.fn();
		container.scrollTop = 100;
		vi.spyOn(container, "getBoundingClientRect").mockReturnValue({ top: 50 } as DOMRect);

		const target = document.createElement("div");
		target.dataset.elementId = "element-1";
		vi.spyOn(target, "getBoundingClientRect").mockReturnValue({ top: 400 } as DOMRect);
		container.appendChild(target);
		document.body.appendChild(container);

		return { container, target };
	};

	afterEach(() => {
		document.body.innerHTML = "";
		vi.restoreAllMocks();
	});

	it("should scroll the target below a gap and report success", () => {
		const { container } = setup();

		const result = scrollToCardElement(container, "element-1", false);

		expect(result).toBe(true);
		expect(container.scrollTo).toHaveBeenCalledWith({ top: 100 + 350 - 32, behavior: "smooth" });
	});

	it("should scroll to the very top for the first element", () => {
		const { container } = setup();

		scrollToCardElement(container, "element-1", true);

		expect(container.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
	});

	it("should never scroll above the top", () => {
		const { container, target } = setup();
		vi.spyOn(target, "getBoundingClientRect").mockReturnValue({ top: -500 } as DOMRect);

		scrollToCardElement(container, "element-1", false);

		expect(container.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
	});

	it("should respect reduced motion", () => {
		vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
		const { container } = setup();

		scrollToCardElement(container, "element-1", false);

		expect(container.scrollTo).toHaveBeenCalledWith(expect.objectContaining({ behavior: "auto" }));
	});

	it("should report failure and not scroll when the element is not rendered", () => {
		const { container } = setup();

		const result = scrollToCardElement(container, "unknown", false);

		expect(result).toBe(false);
		expect(container.scrollTo).not.toHaveBeenCalled();
	});

	describe("focus", () => {
		it("should focus the first focusable descendant", () => {
			const { container, target } = setup();
			const button = document.createElement("button");
			target.appendChild(button);

			scrollToCardElement(container, "element-1", false);

			expect(document.activeElement).toBe(button);
		});

		it("should focus the element wrapper when nothing inside is focusable", () => {
			const { container, target } = setup();

			scrollToCardElement(container, "element-1", false);

			expect(document.activeElement).toBe(target);
			expect(target.tabIndex).toBe(-1);
		});
	});
});
