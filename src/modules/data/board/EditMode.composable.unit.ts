import { useEditMode } from "./EditMode.composable";
import { useBoardPermissions } from "./BoardPermissions.composable";
import { BoardPermissionChecks } from "@/types/board/Permissions";

jest.mock("./BoardPermissions.composable");
const mockedUseBoardPermissions = jest.mocked(useBoardPermissions);

describe("EditMode.composable", () => {
	const fakeId = "testId";

	const setup = (hasEditPermission: boolean) => {
		mockedUseBoardPermissions.mockReturnValue({
			hasEditPermission,
		} as BoardPermissionChecks);
		return useEditMode(fakeId);
	};

	it("should set edit mode with permissions", () => {
		const { isEditMode, startEditMode, stopEditMode } = setup(true);
		expect(isEditMode.value).toBe(false);
		startEditMode();
		expect(isEditMode.value).toBe(true);
		stopEditMode();
		expect(isEditMode.value).toBe(false);
	});

	it("should not set edit mode without permissions ", () => {
		const { isEditMode, startEditMode, stopEditMode } = setup(false);

		expect(isEditMode.value).toBe(false);
		startEditMode();
		expect(isEditMode.value).toBe(false);
		stopEditMode();
		expect(isEditMode.value).toBe(false);
	});
});
