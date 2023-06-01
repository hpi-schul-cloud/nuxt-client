import { FileApiFactory, FileRecordParentType } from "@/fileStorageApi/v3";
import { fileRecordResponseFactory } from "@@/tests/test-utils/factory/filerecordResponse.factory";
import { useFileStorageApi } from "./FileStorageApi.composable";
jest.mock("@/fileStorageApi/v3");
jest.mock("@/store/store-accessor", () => ({
	authModule: {
		getUser: { schoolId: "schoolId" },
	},
}));

describe("FileStorageApi Composable", () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	const setupFileApiFactoryMock = () => {
		const mockedFileApiFactory = jest.mocked(FileApiFactory);
		const copy = jest.fn();
		const copyFile = jest.fn();
		const deleteByParent = jest.fn();
		const deleteFile = jest.fn();
		const list = jest.fn();
		const patchFilename = jest.fn();
		const restore = jest.fn();
		const restoreFile = jest.fn();
		const uploadFromUrl = jest.fn();
		const download = jest.fn();
		const upload = jest.fn();

		mockedFileApiFactory.mockReturnValueOnce({
			copy,
			copyFile,
			deleteByParent,
			deleteFile,
			list,
			patchFilename,
			restore,
			restoreFile,
			uploadFromUrl,
			download,
			upload,
		});

		return { upload, list };
	};

	describe("fetchFiles", () => {
		describe("when params are correctly", () => {
			const setup = () => {
				const parentId = "456";
				const parentType = FileRecordParentType.BOARDNODES;
				const fileRecordResponse = fileRecordResponseFactory.build({
					parentId,
					parentType,
				});
				const { list } = setupFileApiFactoryMock();

				return { list, parentId, parentType, fileRecordResponse };
			};

			it("should call FileApiFactory.list", async () => {
				const { list, parentId, parentType, fileRecordResponse } = setup();
				const { fetchFiles, getFile } = useFileStorageApi();
				list.mockResolvedValueOnce({ data: { data: [fileRecordResponse] } });

				await fetchFiles(parentId, parentType);

				expect(list).toBeCalledWith("schoolId", parentId, parentType);
				expect(getFile(parentId)).toBe(fileRecordResponse);
				list.mockRestore();
			});

			it.skip("should set files", async () => {
				const { parentId, parentType, fileRecordResponse, list } = setup();
				const { fetchFiles, getFile } = useFileStorageApi();

				list.mockResolvedValueOnce({ data: { data: [fileRecordResponse] } });

				await fetchFiles(parentId, parentType);

				expect(getFile(parentId)).toBe(fileRecordResponse);
			});
		});

		describe("when list returns error", () => {
			const setup = () => {
				const parentId = "456";
				const parentType = FileRecordParentType.BOARDNODES;
				const error = { message: "WRONG ID", statusCode: "400" };

				const { list } = setupFileApiFactoryMock();

				list.mockRejectedValueOnce(error);

				return { list, parentId, parentType, error };
			};

			it("should set BusinessError", async () => {
				const { error, parentId, parentType } = setup();
				const { fetchFiles, businessError } = useFileStorageApi();
				await fetchFiles(parentId, parentType);

				expect(businessError.value).toBe(error);
			});
		});
	});
});
