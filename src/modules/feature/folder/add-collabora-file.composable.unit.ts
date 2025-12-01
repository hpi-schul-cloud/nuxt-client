import { useAddCollaboraFile } from "./add-collabora-file.composable";
import * as FileStorageApi from "@data-file";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn().mockReturnValue({
		t: vi.fn().mockImplementation((key: string) => key),
	}),
}));

const fileStorageApiMock = createMock<ReturnType<typeof FileStorageApi.useFileStorageApi>>();
vi.spyOn(FileStorageApi, "useFileStorageApi").mockReturnValue(fileStorageApiMock);

describe("AddCollaboraFileComposable", () => {
	const setup = () => {
		const { openCollaboraFileDialog, closeCollaboraFileDialog, isCollaboraFileDialogOpen } = useAddCollaboraFile();

		return {
			openCollaboraFileDialog,
			isCollaboraFileDialogOpen,
			closeCollaboraFileDialog,
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
});
