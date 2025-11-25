import { useAddCollaboraFile } from "./add-collabora-file.composable";
import { fileRecordFactory } from "@@/tests/test-utils";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({
		t: vi.fn().mockImplementation((key: string) => key),
		n: vi.fn().mockImplementation((key: string) => key),
	}),
}));

const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);

describe("AddCollaboraFileComposable", () => {
	const setup = () => {
		const {
			openCollaboraFileDialog,
			closeCollaboraFileDialog,
			collaboraFileSelectionOptions,
			isCollaboraFileDialogOpen,
			latestAddedCollaboraFile,
		} = useAddCollaboraFile();

		return {
			collaboraFileSelectionOptions,
			openCollaboraFileDialog,
			isCollaboraFileDialogOpen,
			closeCollaboraFileDialog,
			latestAddedCollaboraFile,
		};
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia());
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

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

	describe("collaboraFileSelectionOptions", () => {
		it("provides options for collabora file types", () => {
			const { collaboraFileSelectionOptions } = setup();

			expect(collaboraFileSelectionOptions).toHaveLength(3);
			expect(collaboraFileSelectionOptions[0].label).toBe(
				"components.elementTypeSelection.elements.collabora.option.text"
			);
			expect(collaboraFileSelectionOptions[1].label).toBe(
				"components.elementTypeSelection.elements.collabora.option.spreadsheet"
			);
			expect(collaboraFileSelectionOptions[2].label).toBe(
				"components.elementTypeSelection.elements.collabora.option.presentation"
			);
		});

		describe("action of collaboraFileSelectionOptions", () => {
			it("should upload collabora file", async () => {
				const { collaboraFileSelectionOptions } = setup();

				for (const option of collaboraFileSelectionOptions) {
					await option.action("folder-id", "test-office-file");
				}

				expect(fileStorageApiMock.uploadFromUrl).toHaveBeenCalledTimes(collaboraFileSelectionOptions.length);
			});

			it("should set latestAddedCollaboraFile to new file record", async () => {
				const { collaboraFileSelectionOptions, latestAddedCollaboraFile } = setup();
				const fileRecordResponse = fileRecordFactory.build();
				fileStorageApiMock.uploadFromUrl.mockReturnValue(fileRecordResponse);

				await collaboraFileSelectionOptions[0].action("folder-id", "test-office-file");
				expect(latestAddedCollaboraFile.value).toEqual(fileRecordResponse);
			});

			it("should set latestAddedCollaboraFile to null if uploadFromUrl fails", async () => {
				const { collaboraFileSelectionOptions, latestAddedCollaboraFile } = setup();
				fileStorageApiMock.uploadFromUrl.mockReturnValue();

				await collaboraFileSelectionOptions[0].action("folder-id", "test-office-file");
				expect(latestAddedCollaboraFile.value).toBeNull();
			});

			it("should finally close dialog", async () => {
				const { collaboraFileSelectionOptions, openCollaboraFileDialog, isCollaboraFileDialogOpen } = setup();

				openCollaboraFileDialog();
				expect(isCollaboraFileDialogOpen.value).toBe(true);

				await collaboraFileSelectionOptions[0].action("folder-id", "test-office-file");

				expect(isCollaboraFileDialogOpen.value).toBe(false);
			});
		});
	});
});
