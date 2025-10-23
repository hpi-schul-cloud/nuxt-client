import { ErrorType, useFileStorageApi } from "./FileStorageApi.composable";
import * as serverApi from "@/fileStorageApi/v3/api/file-api";
import * as wopiApi from "@/fileStorageApi/v3/api/wopi-api";
import {
	AuthorizedCollaboraDocumentUrlResponse,
	EditorMode,
	FileRecord,
	FileRecordListResponse,
	FileRecordParent,
	StorageLocation,
} from "@/types/file/File";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import {
	authorizedCollaboraDocumentUrlResponseFactory,
	AxiosResponseFactory,
	createTestAppStoreWithSchool,
} from "@@/tests/test-utils";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { fileRecordFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { useNotificationStore } from "@data-app";
import { createMock } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosResponse } from "axios";
import { setActivePinia } from "pinia";
import { beforeEach } from "vitest";

vi.mock("vue-i18n", () => ({
	useI18n: vi.fn(() => ({
		t: vi.fn((key) => key),
		n: vi.fn((key) => key),
	})),
}));

vi.mock("@/utils/helpers");

vi.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = vi.mocked(mapAxiosErrorToResponseError);

const setupErrorResponse = (message = "NOT_FOUND", code = 404) => {
	const expectedPayload = apiResponseErrorFactory.build({
		message,
		code,
	});
	const responseError = axiosErrorFactory.build({
		response: { data: expectedPayload },
	});

	return {
		responseError,
		expectedPayload,
	};
};

