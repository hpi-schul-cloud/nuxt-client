import { useBoardAllowedOperations } from "./boardAllowedOperations.composable";
import { useCourseBoardEditMode, useMediaBoardEditMode } from "./edit-mode.composable";
import { computed, Ref, ref } from "vue";

vi.mock("./boardAllowedOperations.composable");
const mockedUseBoardAllowedOperations = vi.mocked(useBoardAllowedOperations);

describe("edit-mode.composable", () => {
	describe("when using edit mode for course boards", () => {
		const setup = ({ hasEditPermission }: { hasEditPermission: Ref<boolean> }) => {
			mockedUseBoardAllowedOperations.mockReturnValue({
				allowedOperations: computed(() => ({
					updateElement: hasEditPermission.value,
				})),
			} as ReturnType<typeof useBoardAllowedOperations>);

			return useCourseBoardEditMode("testId");
		};

		it("should set edit mode with permissions", () => {
			const hasEditPermission = ref(true);
			const { isEditMode, startEditMode, stopEditMode } = setup({ hasEditPermission });

			expect(isEditMode.value).toBe(false);
			startEditMode();
			expect(isEditMode.value).toBe(true);
			stopEditMode();
			expect(isEditMode.value).toBe(false);
		});

		it("should not set edit mode without permissions ", () => {
			const hasEditPermission = ref(false);
			const { isEditMode, startEditMode, stopEditMode } = setup({ hasEditPermission });

			expect(isEditMode.value).toBe(false);
			startEditMode();
			expect(isEditMode.value).toBe(false);
			stopEditMode();
			expect(isEditMode.value).toBe(false);
		});
	});

	describe("when using edit mode for media boards", () => {
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
