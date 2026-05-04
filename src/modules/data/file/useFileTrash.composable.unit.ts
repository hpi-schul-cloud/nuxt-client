import { useFileTrash } from "./useFileTrash.composable";
import { FileRecord, FileRecordListResponse, FileRecordParent, StorageLocation } from "@/types/file/File";
import { mockApi, mockApiResponse } from "@@/tests/test-utils";
import { fileRecordFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import * as serverApi from "@api-file-storage";
import { notifyError } from "@data-app";

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn(() => ({
		t: vi.fn((key: string) => key),
	})),
}));

vi.mock("@data-app", () => ({
	notifyError: vi.fn(),
	useAppStore: vi.fn(() => ({ school: { id: "schoolId" } })),
}));

describe("useFileTrash", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("fetchDeletedFiles", () => {
		describe("when the API returns deleted files successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;

				const fileRecordResponse = fileRecordFactory.build({ parentId, parentType });
				const response = mockApiResponse<FileRecordListResponse>({
					data: { data: [fileRecordResponse] } as FileRecordListResponse,
				});

				const fileApi = mockApi<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.listDeleted.mockResolvedValueOnce(response);

				return { parentId, parentType, fileRecordResponse, fileApi };
			};

			it("should call listDeleted with the correct parameters", async () => {
				const { parentId, parentType, fileApi } = setup();
				const { fetchDeletedFiles } = useFileTrash();

				await fetchDeletedFiles(parentId, parentType);

				expect(fileApi.listDeleted).toHaveBeenCalledWith("schoolId", StorageLocation.SCHOOL, parentId, parentType);
			});

			it("should populate deletedFileRecords with the returned files", async () => {
				const { parentId, parentType, fileRecordResponse } = setup();
				const { fetchDeletedFiles, deletedFileRecords } = useFileTrash();

				await fetchDeletedFiles(parentId, parentType);

				expect(deletedFileRecords.value).toStrictEqual([fileRecordResponse]);
			});
		});
	});

	describe("restoreFiles", () => {
		describe("when the API restores files successfully", () => {
			const setup = () => {
				const fileRecordToRestore = fileRecordFactory.build();
				const otherFileRecord = fileRecordFactory.build();

				const restoreResponse = mockApiResponse<FileRecordListResponse>({
					data: { data: [fileRecordToRestore] } as FileRecordListResponse,
				});

				const fileApi = mockApi<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.restoreFiles.mockResolvedValueOnce(restoreResponse);

				return { fileRecordToRestore, otherFileRecord, fileApi };
			};

			it("should call restoreFiles with the correct file record IDs", async () => {
				const { fileRecordToRestore, fileApi } = setup();
				const { restoreFiles } = useFileTrash();

				await restoreFiles([fileRecordToRestore]);

				expect(fileApi.restoreFiles).toHaveBeenCalledWith({
					fileRecordIds: [fileRecordToRestore.id],
				});
			});

			it("should remove restored files from deletedFileRecords", async () => {
				const { fileRecordToRestore, otherFileRecord } = setup();
				const { restoreFiles, deletedFileRecords } = useFileTrash();

				deletedFileRecords.value = [fileRecordToRestore, otherFileRecord];
				await restoreFiles([fileRecordToRestore]);

				expect(deletedFileRecords.value).toStrictEqual([otherFileRecord]);
			});

			it("should keep deletedFileRecords empty when all files are restored", async () => {
				const { fileRecordToRestore, otherFileRecord } = setup();
				const { restoreFiles, deletedFileRecords } = useFileTrash();

				deletedFileRecords.value = [fileRecordToRestore, otherFileRecord];
				await restoreFiles([fileRecordToRestore, otherFileRecord]);

				expect(deletedFileRecords.value).toStrictEqual([]);
			});
		});

		describe("when the API returns an error", () => {
			const setup = () => {
				const fileRecord = fileRecordFactory.build() as FileRecord;

				const fileApi = mockApi<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.restoreFiles.mockRejectedValueOnce(new Error("network error"));

				return { fileRecord, fileApi };
			};

			it("should call notifyError when restore fails", async () => {
				const { fileRecord } = setup();
				const { restoreFiles } = useFileTrash();

				await expect(restoreFiles([fileRecord])).rejects.toThrow("network error");

				expect(notifyError).toHaveBeenCalledWith("components.board.notifications.errors.fileServiceNotAvailable");
			});

			it("should not modify deletedFileRecords when restore fails", async () => {
				const { fileRecord } = setup();
				const { restoreFiles, deletedFileRecords } = useFileTrash();

				deletedFileRecords.value = [fileRecord];
				await expect(restoreFiles([fileRecord])).rejects.toThrow("network error");

				expect(deletedFileRecords.value).toStrictEqual([fileRecord]);
			});
		});
	});

	describe("purgeFiles", () => {
		describe("when the API purges files successfully", () => {
			const setup = () => {
				const fileRecordToPurge = fileRecordFactory.build();
				const otherFileRecord = fileRecordFactory.build();

				const purgeResponse = mockApiResponse<FileRecordListResponse>({
					data: { data: [fileRecordToPurge] } as FileRecordListResponse,
				});

				const fileApi = mockApi<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.purgeFiles.mockResolvedValueOnce(purgeResponse);

				return { fileRecordToPurge, otherFileRecord, fileApi };
			};

			it("should call purgeFiles with the correct file record IDs", async () => {
				const { fileRecordToPurge, fileApi } = setup();
				const { purgeFiles } = useFileTrash();

				await purgeFiles([fileRecordToPurge]);

				expect(fileApi.purgeFiles).toHaveBeenCalledWith({
					fileRecordIds: [fileRecordToPurge.id],
				});
			});

			it("should remove purged files from deletedFileRecords", async () => {
				const { fileRecordToPurge, otherFileRecord } = setup();
				const { purgeFiles, deletedFileRecords } = useFileTrash();

				deletedFileRecords.value = [fileRecordToPurge, otherFileRecord];
				await purgeFiles([fileRecordToPurge]);

				expect(deletedFileRecords.value).toStrictEqual([otherFileRecord]);
			});

			it("should keep deletedFileRecords empty when all files are purged", async () => {
				const { fileRecordToPurge, otherFileRecord } = setup();
				const { purgeFiles, deletedFileRecords } = useFileTrash();

				deletedFileRecords.value = [fileRecordToPurge, otherFileRecord];
				await purgeFiles([fileRecordToPurge, otherFileRecord]);

				expect(deletedFileRecords.value).toStrictEqual([]);
			});
		});

		describe("when the API returns an error", () => {
			const setup = () => {
				const fileRecord = fileRecordFactory.build() as FileRecord;

				const fileApi = mockApi<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.purgeFiles.mockRejectedValueOnce(new Error("network error"));

				return { fileRecord, fileApi };
			};

			it("should call notifyError when purge fails", async () => {
				const { fileRecord } = setup();
				const { purgeFiles } = useFileTrash();

				await expect(purgeFiles([fileRecord])).rejects.toThrow("network error");

				expect(notifyError).toHaveBeenCalledWith("components.board.notifications.errors.fileServiceNotAvailable");
			});

			it("should not modify deletedFileRecords when purge fails", async () => {
				const { fileRecord } = setup();
				const { purgeFiles, deletedFileRecords } = useFileTrash();

				deletedFileRecords.value = [fileRecord];
				await expect(purgeFiles([fileRecord])).rejects.toThrow("network error");

				expect(deletedFileRecords.value).toStrictEqual([fileRecord]);
			});
		});
	});
});