describe("FileStorageApi Composable", () => {
	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		createTestAppStoreWithSchool("schoolId");
	});

	beforeEach(() => {
		vi.resetAllMocks();
	});

	describe("getFileRecords", () => {
		//Already tested in FileRecords.state.unit.ts Here only minimal test
		describe("when filerecords state is empty", () => {
			const setup = () => {
				const parentId = ObjectIdMock();

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);

				return {
					parentId,
				};
			};

			it("should return empty array", async () => {
				const { parentId } = setup();
				const { getFileRecordsByParentId } = useFileStorageApi();

				const result = await getFileRecordsByParentId(parentId);

				expect(result).toEqual([]);
			});
		});
	});

	describe("fetchFileById", () => {
		describe("when file api returns file record successfully", () => {
			const setup = () => {
				const fileRecord = fileRecordFactory.build();
				const response = createMock<AxiosResponse<FileRecord, unknown>>({
					data: fileRecord,
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.getFileRecord.mockResolvedValueOnce(response);

				return {
					fileRecord,
					response,
					fileApi,
				};
			};

			it("should call FileApiFactory.getFileRecord", async () => {
				const { fileApi, fileRecord } = setup();
				const { fetchFileById } = useFileStorageApi();

				await fetchFileById(fileRecord.id);

				expect(fileApi.getFileRecord).toHaveBeenCalledWith(fileRecord.id);
			});

			it("should upsert filerecord", async () => {
				const { fileRecord } = setup();
				const { fetchFileById, getFileRecordById } = useFileStorageApi();

				await fetchFileById(fileRecord.id);

				const result = getFileRecordById(fileRecord.id);
				expect(result).toStrictEqual(fileRecord);
			});
		});

		describe("when file api returns error", () => {
			const setup = (message?: string) => {
				const fileRecordId = ObjectIdMock();

				const { responseError, expectedPayload } = setupErrorResponse(message);
				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.getFileRecord.mockRejectedValue(responseError);

				return {
					fileRecordId,
					responseError,
				};
			};

			it("should notify unauthorized and pass error", async () => {
				const { fileRecordId, responseError } = setup(ErrorType.Unauthorized);

				const { fetchFileById } = useFileStorageApi();

				await expect(fetchFileById(fileRecordId)).rejects.toBe(responseError);
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.401" })
				);
			});

			it("should notify forbidden error and pass error", async () => {
				const { fileRecordId, responseError } = setup(ErrorType.Forbidden);

				const { fetchFileById } = useFileStorageApi();

				await expect(fetchFileById(fileRecordId)).rejects.toBe(responseError);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.403" })
				);
			});

			it("should notify file not found error and pass error", async () => {
				const { fileRecordId, responseError } = setup(ErrorType.FILE_NOT_FOUND);

				const { fetchFileById } = useFileStorageApi();

				await expect(fetchFileById(fileRecordId)).rejects.toBe(responseError);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileServiceNotAvailable",
					})
				);
			});

			it("should notify internal server error and pass error", async () => {
				const { fileRecordId, responseError } = setup();
				const { fetchFileById } = useFileStorageApi();

				await expect(fetchFileById(fileRecordId)).rejects.toBe(responseError);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileServiceNotAvailable",
					})
				);
			});
		});
	});

	describe("fetchFiles", () => {
		describe("when file api returns list successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const fileRecordResponse = fileRecordFactory.build({
					parentId,
					parentType,
				});
				const response = createMock<AxiosResponse<FileRecordListResponse, unknown>>({
					data: { data: [fileRecordResponse] },
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.list.mockResolvedValueOnce(response);

				return {
					parentId,
					parentType,
					fileRecordResponse,
					response,
					fileApi,
				};
			};

			it("should call FileApiFactory.list", async () => {
				const { parentId, parentType, fileApi } = setup();
				const { fetchFiles } = useFileStorageApi();

				await fetchFiles(parentId, parentType);

				expect(fileApi.list).toHaveBeenCalledWith("schoolId", StorageLocation.SCHOOL, parentId, parentType);
			});

			it("should set filerecord", async () => {
				const { parentId, parentType, response } = setup();

				const { fetchFiles, getFileRecordsByParentId } = useFileStorageApi();

				await fetchFiles(parentId, parentType);

				const fileRecord = getFileRecordsByParentId(parentId);

				expect(fileRecord).toStrictEqual([response.data.data[0]]);
			});
		});

		describe("when file api returns error", () => {
			const setup = (message?: string) => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;

				const { responseError, expectedPayload } = setupErrorResponse(message);
				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.list.mockRejectedValue(responseError);

				return {
					parentId,
					parentType,
					responseError,
				};
			};

			it("should notify unauthorized and pass error", async () => {
				const { parentId, parentType, responseError } = setup(ErrorType.Unauthorized);

				const { fetchFiles } = useFileStorageApi();

				await expect(fetchFiles(parentId, parentType)).rejects.toBe(responseError);
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.401" })
				);
			});

			it("should notify forbidden error and pass error", async () => {
				const { parentId, parentType, responseError } = setup(ErrorType.Forbidden);

				const { fetchFiles } = useFileStorageApi();

				await expect(fetchFiles(parentId, parentType)).rejects.toBe(responseError);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.403" })
				);
			});

			it("should notify internal server error and pass error", async () => {
				const { parentId, parentType, responseError } = setup();
				const { fetchFiles } = useFileStorageApi();
				await expect(fetchFiles(parentId, parentType)).rejects.toBe(responseError);
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileServiceNotAvailable",
					})
				);
			});
		});
	});

	describe("upload", () => {
		describe("when file api uploads file successfully", () => {
			const setup = () => {
				const file = new File([""], "filename");
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const fileRecordResponse = fileRecordFactory.build({
					parentId,
					parentType,
				});
				const response = createMock<AxiosResponse<FileRecord, unknown>>({
					data: fileRecordResponse,
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.upload.mockResolvedValueOnce(response);

				return {
					parentId,
					parentType,
					fileRecordResponse,
					file,
					fileApi,
				};
			};

			it("should call FileApiFactory.upload", async () => {
				const { parentId, parentType, file, fileApi } = setup();
				const { upload } = useFileStorageApi();

				await upload(file, parentId, parentType);

				expect(fileApi.upload).toHaveBeenCalledWith("schoolId", StorageLocation.SCHOOL, parentId, parentType, file);
			});

			it("should set filerecord", async () => {
				const { parentId, parentType, file, fileRecordResponse } = setup();
				const { upload, getFileRecordsByParentId } = useFileStorageApi();

				await upload(file, parentId, parentType);

				const fileRecord = getFileRecordsByParentId(parentId);
				expect(fileRecord).toStrictEqual([fileRecordResponse]);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const file = new File([""], "filename");

				const { responseError, expectedPayload } = setupErrorResponse(ErrorType.FILE_TOO_BIG);

				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.upload.mockRejectedValue(responseError);

				return {
					parentId,
					parentType,
					file,
					responseError,
				};
			};

			it("should notify file to big error and pass error", async () => {
				const { parentId, parentType, file, responseError } = setup();
				const { upload } = useFileStorageApi();

				await expect(upload(file, parentId, parentType)).rejects.toBe(responseError);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileToBig",
					})
				);
			});
		});
	});

	describe("uploadFromUrl", () => {
		describe("when file api uploads file successfully", () => {
			const setup = () => {
				const fileName = "example-picture.jpg";
				const imageUrl = `https://www.example.com/${fileName}`;
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const fileRecordResponse = fileRecordFactory.build({
					parentId,
					parentType,
					name: fileName,
				});
				const response = createMock<AxiosResponse<FileRecord, unknown>>({
					data: fileRecordResponse,
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.uploadFromUrl.mockResolvedValueOnce(response);

				return {
					parentId,
					parentType,
					fileApi,
					fileRecordResponse,
					fileName,
					imageUrl,
				};
			};

			it("should call FileApiFactory.uploadFromUrl", async () => {
				const { parentId, parentType, fileApi, fileName, imageUrl } = setup();
				const { uploadFromUrl } = useFileStorageApi();

				await uploadFromUrl(imageUrl, parentId, parentType);

				expect(fileApi.uploadFromUrl).toHaveBeenCalledWith(
					"schoolId",
					StorageLocation.SCHOOL,
					parentId,
					parentType,
					expect.objectContaining({
						url: imageUrl,
						fileName,
					})
				);
			});

			it("should set filerecord", async () => {
				const { parentId, parentType, imageUrl, fileRecordResponse } = setup();
				const { uploadFromUrl, getFileRecordsByParentId } = useFileStorageApi();

				await uploadFromUrl(imageUrl, parentId, parentType);

				const fileRecord = getFileRecordsByParentId(parentId);
				expect(fileRecord).toStrictEqual([fileRecordResponse]);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const file = new File([""], "filename");

				const { responseError, expectedPayload } = setupErrorResponse(ErrorType.FILE_TOO_BIG);

				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.uploadFromUrl.mockRejectedValueOnce(responseError);

				return {
					parentId,
					parentType,
					file,
				};
			};

			it("should notify with file to big error", async () => {
				const { parentId, parentType } = setup();
				const { uploadFromUrl } = useFileStorageApi();

				await uploadFromUrl("abc:/not-an-url", parentId, parentType);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileToBig",
					})
				);
			});
		});
	});

	describe("rename", () => {
		describe("when file api rename file successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const fileRecordResponse = fileRecordFactory.build({
					parentId,
					parentType,
				});

				const renameFileParams = {
					fileName: "new-file-name.txt",
				};

				const response = createMock<AxiosResponse<FileRecord, unknown>>({
					data: fileRecordResponse,
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.patchFilename.mockResolvedValueOnce(response);

				return {
					parentId,
					fileRecordResponse,
					renameFileParams,
					fileApi,
				};
			};

			it("should call FileApiFactory.patchFilename", async () => {
				const { fileRecordResponse, renameFileParams, fileApi } = setup();
				const { rename } = useFileStorageApi();

				await rename(fileRecordResponse.id, renameFileParams);

				expect(fileApi.patchFilename).toHaveBeenCalledWith(fileRecordResponse.id, renameFileParams);
			});

			it("should set filerecord", async () => {
				const { parentId, fileRecordResponse, renameFileParams } = setup();
				const { rename, getFileRecordsByParentId } = useFileStorageApi();

				await rename(fileRecordResponse.id, renameFileParams);

				const fileRecord = getFileRecordsByParentId(parentId);
				expect(fileRecord).toStrictEqual([fileRecordResponse]);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const renameFileParams = {
					fileName: "new-file-name.txt",
				};

				const { responseError, expectedPayload } = setupErrorResponse(ErrorType.FILE_NAME_EXISTS);

				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.patchFilename.mockRejectedValue(responseError);

				return {
					renameFileParams,
				};
			};

			it("should notify with file exists error", async () => {
				const { renameFileParams } = setup();
				const { rename } = useFileStorageApi();

				await rename("dfgdfg", renameFileParams);
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileNameExists",
					})
				);
			});
		});
	});

	describe("deleteFiles", () => {
		describe("when file api deletes file successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const fileRecordResponse = fileRecordFactory.build({
					parentId,
					parentType,
				});

				const fetchResponse = createMock<AxiosResponse<FileRecordListResponse, unknown>>({
					data: { data: [fileRecordResponse] },
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);

				fileApi.list.mockResolvedValueOnce(fetchResponse);

				const response = createMock<AxiosResponse<FileRecordListResponse, unknown>>({
					data: { data: [fileRecordResponse] },
				});

				fileApi.deleteFiles.mockResolvedValue(response);

				return {
					parentId,
					parentType,
					fileRecordResponse,
					fileApi,
				};
			};

			it("should call FileApiFactory.delete", async () => {
				const { fileRecordResponse, fileApi } = setup();
				const { deleteFiles } = useFileStorageApi();

				await deleteFiles([fileRecordResponse]);

				expect(fileApi.deleteFiles).toHaveBeenCalledWith({
					fileRecordIds: [fileRecordResponse.id],
				});
			});

			it("should remove filerecord", async () => {
				const { parentId, fileRecordResponse } = setup();
				const { deleteFiles, getFileRecordsByParentId, fetchFiles } = useFileStorageApi();

				await fetchFiles(fileRecordResponse.parentId, fileRecordResponse.parentType);
				expect(getFileRecordsByParentId(fileRecordResponse.parentId)).toEqual([fileRecordResponse]);

				await deleteFiles([fileRecordResponse]);

				const fileRecord = getFileRecordsByParentId(parentId);
				expect(fileRecord).toStrictEqual([]);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParent.BOARDNODES;
				const fileRecordResponse = fileRecordFactory.build({
					parentId,
					parentType,
				});
				const response = createMock<AxiosResponse<FileRecordListResponse, unknown>>({
					data: { data: [fileRecordResponse] },
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				vi.spyOn(serverApi, "FileApiFactory").mockReturnValueOnce(fileApi);
				fileApi.list.mockResolvedValueOnce(response);

				const { responseError, expectedPayload } = setupErrorResponse(ErrorType.FILE_NOT_FOUND);

				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);
				fileApi.deleteFiles.mockRejectedValue(responseError);

				return {
					expectedPayload,
					fileRecordResponse,
				};
			};

			it("should notify internal server error, file not deleted error and upsert filerecords", async () => {
				const { fileRecordResponse } = setup();
				const { deleteFiles, getFileRecordsByParentId, fetchFiles } = useFileStorageApi();

				await fetchFiles(fileRecordResponse.parentId, fileRecordResponse.parentType);

				expect(getFileRecordsByParentId(fileRecordResponse.parentId)).toEqual([fileRecordResponse]);

				await deleteFiles([]);

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileNotDeleted",
					})
				);
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({
						status: "error",
						text: "components.board.notifications.errors.fileServiceNotAvailable",
					})
				);
				expect(getFileRecordsByParentId(fileRecordResponse.parentId)).toEqual([fileRecordResponse]);
			});
		});
	});

	describe("getAuthorizedCollaboraDocumentUrl", () => {
		describe("when getAuthorizedCollaboraDocumentUrl resolves", () => {
			const setup = () => {
				const fileRecordId = ObjectIdMock();
				const editorMode = EditorMode.EDIT;
				const userDisplayName = "Test User";

				const response = authorizedCollaboraDocumentUrlResponseFactory.build();
				const axiosResponse = AxiosResponseFactory.create<AuthorizedCollaboraDocumentUrlResponse>(response);

				const wopiApiMock = createMock<wopiApi.WopiApiInterface>();
				vi.spyOn(wopiApi, "WopiApiFactory").mockReturnValueOnce(wopiApiMock);
				wopiApiMock.getAuthorizedCollaboraDocumentUrl.mockResolvedValueOnce(axiosResponse);

				return {
					fileRecordId,
					editorMode,
					userDisplayName,
					wopiApiMock,
					response,
				};
			};

			it("should call WopiApiFactory.getAuthorizedCollaboraDocumentUrl and return url", async () => {
				const { fileRecordId, editorMode, userDisplayName, wopiApiMock, response } = setup();
				const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();

				const result = await getAuthorizedCollaboraDocumentUrl(fileRecordId, editorMode, userDisplayName);

				expect(wopiApiMock.getAuthorizedCollaboraDocumentUrl).toHaveBeenCalledWith(
					fileRecordId,
					editorMode,
					userDisplayName
				);
				expect(result).toBe(response.authorizedCollaboraDocumentUrl);
			});
		});

		describe("when getAuthorizedCollaboraDocumentUrl rejects with forbidden error", () => {
			const setup = () => {
				const fileRecordId = ObjectIdMock();
				const editorMode = EditorMode.EDIT;
				const userDisplayName = "Test User";

				const wopiApiMock = createMock<wopiApi.WopiApiInterface>();
				vi.spyOn(wopiApi, "WopiApiFactory").mockReturnValueOnce(wopiApiMock);

				const { responseError, expectedPayload } = setupErrorResponse(ErrorType.Forbidden);
				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				wopiApiMock.getAuthorizedCollaboraDocumentUrl.mockRejectedValueOnce(responseError);

				return {
					fileRecordId,
					editorMode,
					userDisplayName,
					responseError,
				};
			};

			it("should notify forbidden error and throw error", async () => {
				const { fileRecordId, editorMode, userDisplayName } = setup();
				const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();

				await expect(getAuthorizedCollaboraDocumentUrl(fileRecordId, editorMode, userDisplayName)).rejects.toThrow();

				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.403" })
				);
			});
		});

		describe("when getAuthorizedCollaboraDocumentUrl rejects with unauthorized error", () => {
			const setup = () => {
				const fileRecordId = ObjectIdMock();
				const editorMode = EditorMode.EDIT;
				const userDisplayName = "Test User";

				const wopiApiMock = createMock<wopiApi.WopiApiInterface>();
				vi.spyOn(wopiApi, "WopiApiFactory").mockReturnValueOnce(wopiApiMock);

				const { responseError, expectedPayload } = setupErrorResponse(ErrorType.Unauthorized);
				mockedMapAxiosErrorToResponseError.mockReturnValueOnce(expectedPayload);

				wopiApiMock.getAuthorizedCollaboraDocumentUrl.mockRejectedValueOnce(responseError);

				return {
					fileRecordId,
					editorMode,
					userDisplayName,
					responseError,
				};
			};

			it("should notify unauthorized error and throw error", async () => {
				const { fileRecordId, editorMode, userDisplayName } = setup();
				const { getAuthorizedCollaboraDocumentUrl } = useFileStorageApi();

				await expect(getAuthorizedCollaboraDocumentUrl(fileRecordId, editorMode, userDisplayName)).rejects.toThrow();
				expect(useNotificationStore().notify).toHaveBeenCalledWith(
					expect.objectContaining({ status: "error", text: "error.401" })
				);
			});
		});
	});
});
