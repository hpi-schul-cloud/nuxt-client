import { useFileStorageApi } from "@/components/feature-board/shared/FileStorageApi.composable";
import { BusinessError } from "@/store/types/commons";
import { jest } from "@jest/globals";
import { ref } from "vue";

interface Props {
	uploadMock?: jest.Mock;
	fetchFilesMock?: jest.Mock;
	renameMock?: jest.Mock;
	getFileMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props) => {
	const { fetchFilesMock, renameMock, uploadMock, getFileMock } = props;
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);

	const fetchFiles = fetchFilesMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();
	const getFile = getFileMock ?? jest.fn();

	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});

	const mocks = {
		fetchFiles,
		rename,
		upload,
		getFile,
		businessError,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
