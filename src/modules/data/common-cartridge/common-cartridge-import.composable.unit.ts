import { CommonCartridgeApiFactory, CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3/api";
import { FileApiFactory, FileApiInterface } from "@/fileStorageApi/v3/api/file-api";
import { initializeAxios } from "@/utils/api";
import { useAppStoreRefs } from "@data-app";
import { useCommonCartridgeImport } from "@data-common-cartridge";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
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
	let axiosMock: DeepMocked<AxiosInstance>;
	let fileStorageApiMock: DeepMocked<FileApiInterface>;
	let commonCartridgeApiMock: DeepMocked<CommonCartridgeApiInterface>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = createMock<AxiosInstance>();
		initializeAxios(axiosMock);

		fileStorageApiMock = createMock<FileApiInterface>();
		commonCartridgeApiMock = createMock<CommonCartridgeApiInterface>();

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

	describe("importCommonCartridgeFile", () => {
		it("should set isSuccess to false if file is undefined", async () => {
			const { isSuccess, importCommonCartridgeFile } = useCommonCartridgeImport();
			await importCommonCartridgeFile(undefined);
			expect(isSuccess.value).toBe(false);
		});

		it("should set isSuccess to false if user ID is missing", async () => {
			const { isSuccess, importCommonCartridgeFile } = useCommonCartridgeImport();
			(useAppStoreRefs as Mock).mockReturnValueOnce({
				user: ref({ id: undefined }),
				school: ref({ id: "schoolId" }),
			});
			await importCommonCartridgeFile(new File(["content"], "test.txt"));
			expect(isSuccess.value).toBe(false);
		});

		it("should set isSuccess to false if school ID is missing", async () => {
			const { isSuccess, importCommonCartridgeFile } = useCommonCartridgeImport();
			(useAppStoreRefs as Mock).mockReturnValueOnce({
				user: ref({ id: "userId" }),
				school: ref({ id: undefined }),
			});
			await importCommonCartridgeFile(new File(["content"], "test.txt"));
			expect(isSuccess.value).toBe(false);
		});

		it("should set isSuccess to true on successful file import", async () => {
			const { isSuccess, importCommonCartridgeFile, setFile } = useCommonCartridgeImport();
			const mockFile = new File(["content"], "test.txt");
			setFile(mockFile);

			fileStorageApiMock.upload.mockResolvedValueOnce({
				data: {
					id: "fileId",
					name: "test.txt",
					url: "fileUrl",
				},
			});

			commonCartridgeApiMock.commonCartridgeControllerImportCourse.mockResolvedValueOnce({});

			await importCommonCartridgeFile(mockFile);
			expect(fileStorageApiMock.upload).toHaveBeenCalled();
			expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).toHaveBeenCalled();
			expect(isSuccess.value).toBe(true);
		});

		it("should set isSuccess to false on file import failure", async () => {
			const { isSuccess, importCommonCartridgeFile, setFile } = useCommonCartridgeImport();
			const mockFile = new File(["content"], "test.txt");
			setFile(mockFile);

			fileStorageApiMock.upload.mockRejectedValueOnce(new Error("Upload failed"));

			await importCommonCartridgeFile(mockFile);
			expect(fileStorageApiMock.upload).toHaveBeenCalled();
			expect(isSuccess.value).toBe(false);
		});
	});
});
