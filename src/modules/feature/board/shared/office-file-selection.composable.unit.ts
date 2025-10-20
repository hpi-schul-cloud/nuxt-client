import { useOfficeFileSelection } from "./office-file-selection.composable";

describe("OfficeFileSelectionComposable", () => {
	describe("openOfficeFileSelectionDialog", () => {
		it("should set isOfficeFileDialogOpen to true", () => {
			const { openOfficeFileDialog, isOfficeFileDialogOpen } = useOfficeFileSelection();

			isOfficeFileDialogOpen.value = false;
			expect(isOfficeFileDialogOpen.value).toBe(false);

			openOfficeFileDialog();

			expect(isOfficeFileDialogOpen.value).toBe(true);
		});
	});

	describe("closeOfficeFileSelectionDialog", () => {
		it("should set isOfficeFileDialogOpen to false", () => {
			const { closeOfficeFileDialog, isOfficeFileDialogOpen } = useOfficeFileSelection();

			isOfficeFileDialogOpen.value = true;
			expect(isOfficeFileDialogOpen.value).toBe(true);

			closeOfficeFileDialog();

			expect(isOfficeFileDialogOpen.value).toBe(false);
		});
	});
});
