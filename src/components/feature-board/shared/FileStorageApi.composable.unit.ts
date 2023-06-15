import {
	FileRecordParentType,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { setupFileStorageFactoryMock } from "@@/tests/test-utils/api-mocks/fileStorageFactoryMock";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { useFileStorageApi } from "./FileStorageApi.composable";

jest.mock("@/store/store-accessor", () => ({
	authModule: {
		getUser: { schoolId: "schoolId" },
	},
}));

describe("FileStorageApi Composable", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	describe("fetchFiles", () => {
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

				return {
					parentId,
					parentType,
					fileRecordResponse,
					response,
					fileApiFactory,
				};
			};

			it("should call FileApiFactory.list", async () => {
				const { parentId, parentType, fileApiFactory } = setup();
				const { fetchFiles } = useFileStorageApi(parentId, parentType);

				await fetchFiles();

				expect(fileApiFactory.list).toBeCalledWith(
					"schoolId",
					parentId,
					parentType
				);
			});

			it("should return files", async () => {
				const { parentId, parentType, response } = setup();
				const { fetchFiles } = useFileStorageApi(parentId, parentType);

				const result = await fetchFiles();

				expect(result).toBe(response.data.data);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const error = { message: "WRONG ID", statusCode: "400" };

				const listMock = jest.fn().mockRejectedValueOnce(error);
				setupFileStorageFactoryMock({ listMock });

				return { parentId, parentType, error };
			};

			it("should set BusinessError", async () => {
				const { error, parentId, parentType } = setup();
				const { fetchFiles, businessError } = useFileStorageApi(
					parentId,
					parentType
				);

				await fetchFiles();

				expect(businessError.value).toBe(error);
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

			it("should return file", async () => {
				const { parentId, parentType, file, fileRecordResponse } = setup();
				const { upload } = useFileStorageApi(parentId, parentType);

				const result = await upload(file);

				expect(result).toBe(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const error = { message: "WRONG ID", statusCode: "400" };
				const file = new File([""], "filename");

				const uploadMock = jest.fn().mockRejectedValueOnce(error);
				setupFileStorageFactoryMock({ uploadMock });

				return { parentId, parentType, error, file };
			};

			it("should set BusinessError", async () => {
				const { error, parentId, parentType, file } = setup();
				const { upload, businessError } = useFileStorageApi(
					parentId,
					parentType
				);

				await upload(file);

				expect(businessError.value).toBe(error);
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

			it("should return file", async () => {
				const { parentId, parentType, fileRecordResponse, renameFileParams } =
					setup();
				const { rename } = useFileStorageApi(parentId, parentType);

				const result = await rename(fileRecordResponse.id, renameFileParams);

				expect(result).toBe(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const error = { message: "WRONG NAME", statusCode: "400" };
				const renameFileParams = {
					fileName: "new-file-name.txt",
				};

				const patchFilenameMock = jest.fn().mockRejectedValueOnce(error);
				setupFileStorageFactoryMock({
					patchFilenameMock,
				});
				return { error, renameFileParams, parentId, parentType };
			};

			it("should set BusinessError", async () => {
				const { error, renameFileParams, parentId, parentType } = setup();
				const { rename, businessError } = useFileStorageApi(
					parentId,
					parentType
				);

				await rename("dfgdfg", renameFileParams);

				expect(businessError.value).toBe(error);
			});
		});
	});

	describe("fetchFileRecursively", () => {
		beforeEach(() => {
			jest.useFakeTimers(); // <- use fake timer
		});

		afterEach(() => {
			jest.useRealTimers();
		});

		describe("when security check status is not pending right from the start", () => {
			const setup = () => {
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

				return { parentId, parentType, fileRecordResponse, fileApiFactory };
			};

			it("should call FileApiFactory.list only once", async () => {
				const { parentId, parentType, fileApiFactory } = setup();
				const { fetchFileRecursively } = useFileStorageApi(
					parentId,
					parentType
				);

				fetchFileRecursively()
					.then(() => {
						expect(fileApiFactory.list).toBeCalledWith(
							"schoolId",
							parentId,
							parentType
						);
						expect(fileApiFactory.list).toBeCalledTimes(1);
					})
					.catch(() => {
						// Do nothing!
					});

				jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval
				jest.runAllTicks(); // <- explicitly tell jest to run all Promise callback
			});

			it("should set files", async () => {
				const { parentId, parentType, fileRecordResponse } = setup();
				const { fetchFileRecursively } = useFileStorageApi(
					parentId,
					parentType
				);

				fetchFileRecursively()
					.then((fileRecord) => {
						expect(fileRecord).toBe(fileRecordResponse);
					})
					.catch(() => {
						// Do nothing!
					});

				jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval
				jest.runAllTicks(); // <- explicitly tell jest to run all Promise callback
			});
		});

		describe("when security check status changes in between", () => {
			const setup = () => {
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

				const { fileApiFactory } = setupFileStorageFactoryMock({});

				fileApiFactory.list
					.mockReturnValueOnce(responsePending)
					.mockReturnValueOnce(responsePending)
					.mockReturnValueOnce(responsePending)
					.mockReturnValueOnce(responseVerified);

				return {
					parentId,
					parentType,
					fileRecordResponseVerified,
					fileApiFactory,
				};
			};

			it("should call FileApiFactory.list four times", async () => {
				const { parentId, parentType, fileApiFactory } = setup();
				const { fetchFileRecursively } = useFileStorageApi(
					parentId,
					parentType
				);

				fetchFileRecursively()
					.then(() => {
						expect(fileApiFactory.list).toBeCalledWith(
							"schoolId",
							parentId,
							parentType
						);
						expect(fileApiFactory.list).toBeCalledTimes(4);
					})
					.catch(() => {
						// Do nothing!
					});

				jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval
				jest.runAllTicks(); // <- explicitly tell jest to run all Promise callback
			});

			it("should set files", async () => {
				const { parentId, parentType, fileRecordResponseVerified } = setup();
				const { fetchFileRecursively } = useFileStorageApi(
					parentId,
					parentType
				);

				fetchFileRecursively()
					.then((fileRecord) => {
						expect(fileRecord).toBe(fileRecordResponseVerified);
					})
					.catch(() => {
						// Do nothing!
					});

				jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval
				jest.runAllTicks(); // <- explicitly tell jest to run all Promise callback
			});
		});

		describe("when security check status is always pending", () => {
			const setup = () => {
				//const fileRecord: Ref<FileRecordResponse | undefined> = ref(undefined);
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});
				const response = {
					data: { data: [fileRecordResponse] },
				};

				const { fileApiFactory } = setupFileStorageFactoryMock({});
				fileApiFactory.list.mockImplementationOnce(() => response);

				return {
					//	fileRecord,
					parentId,
					parentType,
					fileRecordResponse,
					fileApiFactory,
				};
			};

			it("should call FileApiFactory.list six times", async () => {
				const { parentId, parentType, fileApiFactory } = setup();
				const { fetchFileRecursively } = useFileStorageApi(
					parentId,
					parentType
				);

				fetchFileRecursively()
					.then(() => {
						expect(fileApiFactory.list).toBeCalledWith(
							"schoolId",
							parentId,
							parentType
						);
						expect(fileApiFactory.list).toBeCalledTimes(6);
					})
					.catch(() => {
						// Do nothing!
					});

				jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval
				jest.runAllTicks(); // <- explicitly tell jest to run all Promise callback
			});

			it("should set files", () => {
				const { parentId, parentType, fileRecordResponse } = setup();
				const { fetchFileRecursively } = useFileStorageApi(
					parentId,
					parentType
				);

				fetchFileRecursively()
					.then((fileRecord) => {
						expect(fileRecord).toBe(fileRecordResponse);
					})
					.catch(() => {
						// Do nothing!
					});

				jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval
				jest.runAllTicks(); // <- explicitly tell jest to run all Promise callback
			});
		});
	});
});
