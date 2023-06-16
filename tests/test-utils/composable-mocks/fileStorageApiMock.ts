import { useFileStorageApi } from "@/components/feature-board/shared/FileStorageApi.composable";
import { BusinessError } from "@/store/types/commons";
import { jest } from "@jest/globals";
import { ref } from "vue";

interface Props {
	uploadMock?: jest.Mock;
	fetchFilesMock?: jest.Mock;
	fetchFileRecursivelyMock?: jest.Mock;
	renameMock?: jest.Mock;
	getFileMock?: jest.Mock;
	refreshFileMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props = {}) => {
	const {
		fetchFilesMock,
		fetchFileRecursivelyMock,
		renameMock,
		uploadMock,
		getFileMock,
		refreshFileMock,
	} = props;
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);

	const fetchFiles = fetchFilesMock ?? jest.fn();
	const fetchFileRecursively = fetchFileRecursivelyMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();
	const getFile = getFileMock ?? jest.fn();
	const refreshFile = refreshFileMock ?? jest.fn();

	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});

	const mocks = {
		fetchFiles,
		fetchFileRecursively,
		rename,
		upload,
		getFile,
		refreshFile,
		businessError,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
