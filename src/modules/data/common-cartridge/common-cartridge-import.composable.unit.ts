import { initializeAxios } from "@/utils/api";
import { AxiosResponseFactory, fileRecordFactory, mockAxiosInstance } from "@@/tests/test-utils";
import { CommonCartridgeApiFactory, CommonCartridgeApiInterface } from "@api-common-cartridge";
import { FileApiFactory, FileApiInterface } from "@api-file-storage";
import { useAppStoreRefs } from "@data-app";
import { useCommonCartridgeImport } from "@data-common-cartridge";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { Mock, vi } from "vitest";
import { ref } from "vue";

vi.mock("@/utils/api");

vi.mock("@api-file-storage", async () => {
	const actual = await vi.importActual("@api-file-storage");
	return {
		...actual,
		FileApiFactory: vi.fn(),
	};
});

vi.mock("@api-common-cartridge", () => ({
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
			upload: vi.fn().mockResolvedValue(
				AxiosResponseFactory.create(
					fileRecordFactory.build({
						id: "fileId",
						name: "fileName",
						url: "fileUrl",
					})
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
			it("should call fileStorageApi.upload with the given file, import the course and set success to true", async () => {
				const { importCommonCartridgeFile, isSuccess } = useCommonCartridgeImport();

				const file = new File([""], "file.txt", { type: "text/plain" });

				await importCommonCartridgeFile(file);

				expect(fileStorageApiMock.upload).toHaveBeenCalledWith("schoolId", "school", "userId", "users", file);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).toHaveBeenCalledWith({
					fileRecordId: "fileId",
					fileName: "fileName",
					fileUrl: "fileUrl",
				});
				expect(isSuccess.value).toBe(true);
			});

			it("should call fileStorageApi.upload with the given file and in case of upload failure set success to false", async () => {
				const { importCommonCartridgeFile, isSuccess } = useCommonCartridgeImport();

				const file = new File([""], "file.txt", { type: "text/plain" });

				(fileStorageApiMock.upload as Mock).mockRejectedValueOnce(new Error("Upload failed"));
				await importCommonCartridgeFile(file);

				expect(fileStorageApiMock.upload).toHaveBeenCalledWith("schoolId", "school", "userId", "users", file);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
				expect(isSuccess.value).toBe(false);
			});

			it("should not call fileStorageApi.upload if the file is undefined", async () => {
				const { importCommonCartridgeFile, isSuccess } = useCommonCartridgeImport();

				await importCommonCartridgeFile(undefined);

				expect(fileStorageApiMock.upload).not.toHaveBeenCalled();
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
				expect(isSuccess.value).toBe(false);
			});
		});
	});
});
