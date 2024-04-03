import { useDragAndDrop } from "./DragAndDrop.composable";

describe("DragAndDropComposable", () => {
	describe("isDragging", () => {
		it("should be false as default", () => {
			const { isDragging } = useDragAndDrop();
			expect(isDragging.value).toBe(false);
		});
	});

	describe("dragStart", () => {
		it("should set 'isDragging' to be true", () => {
			const { isDragging, dragStart } = useDragAndDrop();
			dragStart();
			expect(isDragging.value).toBe(true);
		});
	});

	describe("dragEnd", () => {
		it("should set 'isDragging' to be false", () => {
			const { isDragging, dragStart, dragEnd } = useDragAndDrop();
			dragStart();
			expect(isDragging.value).toBe(true);
			dragEnd();
			expect(isDragging.value).toBe(false);
		});
	});
});
