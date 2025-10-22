import { useAddCollaboraFile } from "./add-collabora-file.composable";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

const translationMap: Record<string, string> = {};
vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({
		t: (key: string) => key,
		tc: (key: string) => key,
		te: (key: string) => translationMap[key] !== undefined,
	}),
}));

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

	// it("should call uploadFromUrlt", async () => {
	// 	const { officeFileSelectionOptions, cardId, fileStorageApiMock } = setup();
	// 	const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
	// 	vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValueOnce(fileStorageApiMock);

	// 	const addElementMock = vi.fn(() =>
	// 		Promise.resolve({
	// 			id: "new-element-id",
	// 			type: ContentElementType.File,
	// 			content: {},
	// 			timestamps: {},
	// 		} as AnyContentElement)
	// 	);
	// 	const { askOfficeFileType } = useAddElementDialog(addElementMock, cardId);

	// 	askOfficeFileType();

	// 	const option = officeFileSelectionOptions.value.find((opt) => opt.id === "1");
	// 	await option?.action("test-office-file", "Some caption");

	// 	expect(fileStorageApiMock.uploadFromUrl).toHaveBeenCalledTimes(1);
	// });
});
