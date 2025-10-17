import { elementTypeSelectionOptionsFactory } from "../test-utils/ElementTypeSelectionOptions.factory";
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

	describe("openCollaboraDialog", () => {
		it("should set isCollaboraDialogOpen to true", () => {
			const { openCollaboraDialog, isCollaboraDialogOpen } = useSharedElementTypeSelection();

			isCollaboraDialogOpen.value = false;
			expect(isCollaboraDialogOpen.value).toBe(false);

			openCollaboraDialog();

			expect(isCollaboraDialogOpen.value).toBe(true);
		});
	});

	describe("closeCollaboraDialog", () => {
		it("should set isCollaboraDialogOpen to false", () => {
			const { closeCollaboraDialog, isCollaboraDialogOpen } = useSharedElementTypeSelection();

			isCollaboraDialogOpen.value = true;
			expect(isCollaboraDialogOpen.value).toBe(true);

			closeCollaboraDialog();

			expect(isCollaboraDialogOpen.value).toBe(false);
		});
	});

	describe("elementTypeOptions", () => {
		it("should return options in alphabetical order", () => {
			const { staticElementTypeOptions, dynamicElementTypeOptions, elementTypeOptions } =
				useSharedElementTypeSelection();

			staticElementTypeOptions.value = elementTypeSelectionOptionsFactory.createUnsortedElementList();
			dynamicElementTypeOptions.value = elementTypeSelectionOptionsFactory.createUnsortedExternalToolList();

			const result = elementTypeOptions.value;
			const labels = result.map((option) => option.label);

			expect(labels).toEqual([
				"Etherpad Element",
				"Google Search Element",
				"OSM Element",
				"Text Element",
				"Whiteboard Element",
			]);
		});
	});
});
