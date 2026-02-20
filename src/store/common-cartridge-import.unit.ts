import CommonCartridgeImportModule from "./common-cartridge-import";
import { CommonCartridgeApiFactory, CommonCartridgeApiInterface } from "@/commonCartridgeApi/v3";
import { FileApiFactory, FileApiInterface, FileRecordParentType, StorageLocation } from "@/fileStorageApi/v3";
import { createTestAppStore } from "@@/tests/test-utils";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { MockedFunction } from "vitest";

vi.mock("@/commonCartridgeApi/v3/api", () => ({
	CommonCartridgeApiFactory: vi.fn(),
}));

vi.mock("@/fileStorageApi/v3/api", () => ({
	FileApiFactory: vi.fn(),
}));

describe("CommonCartridgeImportModule", () => {
	let sut: CommonCartridgeImportModule;
	let commonCartridgeApiMock: DeepMocked<CommonCartridgeApiInterface>;
	let fileStorageApiMock: DeepMocked<FileApiInterface>;

	beforeAll(() => {
		setActivePinia(createTestingPinia());

		sut = new CommonCartridgeImportModule({});
		commonCartridgeApiMock = createMock<CommonCartridgeApiInterface>();
		fileStorageApiMock = createMock<FileApiInterface>();

		vi.spyOn(sut, "commonCartridgeApi", "get").mockReturnValue(commonCartridgeApiMock);
		vi.spyOn(sut, "fileStorageApi", "get").mockReturnValue(fileStorageApiMock);
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	const setup = (userId: string | undefined, schoolId: string | undefined) => {
		createTestAppStore({
			me: {
				user: {
					id: userId,
				},
				school: {
					id: schoolId,
				},
			},
		});
	};

	describe("getters", () => {
		it("should return the mocked commonCartridgeApi instance", () => {
			const result = sut.commonCartridgeApi;
			expect(result).toBe(commonCartridgeApiMock);
		});

		it("should return the mocked fileStorageApi instance", () => {
			const result = sut.fileStorageApi;
			expect(result).toBe(fileStorageApiMock);
		});

		it("file", () => {
			expect(sut.file).toBeUndefined();
		});

		it("isOpen", () => {
			expect(sut.isOpen).toBe(false);
		});

		it("isSuccess", () => {
			expect(sut.isSuccess).toBe(false);
		});
	});

	describe("getters (real, for coverage)", () => {
		it("should execute the real getter and call CommonCartridgeApiFactory", () => {
			const realMock = createMock<CommonCartridgeApiInterface>();

			(CommonCartridgeApiFactory as MockedFunction<typeof CommonCartridgeApiFactory>).mockReturnValue(realMock);

			const localSut = new CommonCartridgeImportModule({});
			const result = localSut.commonCartridgeApi;

			expect(result).toBe(realMock);
			expect(CommonCartridgeApiFactory).toHaveBeenCalledWith(undefined, "/v3", undefined);
		});

		it("should execute the real getter and call FileApiFactory", () => {
			const realMock = createMock<FileApiInterface>();

			(FileApiFactory as MockedFunction<typeof FileApiFactory>).mockReturnValue(realMock);

			const localSut = new CommonCartridgeImportModule({});
			const result = localSut.fileStorageApi;

			expect(result).toBe(realMock);
			expect(FileApiFactory).toHaveBeenCalledWith(undefined, "/v3", undefined);
		});
	});

	describe("mutations", () => {
		it("setFile", () => {
			const file = new File([""], "file.txt");

			sut.setFile(file);

			expect(sut.file).toBe(file);
		});

		it("setIsOpen", () => {
			sut.setIsOpen(true);

			expect(sut.isOpen).toBe(true);
		});

		it("setIsSuccess", () => {
			sut.setIsSuccess(true);

			expect(sut.isSuccess).toBe(true);
		});
	});

	describe("actions", () => {
		describe("importCommonCartridgeFile", () => {
			it("should call fileStorageApi.upload with the given file and set success to true", async () => {
				setup("userId", "schoolId");

				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(fileStorageApiMock.upload).toHaveBeenCalledWith(
					"schoolId",
					StorageLocation.SCHOOL,
					"userId",
					FileRecordParentType.USERS,
					file
				);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).toHaveBeenCalledTimes(1);

				expect(sut.isSuccess).toBe(true);
			});

			it("should set isSuccess to false if the file is undefined", async () => {
				setup("userId", "schoolId");

				await sut.importCommonCartridgeFile(undefined);

				expect(sut.isSuccess).toBe(false);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
			});

			it("should set isSuccess to false if the userId is undefined", async () => {
				setup(undefined, "schoolId");

				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(false);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
			});

			it("should set isSuccess to false if the schoolId is undefined", async () => {
				setup("userId", undefined);

				const file = new File([""], "file.txt", { type: "text/plain" });

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(false);
				expect(commonCartridgeApiMock.commonCartridgeControllerImportCourse).not.toHaveBeenCalled();
			});

			it("should set isSuccess to false if the request fails", async () => {
				setup("userId", "schoolId");
				const file = new File([""], "file.txt", { type: "text/plain" });

				fileStorageApiMock.upload.mockRejectedValue(new Error());

				await sut.importCommonCartridgeFile(file);

				expect(sut.isSuccess).toBe(false);
			});
		});
	});
});
