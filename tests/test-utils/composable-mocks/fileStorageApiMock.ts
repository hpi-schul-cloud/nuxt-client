import { useFileStorageApi } from "@/components/feature-board/shared/FileStorageApi.composable";
import { reactive, ref } from "vue";
import { jest } from "@jest/globals";
import { BusinessError } from "@/store/types/commons";

interface Props {
	uploadMock?: jest.Mock;
	downloadMock?: jest.Mock;
	fetchFilesMock?: jest.Mock;
	renameMock?: jest.Mock;
	getFileMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props) => {
	const { downloadMock, fetchFilesMock, renameMock, uploadMock, getFileMock } =
		props;
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);
	const download = downloadMock ?? jest.fn();
	const fetchFiles = fetchFilesMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();
	const getFile = getFileMock ?? jest.fn();

	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});
	const fileRecords = reactive({});
	const newFileForParent = ref("");

	const mocks = {
		download,
		fetchFiles,
		rename,
		upload,
		getFile,
		businessError,
		fileRecords,
		newFileForParent,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
