import { useSharedElementTypeSelection } from "./SharedElementTypeSelection.composable";

describe("SharedElementSelectionComposable", () => {
	describe("closeDialog", () => {
		it("should set isDialogOpen to false", () => {
			const { closeDialog, isDialogOpen } = useSharedElementTypeSelection();

			isDialogOpen.value = true;
			expect(isDialogOpen.value).toBe(true);

			closeDialog();

			expect(isDialogOpen.value).toBe(false);
		});
	});
});
