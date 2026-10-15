import { useActiveCardElement } from "./activeCardElement.composable";
import { mountComposable } from "@@/tests/test-utils/mountComposable";
import { nextTick, ref } from "vue";

describe("activeCardElement.composable", () => {
	let pendingFrames: (() => void)[] = [];
	const flushFrames = () => {
		const frames = pendingFrames;
		pendingFrames = [];
		frames.forEach((frame) => frame());
	};

	beforeEach(() => {
		pendingFrames = [];
		vi.stubGlobal("requestAnimationFrame", (callback: () => void) => pendingFrames.push(callback));
		vi.stubGlobal("cancelAnimationFrame", () => {
			pendingFrames = [];
		});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	const setup = (options: {
		tops: number[];
		scrollTop?: number;
		atBottom?: boolean;
		enabled?: boolean;
		elementIds?: string[];
	}) => {
		const container = document.createElement("div");
		vi.spyOn(container, "getBoundingClientRect").mockReturnValue({ top: 100 } as DOMRect);
		Object.defineProperty(container, "clientHeight", { value: 500 });
		Object.defineProperty(container, "scrollHeight", { value: 2000 });
		const scrollTop = options.atBottom ? 1500 : (options.scrollTop ?? 0);
		Object.defineProperty(container, "scrollTop", { value: scrollTop, writable: true });

		options.tops.forEach((top, index) => {
			const element = document.createElement("div");
			element.dataset.elementId = `element-${index}`;
			vi.spyOn(element, "getBoundingClientRect").mockReturnValue({ top } as DOMRect);
			container.appendChild(element);
		});

		const scroller = ref<HTMLElement | null>(container);
		const isEnabled = ref(options.enabled ?? true);
		const elementIds = options.elementIds ? ref(options.elementIds) : undefined;
		const composable = mountComposable(() => useActiveCardElement(scroller, isEnabled, elementIds));

		return { ...composable, container, scroller, isEnabled };
	};

	it("should mark the first element as active before scrolling", async () => {
		const { activeElementId } = setup({ tops: [150, 700, 1200] });
		await nextTick();
		flushFrames();

		expect(activeElementId.value).toBe("element-0");
	});

	it("should mark the first element as active at the top even when later ones pass the reading line", async () => {
		const { activeElementId } = setup({ tops: [150, 180, 220] });
		await nextTick();
		flushFrames();

		expect(activeElementId.value).toBe("element-0");
	});

	it("should only consider the given elements", async () => {
		const { activeElementId } = setup({ tops: [150, 180], elementIds: ["element-1"] });
		await nextTick();
		flushFrames();

		expect(activeElementId.value).toBe("element-1");
	});

	it("should mark the last element above the reading line as active when scrolling", async () => {
		const { activeElementId, container } = setup({ tops: [-400, 200, 700], scrollTop: 300 });
		await nextTick();

		container.dispatchEvent(new Event("scroll"));
		flushFrames();

		expect(activeElementId.value).toBe("element-1");
	});

	it("should move the reading line down near the end so trailing elements become active in turn", async () => {
		// Container: top 100, height 500, scroll range 1500. 175px before the end the line sits at 65% (y 425).
		const { activeElementId, container } = setup({ tops: [-400, 300, 400, 500], scrollTop: 1325 });
		await nextTick();

		container.dispatchEvent(new Event("scroll"));
		flushFrames();

		expect(activeElementId.value).toBe("element-2");
	});

	it("should mark the last element as active at the bottom of the card", async () => {
		const { activeElementId, container } = setup({ tops: [-900, -300, 450], atBottom: true });
		await nextTick();

		container.dispatchEvent(new Event("scroll"));
		flushFrames();

		expect(activeElementId.value).toBe("element-2");
	});

	it("should have no active element when the card has no elements", async () => {
		const { activeElementId } = setup({ tops: [] });
		await nextTick();
		flushFrames();

		expect(activeElementId.value).toBeUndefined();
	});

	describe("when it is disabled", () => {
		it("should have no active element and ignore scrolling", async () => {
			const { activeElementId, container } = setup({ tops: [-400, 200], enabled: false });
			await nextTick();

			container.dispatchEvent(new Event("scroll"));
			flushFrames();

			expect(activeElementId.value).toBeUndefined();
		});
	});

	describe("when it gets enabled", () => {
		it("should determine the active element", async () => {
			const { activeElementId, isEnabled } = setup({ tops: [150, 700], enabled: false });

			isEnabled.value = true;
			await nextTick();
			flushFrames();

			expect(activeElementId.value).toBe("element-0");
		});
	});

	describe("when it gets disabled", () => {
		it("should stop listening to scroll events and reset", async () => {
			const { activeElementId, container, isEnabled } = setup({ tops: [-400, 200] });
			await nextTick();

			isEnabled.value = false;
			await nextTick();
			container.dispatchEvent(new Event("scroll"));
			flushFrames();

			expect(activeElementId.value).toBeUndefined();
		});
	});

	describe("when an element is selected", () => {
		// Tops place element-2 above the reading line too, as happens after scrolling to a short element.
		const tops = [-400, 120, 200];
		const scrollTop = 300;

		beforeEach(() => {
			vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
			vi.stubGlobal("requestAnimationFrame", (callback: () => void) => pendingFrames.push(callback));
		});

		afterEach(() => {
			vi.useRealTimers();
		});

		it("should mark the selected element as active immediately", async () => {
			const { activeElementId, select } = setup({ tops, scrollTop });
			await nextTick();

			select("element-1");

			expect(activeElementId.value).toBe("element-1");
		});

		it("should keep the selected element active while its scroll is running", async () => {
			const { activeElementId, container, select } = setup({ tops, scrollTop });
			await nextTick();

			select("element-1");
			container.dispatchEvent(new Event("scroll"));
			vi.advanceTimersByTime(100);
			container.dispatchEvent(new Event("scroll"));
			flushFrames();

			expect(activeElementId.value).toBe("element-1");
		});

		it("should keep the selected element active when refreshed", async () => {
			const { activeElementId, refresh, select } = setup({ tops, scrollTop });
			await nextTick();

			select("element-1");
			refresh();
			flushFrames();

			expect(activeElementId.value).toBe("element-1");
		});

		it("should follow the reading line again once the user scrolls after the scroll settled", async () => {
			const { activeElementId, container, select } = setup({ tops, scrollTop });
			await nextTick();

			select("element-1");
			container.dispatchEvent(new Event("scroll"));
			vi.advanceTimersByTime(200);
			container.dispatchEvent(new Event("scroll"));
			flushFrames();

			expect(activeElementId.value).toBe("element-2");
		});

		it("should follow the reading line again when the selected element is gone", async () => {
			const { activeElementId, container, refresh, select } = setup({ tops, scrollTop });
			await nextTick();

			select("element-1");
			container.querySelector("[data-element-id='element-1']")?.remove();
			refresh();
			flushFrames();

			expect(activeElementId.value).toBe("element-2");
		});
	});

	describe("when refreshed", () => {
		it("should pick up elements that were rendered later", async () => {
			const { activeElementId, container, refresh } = setup({ tops: [] });
			await nextTick();
			flushFrames();
			const element = document.createElement("div");
			element.dataset.elementId = "late-element";
			vi.spyOn(element, "getBoundingClientRect").mockReturnValue({ top: 120 } as DOMRect);
			container.appendChild(element);

			refresh();
			flushFrames();

			expect(activeElementId.value).toBe("late-element");
		});
	});
});
