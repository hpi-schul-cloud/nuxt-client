import { CommonCartridgeApiFactory, CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3/api";
import { FileApiFactory, FileApiInterface } from "@/fileStorageApi/v3/api/file-api";
import { initializeAxios } from "@/utils/api";
import { AxiosResponseFactory, fileRecordFactory, mockAxiosInstance } from "@@/tests/test-utils";
import { useAppStoreRefs } from "@data-app";
import { useCommonCartridgeImport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
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
	let fileStorageApiMock: Partial<FileApiInterface>;
	let commonCartridgeApiMock: Partial<CommonCartridgeApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		initializeAxios(mockAxiosInstance());

		fileStorageApiMock = {
			upload: vi.fn(() =>
				Promise.resolve(
					AxiosResponseFactory.create(
						fileRecordFactory.build({
							id: "fileId",
							name: "fileName",
						})
					)
				)
			),
		};

		commonCartridgeApiMock = {
			commonCartridgeControllerImportCourse: vi.fn(() => Promise.resolve(AxiosResponseFactory.create(undefined))),
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

			it("should set isSuccess to false and should not have called commonCartridgeControllerImportCourse if the file is undefined", async () => {
				const { importCommonCartridgeFile, isSuccess } = useCommonCartridgeImport();

				await importCommonCartridgeFile(undefined);

				expect(isSuccess.value).toBe(false);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
			});
		});
	});
});
