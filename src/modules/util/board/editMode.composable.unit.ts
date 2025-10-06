import { useCourseBoardEditMode, useMediaBoardEditMode } from "./editMode.composable";
import { BoardPermissionChecks } from "@/types/board/Permissions";
import { useBoardPermissions } from "@data-board";
import { Ref, ref } from "vue";

vi.mock("@data-board");
const mockedUseBoardPermissions = vi.mocked(useBoardPermissions);

describe("editMode.composable", () => {
	describe("when using edit mode for course boards", () => {
		const setup = (hasEditPermission: Ref<boolean>) => {
			mockedUseBoardPermissions.mockReturnValue({
				hasEditPermission,
			} as BoardPermissionChecks);

			return useCourseBoardEditMode("testId");
		};

		it("should set edit mode with permissions", () => {
			const { isEditMode, startEditMode, stopEditMode } = setup(ref(true));
			expect(isEditMode.value).toBe(false);
			startEditMode();
			expect(isEditMode.value).toBe(true);
			stopEditMode();
			expect(isEditMode.value).toBe(false);
		});

		it("should not set edit mode without permissions ", () => {
			const { isEditMode, startEditMode, stopEditMode } = setup(ref(false));

			expect(isEditMode.value).toBe(false);
			startEditMode();
			expect(isEditMode.value).toBe(false);
			stopEditMode();
			expect(isEditMode.value).toBe(false);
		});
	});

	describe("when using edit mode for course boards", () => {
		it("should set edit mode", () => {
			const { isEditMode, startEditMode, stopEditMode } = useMediaBoardEditMode("testId");

			expect(isEditMode.value).toBe(false);
			startEditMode();
			expect(isEditMode.value).toBe(true);
			stopEditMode();
			expect(isEditMode.value).toBe(false);
		});
	});
});
