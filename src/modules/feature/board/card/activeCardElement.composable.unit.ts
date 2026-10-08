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

	const setup = (options: { tops: number[]; scrollTop?: number; atBottom?: boolean; enabled?: boolean }) => {
		const container = document.createElement("div");
		vi.spyOn(container, "getBoundingClientRect").mockReturnValue({ top: 100 } as DOMRect);
		Object.defineProperty(container, "clientHeight", { value: 500 });
		Object.defineProperty(container, "scrollHeight", { value: 2000 });
		container.scrollTop = options.scrollTop ?? 0;
		if (options.atBottom) Object.defineProperty(container, "scrollTop", { value: 1500, writable: true });

		options.tops.forEach((top, index) => {
			const element = document.createElement("div");
			element.dataset.elementId = `element-${index}`;
			vi.spyOn(element, "getBoundingClientRect").mockReturnValue({ top } as DOMRect);
			container.appendChild(element);
		});

		const scroller = ref<HTMLElement | null>(container);
		const isEnabled = ref(options.enabled ?? true);
		const composable = mountComposable(() => useActiveCardElement(scroller, isEnabled));

		return { ...composable, container, scroller, isEnabled };
	};

	it("should mark the first element as active before scrolling", async () => {
		const { activeElementId } = setup({ tops: [150, 700, 1200] });
		await nextTick();
		flushFrames();

		expect(activeElementId.value).toBe("element-0");
	});

	it("should mark the last element above the reading line as active when scrolling", async () => {
		const { activeElementId, container } = setup({ tops: [-400, 200, 700] });
		await nextTick();

		container.dispatchEvent(new Event("scroll"));
		flushFrames();

		expect(activeElementId.value).toBe("element-1");
	});

	it("should mark the last element as active at the bottom of the card", async () => {
		const { activeElementId, container } = setup({ tops: [-900, -300, 900], atBottom: true });
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
