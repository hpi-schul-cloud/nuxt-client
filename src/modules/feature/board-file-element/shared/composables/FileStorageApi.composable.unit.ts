import {
	FileRecordListResponse,
	FileRecordParentType,
	FileRecordResponse,
	StorageLocation,
} from "@/fileStorageApi/v3";
import * as serverApi from "@/fileStorageApi/v3/api/file-api";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { createMock } from "@golevelup/ts-jest";
import { AxiosResponse } from "axios";
import { setupFileStorageNotifier } from "../test-utils/fileStorageNotifier";
import { ErrorType, useFileStorageApi } from "./FileStorageApi.composable";

jest.mock("./FileStorageNotifications.composable");

jest.mock("@/utils/helpers");

jest.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = jest.mocked(
	mapAxiosErrorToResponseError
);

jest.mock("@/store/store-accessor", () => ({
	authModule: {
		getSchool: { id: "schoolId" },
	},
}));

jest.mock<typeof import("@/utils/create-global-state")>(
	"@/utils/create-global-state",
	() => ({
		createTestableGlobaleState: (composable) => composable,
	})
);

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
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("getFileRecord", () => {
		describe("when filerecords state is empty", () => {
			const setup = () => {
				const parentId = ObjectIdMock();

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);

				setupFileStorageNotifier();

				return {
					parentId,
				};
			};

			it("should create skeleton", async () => {
				const { parentId } = setup();
				const { getFileRecord } = useFileStorageApi();

				const result = await getFileRecord(parentId);

				expect(result.value).toEqual(undefined);
			});
		});

		describe("when filerecord already exists", () => {
			const setup = () => {
				const parentId = ObjectIdMock();

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);

				setupFileStorageNotifier();

				const { getFileRecord } = useFileStorageApi();
				const existingFileRecord = getFileRecord(parentId);

				return {
					parentId,
					existingFileRecord,
					getFileRecord,
				};
			};

			it("should return skeleton", async () => {
				const { parentId, existingFileRecord, getFileRecord } = setup();

				const result = await getFileRecord(parentId);

				expect(result).toBe(existingFileRecord);
			});
		});
	});

	describe("fetchFile", () => {
		describe("when file api returns list successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});
				const response = createMock<
					AxiosResponse<FileRecordListResponse, unknown>
				>({
					data: { data: [fileRecordResponse] },
				});

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.list.mockResolvedValueOnce(response);

				setupFileStorageNotifier();

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
				const { fetchFile } = useFileStorageApi();

				await fetchFile(parentId, parentType);

				expect(fileApi.list).toBeCalledWith(
					"schoolId",
					StorageLocation.SCHOOL,
					parentId,
					parentType
				);
			});

			describe("when skeleton filerecord doesn't exist in state", () => {
				it("should set filerecord", async () => {
					const { parentId, parentType, response } = setup();

					const { fetchFile, getFileRecord } = useFileStorageApi();

					await fetchFile(parentId, parentType);

					const fileRecord = getFileRecord(parentId);

					expect(fileRecord.value).toStrictEqual(response.data.data[0]);
				});
			});

			describe("when skeleton filerecord already exists in state", () => {
				it("should set filerecord", async () => {
					const { parentId, parentType, response } = setup();

					const { fetchFile, getFileRecord } = useFileStorageApi();

					// Call getFileRecord to create a skeleton file record
					getFileRecord(parentId);

					await fetchFile(parentId, parentType);

					const fileRecord = getFileRecord(parentId);
					expect(fileRecord.value).toStrictEqual(response.data.data[0]);
				});
			});
		});

		describe("when file api returns error", () => {
			const setup = (message?: string) => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;

				const { responseError, expectedPayload } = setupErrorResponse(message);
				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.list.mockRejectedValue(responseError);

				const {
					showInternalServerError,
					showUnauthorizedError,
					showForbiddenError,
				} = setupFileStorageNotifier();

				return {
					parentId,
					parentType,
					responseError,
					showInternalServerError,
					showUnauthorizedError,
					showForbiddenError,
				};
			};

			it("should call showUnauthorizedError and pass error", async () => {
				const { parentId, parentType, showUnauthorizedError, responseError } =
					setup(ErrorType.Unauthorized);

				const { fetchFile } = useFileStorageApi();

				await expect(fetchFile(parentId, parentType)).rejects.toBe(
					responseError
				);
				expect(showUnauthorizedError).toBeCalledTimes(1);
			});

			it("should call showForbiddenError and pass error", async () => {
				const { parentId, parentType, showForbiddenError, responseError } =
					setup(ErrorType.Forbidden);

				const { fetchFile } = useFileStorageApi();

				await expect(fetchFile(parentId, parentType)).rejects.toBe(
					responseError
				);

				expect(showForbiddenError).toBeCalledTimes(1);
			});

			it("should call showInternalServerError and pass error", async () => {
				const { parentId, parentType, showInternalServerError, responseError } =
					setup();
				const { fetchFile } = useFileStorageApi();
				await expect(fetchFile(parentId, parentType)).rejects.toBe(
					responseError
				);

				expect(showInternalServerError).toBeCalledTimes(1);
			});
		});
	});

	describe("upload", () => {
		describe("when file api uploads file successfully", () => {
			const setup = () => {
				const file = new File([""], "filename");
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});
				const response = createMock<AxiosResponse<FileRecordResponse, unknown>>(
					{
						data: fileRecordResponse,
					}
				);

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.upload.mockResolvedValueOnce(response);

				setupFileStorageNotifier();

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

				expect(fileApi.upload).toBeCalledWith(
					"schoolId",
					StorageLocation.SCHOOL,
					parentId,
					parentType,
					file
				);
			});

			it("should set filerecord", async () => {
				const { parentId, parentType, file, fileRecordResponse } = setup();
				const { upload, getFileRecord } = useFileStorageApi();

				await upload(file, parentId, parentType);

				const fileRecord = getFileRecord(parentId);
				expect(fileRecord.value).toStrictEqual(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const file = new File([""], "filename");

				const { responseError, expectedPayload } = setupErrorResponse(
					ErrorType.FILE_TOO_BIG
				);

				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.upload.mockRejectedValue(responseError);

				const { showFileTooBigError } = setupFileStorageNotifier();

				return {
					parentId,
					parentType,
					file,
					showFileTooBigError,
					responseError,
				};
			};

			it("should call showFileTooBigError and pass error", async () => {
				const {
					parentId,
					parentType,
					file,
					showFileTooBigError,
					responseError,
				} = setup();
				const { upload } = useFileStorageApi();

				await expect(upload(file, parentId, parentType)).rejects.toBe(
					responseError
				);

				expect(showFileTooBigError).toBeCalled();
			});
		});
	});

	describe("uploadFromUrl", () => {
		describe("when file api uploads file successfully", () => {
			const setup = () => {
				const fileName = "example-picture.jpg";
				const imageUrl = `https://www.example.com/${fileName}`;
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
					name: fileName,
				});
				const response = createMock<AxiosResponse<FileRecordResponse, unknown>>(
					{
						data: fileRecordResponse,
					}
				);

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.uploadFromUrl.mockResolvedValueOnce(response);

				setupFileStorageNotifier();

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

				expect(fileApi.uploadFromUrl).toBeCalledWith(
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
				const { uploadFromUrl, getFileRecord } = useFileStorageApi();

				await uploadFromUrl(imageUrl, parentId, parentType);

				const fileRecord = getFileRecord(parentId);
				expect(fileRecord.value).toStrictEqual(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const file = new File([""], "filename");

				const { responseError, expectedPayload } = setupErrorResponse(
					ErrorType.FILE_TOO_BIG
				);

				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.uploadFromUrl.mockRejectedValue(responseError);

				setupFileStorageNotifier();

				return {
					parentId,
					parentType,
					file,
					responseError,
				};
			};

			it("should call showFileTooBigError and pass error", async () => {
				const { parentId, parentType, responseError } = setup();
				const { uploadFromUrl } = useFileStorageApi();

				await expect(
					uploadFromUrl("abc:/not-an-url", parentId, parentType)
				).rejects.toBe(responseError);
			});
		});
	});

	describe("rename", () => {
		describe("when file api rename file successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});

				const renameFileParams = {
					fileName: "new-file-name.txt",
				};

				const response = createMock<AxiosResponse<FileRecordResponse, unknown>>(
					{
						data: fileRecordResponse,
					}
				);

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.patchFilename.mockResolvedValueOnce(response);

				setupFileStorageNotifier();

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

				expect(fileApi.patchFilename).toBeCalledWith(
					fileRecordResponse.id,
					renameFileParams
				);
			});

			it("should set filerecord", async () => {
				const { parentId, fileRecordResponse, renameFileParams } = setup();
				const { rename, getFileRecord } = useFileStorageApi();

				await rename(fileRecordResponse.id, renameFileParams);

				const fileRecord = getFileRecord(parentId);
				expect(fileRecord.value).toStrictEqual(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const renameFileParams = {
					fileName: "new-file-name.txt",
				};

				const { responseError, expectedPayload } = setupErrorResponse(
					ErrorType.FILE_NAME_EXISTS
				);

				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);

				const fileApi = createMock<serverApi.FileApiInterface>();
				jest.spyOn(serverApi, "FileApiFactory").mockReturnValue(fileApi);
				fileApi.patchFilename.mockRejectedValue(responseError);

				const { showFileExistsError } = setupFileStorageNotifier();

				return {
					renameFileParams,
					showFileExistsError,
					responseError,
				};
			};

			it("should call showFileExistsError and pass error", async () => {
				const { renameFileParams, showFileExistsError, responseError } =
					setup();
				const { rename } = useFileStorageApi();

				await expect(rename("dfgdfg", renameFileParams)).rejects.toBe(
					responseError
				);

				expect(showFileExistsError).toBeCalled();
			});
		});
	});
});
