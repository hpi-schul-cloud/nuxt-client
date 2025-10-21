import { vi } from "vitest";

export const officeFileSelectionOptionsFactory = {
	createOfficeFileSelectionOptionsList: () => [
		{
			id: "1",
			label: "Text Document",
			action: vi.fn(),
		},
		{
			id: "2",
			label: "Table Document",
			action: vi.fn(),
		},
		{
			id: "3",
			label: "Presentation Document",
			action: vi.fn(),
		},
	],
};
