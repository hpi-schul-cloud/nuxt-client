import { useEditMode } from "./editMode.composable";

describe("editMode.composable", () => {
	const testId = "testId";

	describe("when initializing the edit mode", () => {
		it("should be disabled", () => {
			const { isEditMode } = useEditMode(testId);

			expect(isEditMode.value).toBe(false);
		});
	});

	describe("when starting the edit mode", () => {
		it("should enable the edit mode", () => {
			const { isEditMode, startEditMode } = useEditMode(testId);

			startEditMode();

			expect(isEditMode.value).toBe(true);
		});
	});

	describe("when stopping the edit mode", () => {
		it("should disable the edit mode", () => {
			const { isEditMode, stopEditMode } = useEditMode(testId);

			stopEditMode();

			expect(isEditMode.value).toBe(false);
		});
	});
});
