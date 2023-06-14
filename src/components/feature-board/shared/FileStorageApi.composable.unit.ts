import {
	FileRecordParentType,
	FileRecordScanStatus,
} from "@/fileStorageApi/v3";
import * as fileHelper from "@/utils/fileHelper";
import { ObjectIdMock } from "@@/tests/test-utils/ObjectIdMock";
import { setupFileStorageFactoryMock } from "@@/tests/test-utils/api-mocks/fileStorageFactoryMock";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { useFileStorageApi } from "./FileStorageApi.composable";

jest.mock("@/store/store-accessor", () => ({
	authModule: {
		getUser: { schoolId: "schoolId" },
	},
}));

const { fileApiFactory } = setupFileStorageFactoryMock();

describe("FileStorageApi Composable", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

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

		fileApiFactory.list.mockImplementationOnce(() => response);

		return { parentId, parentType, fileRecordResponse };
	};

	describe("fetchFiles", () => {
		describe("when file api returns list successfully", () => {
			it("should call FileApiFactory.list", async () => {
				const { parentId, parentType } = setup();
				const { fetchFiles } = useFileStorageApi();

				await fetchFiles(parentId, parentType);

				expect(fileApiFactory.list).toBeCalledWith(
					"schoolId",
					parentId,
					parentType
				);
			});

			it("should set files", async () => {
				const { parentId, parentType, fileRecordResponse } = setup();
				const { fetchFiles, getFile } = useFileStorageApi();

				await fetchFiles(parentId, parentType);

				expect(getFile(parentId)).toBe(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const error = { message: "WRONG ID", statusCode: "400" };

				fileApiFactory.list.mockRejectedValueOnce(error);

				return { parentId, parentType, error };
			};

			it("should set BusinessError", async () => {
				const { error, parentId, parentType } = setup();
				const { fetchFiles, businessError } = useFileStorageApi();

				await fetchFiles(parentId, parentType);

				expect(businessError.value).toBe(error);
			});
		});
	});

	describe("upload", () => {
		describe("when file api upload file successfully", () => {
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

				fileApiFactory.upload.mockImplementationOnce(() => response);

				return { parentId, parentType, fileRecordResponse, file };
			};

			it("should call FileApiFactory.upload", async () => {
				const { parentId, parentType, file } = setup();
				const { upload } = useFileStorageApi();

				await upload(parentId, parentType, file);

				expect(fileApiFactory.upload).toBeCalledWith(
					"schoolId",
					parentId,
					parentType,
					file
				);
			});

			it("should set file", async () => {
				const { parentId, parentType, file, fileRecordResponse } = setup();
				const { upload, getFile } = useFileStorageApi();

				await upload(parentId, parentType, file);

				expect(getFile(parentId)).toBe(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const parentId = ObjectIdMock();
				const parentType = FileRecordParentType.BOARDNODES;
				const error = { message: "WRONG ID", statusCode: "400" };
				const file = new File([""], "filename");

				fileApiFactory.upload.mockRejectedValueOnce(error);

				return { parentId, parentType, error, file };
			};

			it("should set BusinessError", async () => {
				const { error, parentId, parentType, file } = setup();
				const { upload, businessError } = useFileStorageApi();

				await upload(parentId, parentType, file);

				expect(businessError.value).toBe(error);
			});
		});
	});

	describe("download", () => {
		describe("when file api download file successfully", () => {
			const setup = () => {
				const fileRecordResponse = fileRecordResponseFactory.build();
				const downloadFileHelper = jest.spyOn(fileHelper, "downloadFile");

				const response = {};

				fileApiFactory.download.mockImplementationOnce(() => response);

				return { fileRecordResponse, downloadFileHelper };
			};

			it("should call FileApiFactory.download", async () => {
				const { fileRecordResponse } = setup();
				const { download } = useFileStorageApi();

				await download(fileRecordResponse);

				expect(fileApiFactory.download).toBeCalledWith(
					fileRecordResponse.id,
					fileRecordResponse.name,
					{ responseType: "blob" }
				);
			});

			it("should call downloadFileHelper", async () => {
				const { fileRecordResponse, downloadFileHelper } = setup();
				const { download } = useFileStorageApi();

				await download(fileRecordResponse);

				expect(downloadFileHelper).toBeCalled();
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const error = { message: "WRONG ID", statusCode: "400" };
				const fileRecordResponse = fileRecordResponseFactory.build();

				fileApiFactory.download.mockRejectedValueOnce(error);

				return { error, fileRecordResponse };
			};

			it("should set BusinessError", async () => {
				const { error, fileRecordResponse } = setup();
				const { download, businessError } = useFileStorageApi();
				await download(fileRecordResponse);

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

				fileApiFactory.patchFilename.mockImplementationOnce(() => response);

				return { parentId, fileRecordResponse, renameFileParams };
			};

			it("should call FileApiFactory.patchFilename", async () => {
				const { fileRecordResponse, renameFileParams } = setup();
				const { rename } = useFileStorageApi();

				await rename(fileRecordResponse.id, renameFileParams);

				expect(fileApiFactory.patchFilename).toBeCalledWith(
					fileRecordResponse.id,
					renameFileParams
				);
			});

			it("should set file", async () => {
				const { parentId, fileRecordResponse, renameFileParams } = setup();
				const { rename, getFile } = useFileStorageApi();

				await rename(fileRecordResponse.id, renameFileParams);

				expect(getFile(parentId)).toBe(fileRecordResponse);
			});
		});

		describe("when file api returns error", () => {
			const setup = () => {
				const error = { message: "WRONG NAME", statusCode: "400" };
				const renameFileParams = {
					fileName: "new-file-name.txt",
				};

				fileApiFactory.patchFilename.mockRejectedValueOnce(error);

				return { error, renameFileParams };
			};

			it("should set BusinessError", async () => {
				const { error, renameFileParams } = setup();
				const { rename, businessError } = useFileStorageApi();

				await rename("dfgdfg", renameFileParams);

				expect(businessError.value).toBe(error);
			});
		});
	});

	describe("refreshFile", () => {
		it("should call FileApiFactory.list", async () => {
			const { parentId, parentType } = setup();
			const { refreshFile } = useFileStorageApi();

			await refreshFile(parentId, parentType);

			expect(fileApiFactory.list).toBeCalledWith(
				"schoolId",
				parentId,
				parentType
			);
		});

		it("should set files", async () => {
			const { parentId, parentType, fileRecordResponse } = setup();
			const { refreshFile } = useFileStorageApi();

			expect(await refreshFile(parentId, parentType)).toBe(fileRecordResponse);
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

				fileApiFactory.list.mockImplementationOnce(() => response);

				return { parentId, parentType, fileRecordResponse };
			};

			it("should call FileApiFactory.list only once", async () => {
				const { parentId, parentType } = setup();
				const { fetchFileRecursively } = useFileStorageApi();

				fetchFileRecursively(parentId, parentType)
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
				const { fetchFileRecursively } = useFileStorageApi();

				fetchFileRecursively(parentId, parentType)
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
				const fileRecordResponseVerfied = fileRecordResponseFactory.build({
					parentId,
					parentType,
					securityCheckStatus: FileRecordScanStatus.VERIFIED,
				});
				const responsePending = {
					data: { data: [fileRecordResponsePending] },
				};
				const responseVerified = {
					data: { data: [fileRecordResponseVerfied] },
				};

				fileApiFactory.list
					.mockReturnValueOnce(responsePending)
					.mockReturnValueOnce(responsePending)
					.mockReturnValueOnce(responsePending)
					.mockReturnValueOnce(responseVerified);

				return { parentId, parentType, fileRecordResponseVerfied };
			};

			it("should call FileApiFactory.list four times", async () => {
				const { parentId, parentType } = setup();
				const { fetchFileRecursively } = useFileStorageApi();

				fetchFileRecursively(parentId, parentType)
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
				const { parentId, parentType, fileRecordResponseVerfied } = setup();
				const { fetchFileRecursively } = useFileStorageApi();

				fetchFileRecursively(parentId, parentType)
					.then((fileRecord) => {
						expect(fileRecord).toBe(fileRecordResponseVerfied);
					})
					.catch(() => {
						// Do nothing!
					});

				jest.runAllTimers(); // <- explicitly tell jest to run all setTimeout, setInterval
				jest.runAllTicks(); // <- explicitly tell jest to run all Promise callback
			});
		});

		describe("when security check status is always pending", () => {
			it("should call FileApiFactory.list six times", async () => {
				const { parentId, parentType } = setup();
				const { fetchFileRecursively } = useFileStorageApi();

				fetchFileRecursively(parentId, parentType)
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
				const { fetchFileRecursively } = useFileStorageApi();

				fetchFileRecursively(parentId, parentType)
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
