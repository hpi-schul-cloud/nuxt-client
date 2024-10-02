import { BoardPermissionChecks } from "@/types/board/Permissions";
import { useBoardPermissions } from "@data-board";
import {
	useCourseBoardEditMode,
	useMediaBoardEditMode,
} from "./editMode.composable";

jest.mock("@data-board");
const mockedUseBoardPermissions = jest.mocked(useBoardPermissions);

describe("editMode.composable", () => {
	describe("when using edit mode for course boards", () => {
		const setup = (hasEditPermission: boolean) => {
			mockedUseBoardPermissions.mockReturnValue({
				hasEditPermission,
			} as BoardPermissionChecks);

			return useCourseBoardEditMode("testId");
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

	describe("when using edit mode for course boards", () => {
		it("should set edit mode", () => {
			const { isEditMode, startEditMode, stopEditMode } =
				useMediaBoardEditMode("testId");

			expect(isEditMode.value).toBe(false);
			startEditMode();
			expect(isEditMode.value).toBe(true);
			stopEditMode();
			expect(isEditMode.value).toBe(false);
		});
	});
});
