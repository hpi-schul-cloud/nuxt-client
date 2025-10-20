import type { ElementTypeSelectionOptions } from "../shared/SharedElementTypeSelection.composable";
import { vi } from "vitest";

export const elementTypeSelectionOptionsFactory = {
	create: (options: Partial<ElementTypeSelectionOptions> = {}): ElementTypeSelectionOptions => ({
		icon: "icon-default",
		label: "Default Element",
		action: vi.fn(),
		testId: "default-element",
		...options,
	}),

	createList: (optionsList: Array<Partial<ElementTypeSelectionOptions>>): Array<ElementTypeSelectionOptions> =>
		optionsList.map((options) => elementTypeSelectionOptionsFactory.create(options)),

	createUnsortedExternalToolList: () =>
		elementTypeSelectionOptionsFactory.createList([
			{
				icon: "icon-osm",
				label: "OSM Element",
				testId: "osm-element",
			},
			{
				icon: "icon-google-search",
				label: "Google Search Element",
				testId: "google-search-element",
			},
		]),

	createUnsortedElementList: () =>
		elementTypeSelectionOptionsFactory.createList([
			{
				icon: "icon-whiteboard",
				label: "Whiteboard Element",
				testId: "whiteboard-element",
			},
			{
				icon: "icon-text",
				label: "Text Element",
				testId: "text-element",
			},
			{
				icon: "icon-etherpad",
				label: "Etherpad Element",
				testId: "etherpad-element",
			},
		]),
};
