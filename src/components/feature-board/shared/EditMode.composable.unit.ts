import { ref } from "vue";
import { useEditMode } from "./EditMode.composable";

const fakeId = ref("testId");
const { isEditMode, startEditMode, stopEditMode } = useEditMode(fakeId);

describe("EditMode.composable", () => {
	beforeEach(() => {
		stopEditMode();
	});

	it("should set edit mode", () => {
		expect(isEditMode.value).toBe(false);
		startEditMode();
		expect(isEditMode.value).toBe(true);
		stopEditMode();
		expect(isEditMode.value).toBe(false);
	});
});
