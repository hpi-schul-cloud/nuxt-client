import { useDrag } from "@/composables/drag";

describe("drag composable", () => {
	it("should alter status on start dragging", () => {
		const { startDragging, dragInProgress } = useDrag();

		expect(dragInProgress.value).toBe(false);

		startDragging();

		expect(dragInProgress.value).toBe(true);
	});

	it("should alter status on stop dragging after delay", () => {
		jest.useFakeTimers();

		const { dragInProgressDelay, startDragging, endDragging, dragInProgress } =
			useDrag();

		startDragging();

		endDragging();

		jest.advanceTimersByTime(dragInProgressDelay);
		expect(dragInProgress.value).toBe(false);
	});
});
