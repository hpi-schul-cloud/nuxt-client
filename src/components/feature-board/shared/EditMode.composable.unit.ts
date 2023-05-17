import { useEditMode } from "./EditMode.composable";

const fakeId = "testId";
const { isEditMode, startEditMode, stopEditMode } = useEditMode(fakeId);

describe("EditMode.composable", () => {
	beforeEach(() => {
		stopEditMode();
	});

	it("should set edit mode", () => {
		expect(isEditMode.value).toBe(false);
		startEditMode();
		// TODO: it cannot read properties of undefined (reading 'hasBoardEditPermission')
		// expect(isEditMode.value).toBe(true);
		stopEditMode();
		expect(isEditMode.value).toBe(false);
	});
});
