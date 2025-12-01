import { useAddCollaboraFile } from "./add-collabora-file.composable";

describe("AddCollaboraFileComposable", () => {
	const setup = () => {
		const { openCollaboraFileDialog, closeCollaboraFileDialog, isCollaboraFileDialogOpen } = useAddCollaboraFile();

		return {
			openCollaboraFileDialog,
			isCollaboraFileDialogOpen,
			closeCollaboraFileDialog,
		};
	};

	describe("openCollaboraFileDialog", () => {
		it("should set isCollaboraFileDialogOpen to true", () => {
			const { openCollaboraFileDialog, isCollaboraFileDialogOpen } = setup();

			isCollaboraFileDialogOpen.value = false;
			expect(isCollaboraFileDialogOpen.value).toBe(false);

			openCollaboraFileDialog();

			expect(isCollaboraFileDialogOpen.value).toBe(true);
		});
	});

	describe("closeCollaboraFileDialog", () => {
		it("should set isCollaboraFileDialogOpen to false", () => {
			const { closeCollaboraFileDialog, isCollaboraFileDialogOpen } = setup();

			isCollaboraFileDialogOpen.value = true;
			expect(isCollaboraFileDialogOpen.value).toBe(true);

			closeCollaboraFileDialog();

			expect(isCollaboraFileDialogOpen.value).toBe(false);
		});
	});
});
