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
