import {
	FileRecordParentType,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import { mapAxiosErrorToResponseError } from "@/utils/api";
import { delay } from "@/utils/helpers";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { setupFileStorageFactoryMock } from "@@/tests/test-utils/api-mocks/fileStorageFactoryMock";
import { setupFileStorageNotifier } from "@@/tests/test-utils/composable-mocks/fileStorageNotifier";
import { apiResponseErrorFactory } from "@@/tests/test-utils/factory/apiResponseErrorFactory";
import { axiosErrorFactory } from "@@/tests/test-utils/factory/axiosErrorFactory";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { ErrorType, useFileStorageApi } from "./FileStorageApi.composable";
jest.mock("./FileStorageNotifications.composable");

jest.mock("@/utils/helpers");

jest.mock("@/utils/api");
const mockedMapAxiosErrorToResponseError = jest.mocked(
	mapAxiosErrorToResponseError
);

jest.mock("@/store/store-accessor", () => ({
	authModule: {
		getUser: { schoolId: "schoolId" },
	},
}));

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

	describe("fetchFile", () => {
		describe("when file api returns list successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});
				const response = {
					data: { data: [fileRecordResponse] },
				};
				const listMock = jest.fn().mockResolvedValueOnce(response);
				const { fileApiFactory } = setupFileStorageFactoryMock({ listMock });
				const { getMaxFileSize, showFileTooBigError } =
					setupFileStorageNotifier();

				return {
					parentId,
					parentType,
					fileRecordResponse,
					response,
					fileApiFactory,
					getMaxFileSize,
					showFileTooBigError,
				};
			};

			it("should call FileApiFactory.list", async () => {
				const { parentId, parentType, fileApiFactory } = setup();
				const { fetchFile } = useFileStorageApi(parentId, parentType);

				await fetchFile();

				expect(fileApiFactory.list).toBeCalledWith(
					"schoolId",
					parentId,
					parentType
				);
			});

			it("should set filerecord", async () => {
				const { parentId, parentType, response } = setup();
				const { fetchFile, fileRecord } = useFileStorageApi(
					parentId,
					parentType
				);

				await fetchFile();

				expect(fileRecord.value).toBe(response.data.data[0]);
			});
		});

		describe("when file api returns error", () => {
			const setup = (message?: string) => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;

				const { responseError, expectedPayload } = setupErrorResponse(message);

				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);
				const listMock = jest.fn().mockRejectedValue(responseError);

				setupFileStorageFactoryMock({ listMock });

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
				const { fetchFile } = useFileStorageApi(parentId, parentType);
				await expect(fetchFile()).rejects.toBe(responseError);

				expect(showUnauthorizedError).toBeCalledTimes(1);
			});

			it("should call showForbiddenError and pass error", async () => {
				const { parentId, parentType, showForbiddenError, responseError } =
					setup(ErrorType.Forbidden);
				const { fetchFile } = useFileStorageApi(parentId, parentType);
				await expect(fetchFile()).rejects.toBe(responseError);

				expect(showForbiddenError).toBeCalledTimes(1);
			});

			it("should call showInternalServerError and pass error", async () => {
				const { parentId, parentType, showInternalServerError, responseError } =
					setup();
				const { fetchFile } = useFileStorageApi(parentId, parentType);
				await expect(fetchFile()).rejects.toBe(responseError);

				expect(showInternalServerError).toBeCalledTimes(1);
			});
		});
	});

	describe("upload", () => {
		describe("when file api uploads file successfully", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
					name: "filename",
				});
				const file = new File([""], "filename");
				const response = {
					data: fileRecordResponse,
				};

				const uploadMock = jest.fn().mockResolvedValueOnce(response);
				const { fileApiFactory } = setupFileStorageFactoryMock({ uploadMock });
				setupFileStorageNotifier();

				return {
					parentId,
					parentType,
					fileRecordResponse,
					file,
					fileApiFactory,
				};
			};

			it("should call FileApiFactory.upload", async () => {
				const { parentId, parentType, file, fileApiFactory } = setup();
				const { upload } = useFileStorageApi(parentId, parentType);

				await upload(file);

				expect(fileApiFactory.upload).toBeCalledWith(
					"schoolId",
					parentId,
					parentType,
					file
				);
			});

			it("should set filerecord", async () => {
				const { parentId, parentType, file, fileRecordResponse } = setup();
				const { upload, fileRecord } = useFileStorageApi(parentId, parentType);

				await upload(file);

				expect(fileRecord.value).toBe(fileRecordResponse);
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

				const uploadMock = jest.fn().mockRejectedValue(responseError);
				setupFileStorageFactoryMock({ uploadMock });

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
				const { upload } = useFileStorageApi(parentId, parentType);

				await expect(upload(file)).rejects.toBe(responseError);

				expect(showFileTooBigError).toBeCalled();
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

				const response = {
					data: fileRecordResponse,
				};

				const patchFilenameMock = jest.fn().mockResolvedValueOnce(response);
				const { fileApiFactory } = setupFileStorageFactoryMock({
					patchFilenameMock,
				});

				setupFileStorageNotifier();

				return {
					parentId,
					parentType,
					fileRecordResponse,
					renameFileParams,
					fileApiFactory,
				};
			};

			it("should call FileApiFactory.patchFilename", async () => {
				const {
					fileRecordResponse,
					renameFileParams,
					parentId,
					parentType,
					fileApiFactory,
				} = setup();
				const { rename } = useFileStorageApi(parentId, parentType);

				await rename(fileRecordResponse.id, renameFileParams);

				expect(fileApiFactory.patchFilename).toBeCalledWith(
					fileRecordResponse.id,
					renameFileParams
				);
			});

			it("should set filerecord", async () => {
				const { parentId, parentType, fileRecordResponse, renameFileParams } =
					setup();
				const { rename, fileRecord } = useFileStorageApi(parentId, parentType);

				await rename(fileRecordResponse.id, renameFileParams);

				expect(fileRecord.value).toBe(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const renameFileParams = {
					fileName: "new-file-name.txt",
				};

				const { responseError, expectedPayload } = setupErrorResponse(
					ErrorType.FILE_NAME_EXISTS
				);

				mockedMapAxiosErrorToResponseError.mockReturnValue(expectedPayload);

				const patchFilenameMock = jest.fn().mockRejectedValue(responseError);
				setupFileStorageFactoryMock({
					patchFilenameMock,
				});

				const { showFileExistsError } = setupFileStorageNotifier();

				return {
					renameFileParams,
					parentId,
					parentType,
					showFileExistsError,
					responseError,
				};
			};

			it("should call showFileExistsError and pass error", async () => {
				const {
					renameFileParams,
					parentId,
					parentType,
					showFileExistsError,
					responseError,
				} = setup();
				const { rename } = useFileStorageApi(parentId, parentType);

				await expect(rename("dfgdfg", renameFileParams)).rejects.toBe(
					responseError
				);

				expect(showFileExistsError).toBeCalled();
			});
		});
	});

	describe("fetchPendingFileRecursively", () => {
		beforeEach(() => {
			jest.useFakeTimers(); // <- use fake timer
		});

		afterEach(() => {
			jest.useRealTimers();
			jest.resetAllMocks();
		});

		describe("when file record is undefined", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;

				const { fileApiFactory } = setupFileStorageFactoryMock({});

				setupFileStorageNotifier();

				return { parentId, parentType, fileApiFactory };
			};

			it("should not call fetchFiles", async () => {
				const { parentId, parentType, fileApiFactory } = setup();
				const { fetchPendingFileRecursively } = useFileStorageApi(
					parentId,
					parentType
				);

				await fetchPendingFileRecursively();

				expect(fileApiFactory.list).not.toBeCalled();
			});
		});

		describe("when security check status is not pending right from the start", () => {
			const setup = async () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
					securityCheckStatus: FileRecordScanStatus.VERIFIED,
				});
				const response = {
					data: { data: [fileRecordResponse] },
				};
				const { fileApiFactory } = setupFileStorageFactoryMock({});
				fileApiFactory.list.mockImplementationOnce(() => response);
				setupFileStorageNotifier();

				const { fetchPendingFileRecursively, fetchFile, fileRecord } =
					useFileStorageApi(parentId, parentType);
				await fetchFile();
				fileApiFactory.list.mockClear();

				return {
					fileApiFactory,
					fetchPendingFileRecursively,
					fileRecord,
				};
			};

			it("should not call fetchFiles", async () => {
				const { fileApiFactory, fetchPendingFileRecursively } = await setup();

				await fetchPendingFileRecursively();

				expect(fileApiFactory.list).not.toBeCalled();
			});
		});

		describe("when security check status changes in between", () => {
			const setup = async () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponsePending = fileRecordResponseFactory.build({
					parentId,
					parentType,
					securityCheckStatus: FileRecordScanStatus.PENDING,
				});
				const fileRecordResponseVerified = fileRecordResponseFactory.build({
					parentId,
					parentType,
					securityCheckStatus: FileRecordScanStatus.VERIFIED,
				});
				const responsePending = {
					data: { data: [fileRecordResponsePending] },
				};
				const responseVerified = {
					data: { data: [fileRecordResponseVerified] },
				};

				setupFileStorageNotifier();

				const { fileApiFactory } = setupFileStorageFactoryMock({});

				jest
					.mocked(delay)
					.mockResolvedValueOnce(null)
					.mockResolvedValueOnce(null);

				fileApiFactory.list
					.mockResolvedValueOnce(responsePending)
					.mockResolvedValueOnce(responsePending)
					.mockResolvedValueOnce(responseVerified);

				const { fetchPendingFileRecursively, fetchFile, fileRecord } =
					useFileStorageApi(parentId, parentType);

				await fetchFile();
				fileApiFactory.list.mockClear();

				return {
					parentId,
					parentType,
					fileRecordResponseVerified,
					fileApiFactory,
					fetchPendingFileRecursively,
					fileRecord,
				};
			};

			it("should call FileApiFactory.list 2 times", async () => {
				const {
					parentId,
					parentType,
					fileApiFactory,
					fetchPendingFileRecursively,
				} = await setup();

				await fetchPendingFileRecursively();

				expect(fileApiFactory.list).toBeCalledWith(
					"schoolId",
					parentId,
					parentType
				);
				expect(fileApiFactory.list).toBeCalledTimes(2);
			});

			it("should call delay 2 times", async () => {
				const { fetchPendingFileRecursively } = await setup();

				await fetchPendingFileRecursively();

				expect(delay).toHaveBeenCalledWith(10000);
				expect(delay).toBeCalledTimes(2);
			});

			it("should set filerecord", async () => {
				const {
					fileRecordResponseVerified,
					fetchPendingFileRecursively,
					fileRecord,
				} = await setup();

				await fetchPendingFileRecursively();

				expect(fileRecord.value).toBe(fileRecordResponseVerified);
			});
		});

		describe("when security check status is always pending", () => {
			const setup = async () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});
				const response = {
					data: { data: [fileRecordResponse] },
				};

				setupFileStorageNotifier();

				jest
					.mocked(delay)
					.mockResolvedValueOnce(null)
					.mockResolvedValueOnce(null)
					.mockResolvedValueOnce(null)
					.mockResolvedValueOnce(null)
					.mockResolvedValueOnce(null)
					.mockResolvedValueOnce(null);

				const { fileApiFactory } = setupFileStorageFactoryMock({});
				fileApiFactory.list
					.mockResolvedValueOnce(response)
					.mockResolvedValueOnce(response)
					.mockResolvedValueOnce(response)
					.mockResolvedValueOnce(response)
					.mockResolvedValueOnce(response)
					.mockResolvedValueOnce(response);

				const { fetchPendingFileRecursively, fetchFile, fileRecord } =
					useFileStorageApi(parentId, parentType);

				await fetchFile();
				fileApiFactory.list.mockClear();

				return {
					parentId,
					parentType,
					fileRecordResponse,
					fileApiFactory,
					fetchPendingFileRecursively,
					fileRecord,
				};
			};

			it("should call FileApiFactory.list 6 times", async () => {
				const {
					parentId,
					parentType,
					fileApiFactory,
					fetchPendingFileRecursively,
				} = await setup();

				await fetchPendingFileRecursively();

				expect(fileApiFactory.list).toBeCalledWith(
					"schoolId",
					parentId,
					parentType
				);
				expect(fileApiFactory.list).toBeCalledTimes(6);
			});

			it("should set filerecord", async () => {
				const { fileRecordResponse, fetchPendingFileRecursively, fileRecord } =
					await setup();

				await fetchPendingFileRecursively();

				expect(fileRecord.value).toBe(fileRecordResponse);
			});
		});

		describe("when fileApiFactory.list returns error", () => {
			const setup = async () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});
				const response = {
					data: { data: [fileRecordResponse] },
				};
				const error = new Error("error");

				setupFileStorageNotifier();

				jest.mocked(delay).mockResolvedValueOnce(null);

				const { fileApiFactory } = setupFileStorageFactoryMock({});

				fileApiFactory.list
					.mockResolvedValueOnce(response)
					.mockRejectedValueOnce(error);

				const { fetchPendingFileRecursively, fetchFile } = useFileStorageApi(
					parentId,
					parentType
				);

				await fetchFile();
				fileApiFactory.list.mockClear();

				return {
					fileApiFactory,
					fetchPendingFileRecursively,
				};
			};

			it("should call FileApiFactory.list 1 time", async () => {
				const { fileApiFactory, fetchPendingFileRecursively } = await setup();

				await fetchPendingFileRecursively();

				expect(fileApiFactory.list).toBeCalledTimes(1);
			});
		});
	});
});
