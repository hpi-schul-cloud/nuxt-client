import { CommonCartridgeApiFactory, CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3/api";
import { FileApiFactory, FileApiInterface } from "@/fileStorageApi/v3/api/file-api";
import { FileRecordParentType, FileRecordScanStatus, PreviewStatus } from "@/fileStorageApi/v3/models";
import { initializeAxios } from "@/utils/api";
import { useAppStoreRefs } from "@data-app";
import { useCommonCartridgeImport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { AxiosHeaders, AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { Mock, vi } from "vitest";
import { ref } from "vue";

vi.mock("@/utils/api");

vi.mock("@/fileStorageApi/v3/api/file-api", () => ({
	FileApiFactory: vi.fn(),
}));

vi.mock("@/commonCartridgeApi/v3/api", () => ({
	CommonCartridgeApiFactory: vi.fn(),
}));

vi.mock("@data-app");

describe("useCommonCartridgeImport composable", () => {
	let axiosMock: AxiosInstance;
	let fileStorageApiMock: Partial<FileApiInterface>;
	let commonCartridgeApiMock: Partial<CommonCartridgeApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = { ...vi.fn() } as unknown as AxiosInstance;
		initializeAxios(axiosMock);

		fileStorageApiMock = {
			upload: vi.fn(() =>
				Promise.resolve({
					data: {
						id: "fileId",
						name: "fileName",
						url: "fileUrl",
						parentId: "parentId",
						securityCheckStatus: FileRecordScanStatus.VERIFIED,
						size: 12345,
						creatorId: "creatorId",
						createdAt: "2026-03-12T00:00:00Z",
						updatedAt: "2026-03-12T00:00:00Z",
						mimeType: "application/pdf",
						parentType: FileRecordParentType.COURSES,
						previewStatus: PreviewStatus.PREVIEW_POSSIBLE,
						isCollaboraEditable: true,
						exceedsCollaboraEditableFileSize: false,
					},
					status: 200,
					statusText: "OK",
					headers: {},
					config: { headers: new AxiosHeaders() },
				})
			),
		};
		commonCartridgeApiMock = {
			commonCartridgeControllerImportCourse: vi.fn(() =>
				Promise.resolve({
					data: undefined,
					status: 200,
					statusText: "OK",
					headers: {},
					config: { headers: new AxiosHeaders() },
				})
			),
		};

		(FileApiFactory as Mock).mockReturnValue(fileStorageApiMock);
		(CommonCartridgeApiFactory as Mock).mockReturnValue(commonCartridgeApiMock);

		(useAppStoreRefs as Mock).mockReturnValue({
			user: ref({ id: "userId" }),
			school: ref({ id: "schoolId" }),
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("state management", () => {
		it("should initialize with default values", () => {
			const { isOpen, isSuccess, file } = useCommonCartridgeImport();
			expect(isOpen.value).toBe(false);
			expect(isSuccess.value).toBe(false);
			expect(file.value).toBeUndefined();
		});
	});

	describe("setters", () => {
		it("should update isOpen state", () => {
			const { isOpen, setIsOpen } = useCommonCartridgeImport();
			setIsOpen(true);
			expect(isOpen.value).toBe(true);
		});

		it("should update file state", () => {
			const { file, setFile } = useCommonCartridgeImport();
			const mockFile = new File(["content"], "test.txt");
			setFile(mockFile);
			expect(file.value).toBe(mockFile);
		});

		it("should update isSuccess state", () => {
			const { isSuccess, setIsSuccess } = useCommonCartridgeImport();
			setIsSuccess(true);
			expect(isSuccess.value).toBe(true);
		});
	});

	describe("actions", () => {
		describe("importCommonCartridgeFile", () => {
			it("should call fileStorageApi.upload with the given file and set success to true", async () => {
				const { importCommonCartridgeFile, isSuccess } = useCommonCartridgeImport();
				const file = new File([""], "file.txt", { type: "text/plain" });

				(fileStorageApiMock.upload as Mock).mockImplementation(() =>
					Promise.resolve({ data: { id: "fileId", name: "fileName", url: "fileUrl" } })
				);
				(commonCartridgeApiMock.commonCartridgeControllerImportCourse as Mock).mockImplementation(() =>
					Promise.resolve({})
				);

				await importCommonCartridgeFile(file);

				expect(fileStorageApiMock.upload).toHaveBeenCalled();
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).toHaveBeenCalledTimes(1);
				expect(isSuccess.value).toBe(true);
			});

			it("should set isSuccess to false if the file is undefined", async () => {
				const { importCommonCartridgeFile, isSuccess } = useCommonCartridgeImport();

				await importCommonCartridgeFile(undefined);

				expect(isSuccess.value).toBe(false);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
			});
		});
	});
});
