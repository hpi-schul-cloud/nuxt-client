// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { setupFileSelectMock } from "../../../util/board/test-utils/file-select-mock";
import { CollaboraFileType, useAddCollaboraFile } from "./add-collabora-file.composable";
// import { AnyContentElement, ContentElementType } from "@/types/board/ContentElement";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({
		t: vi.fn().mockImplementation((key: string) => key),
		n: vi.fn().mockImplementation((key: string) => key),
	}),
}));

vi.mock("../../../util/board/file-select.composable");
const disableFileSelectOnMountMock = vi.fn();
const resetFileSelectOnMountEnabledMock = vi.fn();
setupFileSelectMock({
	disableFileSelectOnMountMock,
	resetFileSelectOnMountEnabledMock,
});

describe("AddCollaboraFileComposable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	describe("openCollaboraFileDialog", () => {
		it("should set isCollaboraFileDialogOpen to true", () => {
			const { openCollaboraFileDialog, isCollaboraFileDialogOpen } = useAddCollaboraFile();

			isCollaboraFileDialogOpen.value = false;
			expect(isCollaboraFileDialogOpen.value).toBe(false);

			openCollaboraFileDialog();

			expect(isCollaboraFileDialogOpen.value).toBe(true);
		});
	});

	describe("closeCollaboraFileDialog", () => {
		it("should set isCollaboraFileDialogOpen to false", () => {
			const { closeCollaboraFileDialog, isCollaboraFileDialogOpen } = useAddCollaboraFile();

			isCollaboraFileDialogOpen.value = true;
			expect(isCollaboraFileDialogOpen.value).toBe(true);

			closeCollaboraFileDialog();

			expect(isCollaboraFileDialogOpen.value).toBe(false);
		});
	});

	describe("setCardId", () => {
		it("should set cardId", () => {
			const { setCardId, cardId, isCollaboraFileDialogOpen } = useAddCollaboraFile();

			isCollaboraFileDialogOpen.value = true;
			expect(isCollaboraFileDialogOpen.value).toBe(true);

			setCardId("test-card-id");

			expect(cardId.value).toBe("test-card-id");
		});
	});

	describe("getAssetUrl", () => {
		it("returns correct URL for collabora types", () => {
			const { getAssetUrl } = useAddCollaboraFile();
			const origin = window.location.origin;

			expect(getAssetUrl(CollaboraFileType.Text)).toBe(`${origin}/collabora/doc.docx`);
			expect(getAssetUrl(CollaboraFileType.Spreadsheet)).toBe(`${origin}/collabora/spreadsheet.xlsx`);
			expect(getAssetUrl(CollaboraFileType.Presentation)).toBe(`${origin}/collabora/presentation.pptx`);
		});
	});

	// describe("initializeFileElementWithCollaboraFile", () => {
	// 	it("should disable file select on mount", async () => {
	// 		const { initializeFileElementWithCollaboraFile } = useAddCollaboraFile();
	// 		const cardId = "test-card-id";
	// 		const element = {
	// 			id: "new-element-id",
	// 			type: ContentElementType.File,
	// 			content: {},
	// 			timestamps: {},
	// 		} as AnyContentElement;
	// 		const collaboraFileType = CollaboraFileType.Text;
	// 		const fileName = "test-file";
	// 		const caption = "test-caption";
	// 		await initializeFileElementWithCollaboraFile(cardId, element, collaboraFileType, fileName, caption);
	// 		expect(disableFileSelectOnMountMock).toHaveBeenCalled();
	// 	});
	// 	it("should reset file select after initialization", async () => {
	// 		useAddCollaboraFile();
	// 		const cardId = "test-card-id";
	// 		const element = {
	// 			id: "new-element-id",
	// 			type: ContentElementType.File,
	// 			content: {},
	// 			timestamps: {},
	// 		} as AnyContentElement;
	// 		const collaboraFileType = CollaboraFileType.Text;
	// 		const fileName = "test-file";
	// 		const caption = "test-caption";
	// 		await initializeFileElementWithCollaboraFile(cardId, element, collaboraFileType, fileName, caption);
	// 		expect(resetFileSelectOnMountEnabledMock).toHaveBeenCalled();
	// 	});
	// 	it("should close the dialog after initialization", async () => {
	// 		const { openCollaboraFileDialog, isCollaboraFileDialogOpen } = useAddCollaboraFile();
	// 		const cardId = "test-card-id";
	// 		const element = {
	// 			id: "new-element-id",
	// 			type: ContentElementType.File,
	// 			content: {},
	// 			timestamps: {},
	// 		} as AnyContentElement;
	// 		const collaboraFileType = CollaboraFileType.Text;
	// 		const fileName = "test-file";
	// 		const caption = "test-caption";
	// 		openCollaboraFileDialog();
	// 		expect(isCollaboraFileDialogOpen.value).toBe(true);
	// 		await initializeFileElementWithCollaboraFile(cardId, element, collaboraFileType, fileName, caption);
	// 		expect(isCollaboraFileDialogOpen.value).toBe(false);
	// 	});
	// });
});

// describe("when the collabora file action is called", () => {
// 	// it("should call add element function with right argument for all collabora options", async () => {
// 	// 	const { addElementMock, collaboraFileSelectionOptions, cardId } = setup();
// 	// 	const { askCollaboraFileType } = useAddElementDialog(addElementMock, cardId);
// 	// 	askCollaboraFileType();
// 	// 	for (const option of collaboraFileSelectionOptions.value) {
// 	// 		await option.action("test-office-file", "Some caption");
// 	// 		expect(addElementMock).toHaveBeenLastCalledWith({
// 	// 			type: ContentElementType.File,
// 	// 			cardId,
// 	// 		});
// 	// 	}
// 	// 	expect(addElementMock).toHaveBeenCalledTimes(collaboraFileSelectionOptions.value.length);
// 	// });
// 	// it("should call the initialize element function for all collabora options", async () => {
// 	// 	const { collaboraFileSelectionOptions, initializeFileElementWithCollaboraFileMock, cardId } = setup();
// 	// 	const addElementMock = vi.fn(() =>
// 	// 		Promise.resolve({
// 	// 			id: "new-element-id",
// 	// 			type: ContentElementType.File,
// 	// 			content: {},
// 	// 			timestamps: {},
// 	// 		} as AnyContentElement)
// 	// 	);
// 	// 	const { askCollaboraFileType } = useAddElementDialog(addElementMock, cardId);
// 	// 	askCollaboraFileType();
// 	// 	for (const option of collaboraFileSelectionOptions.value) {
// 	// 		await option.action("test-office-file", "Some caption");
// 	// 	}
// 	// 	expect(initializeFileElementWithCollaboraFileMock).toHaveBeenCalledTimes(
// 	// 		collaboraFileSelectionOptions.value.length
// 	// 	);
// 	// });
// });
