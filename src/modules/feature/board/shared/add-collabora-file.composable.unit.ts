// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { setupFileSelectMock } from "../../../util/board/test-utils/file-select-mock";
import { CollaboraFileType, useAddCollaboraFile } from "./add-collabora-file.composable";
import { AnyContentElement, ContentElementType } from "@/types/board/ContentElement";
import { fileElementResponseFactory, mockedPiniaStoreTyping } from "@@/tests/test-utils";
import { useCardStore } from "@data-board";
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

vi.mock("../../../util/board/file-select.composable");
const disableFileSelectOnMountMock = vi.fn();
const resetFileSelectOnMountEnabledMock = vi.fn();
setupFileSelectMock({
	disableFileSelectOnMountMock,
	resetFileSelectOnMountEnabledMock,
});

const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);

let cardStore: ReturnType<typeof useCardStore>;

describe("AddCollaboraFileComposable", () => {
	const newElement: AnyContentElement = fileElementResponseFactory.build({
		id: "new-element-id",
	});

	const getOrInitialiseBoardStore = () => {
		cardStore = cardStore ?? mockedPiniaStoreTyping(useCardStore);
		return cardStore;
	};

	const setup = (failOnElementCreate = false) => {
		const {
			openCollaboraFileDialog,
			closeCollaboraFileDialog,
			collaboraFileSelectionOptions,
			setCardId,
			isCollaboraFileDialogOpen,
			setCreateElementRequestFn,
			cardId,
			getAssetUrl,
		} = useAddCollaboraFile();

		const createElementRequestFnMock = vi.fn().mockResolvedValue(newElement);
		if (failOnElementCreate) {
			createElementRequestFnMock.mockResolvedValue(undefined);
		}

		setCreateElementRequestFn(createElementRequestFnMock);
		setCardId("test-card-id");

		cardStore = getOrInitialiseBoardStore();

		return {
			collaboraFileSelectionOptions,
			createElementRequestFnMock,
			openCollaboraFileDialog,
			isCollaboraFileDialogOpen,
			closeCollaboraFileDialog,
			setCardId,
			cardId,
			getAssetUrl,
			cardStore,
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

	describe("setCardId", () => {
		it("should set cardId", () => {
			const { setCardId, cardId, isCollaboraFileDialogOpen } = setup();

			isCollaboraFileDialogOpen.value = true;
			expect(isCollaboraFileDialogOpen.value).toBe(true);

			setCardId("test-card-id");

			expect(cardId.value).toBe("test-card-id");
		});
	});

	describe("getAssetUrl", () => {
		it("returns correct URL for collabora types", () => {
			const { getAssetUrl } = setup();
			const origin = window.location.origin;

			expect(getAssetUrl(CollaboraFileType.Text)).toBe(`${origin}/collabora/doc.docx`);
			expect(getAssetUrl(CollaboraFileType.Spreadsheet)).toBe(`${origin}/collabora/spreadsheet.xlsx`);
			expect(getAssetUrl(CollaboraFileType.Presentation)).toBe(`${origin}/collabora/presentation.pptx`);
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
			it("should call createElementRequestFn with correct arguments", async () => {
				const { collaboraFileSelectionOptions, createElementRequestFnMock } = setup();

				for (const option of collaboraFileSelectionOptions) {
					await option.action("test-office-file", "");
					expect(createElementRequestFnMock).toHaveBeenLastCalledWith({
						type: ContentElementType.File,
						cardId: "test-card-id",
					});
				}

				expect(createElementRequestFnMock).toHaveBeenCalledTimes(collaboraFileSelectionOptions.length);
			});

			it("should disable file select on mount", async () => {
				const { collaboraFileSelectionOptions } = setup();

				for (const option of collaboraFileSelectionOptions) {
					await option.action("test-office-file", "");
				}

				expect(disableFileSelectOnMountMock).toHaveBeenCalled();
			});

			it("should upload collabora file", async () => {
				const { collaboraFileSelectionOptions } = setup();

				for (const option of collaboraFileSelectionOptions) {
					await option.action("test-office-file", "");
				}

				expect(fileStorageApiMock.uploadFromUrl).toHaveBeenCalledTimes(collaboraFileSelectionOptions.length);
			});

			describe("when a caption is provided", () => {
				it("should update file element with caption", async () => {
					const { collaboraFileSelectionOptions, cardStore } = setup();

					for (const option of collaboraFileSelectionOptions) {
						await option.action("test-office-file", "My Caption");
					}

					expect(cardStore.updateElementRequest).toHaveBeenCalledTimes(collaboraFileSelectionOptions.length);
				});
			});

			it("should finally reset file select on mount", async () => {
				const { collaboraFileSelectionOptions } = setup();

				for (const option of collaboraFileSelectionOptions) {
					await option.action("test-office-file", "");
				}

				expect(resetFileSelectOnMountEnabledMock).toHaveBeenCalled();
			});

			describe("when element creation fails", () => {
				it("should not upload collabora file", async () => {
					const { collaboraFileSelectionOptions } = setup(true);

					for (const option of collaboraFileSelectionOptions) {
						await option.action("test-office-file", "");
					}

					expect(fileStorageApiMock.uploadFromUrl).toHaveBeenCalledTimes(0);
				});
			});
		});
	});
});
