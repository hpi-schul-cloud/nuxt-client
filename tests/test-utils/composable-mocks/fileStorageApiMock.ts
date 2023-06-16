import { useFileStorageApi } from "@/components/feature-board/shared/FileStorageApi.composable";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { BusinessError } from "@/store/types/commons";
import { jest } from "@jest/globals";
import { ref } from "vue";

interface Props {
	uploadMock?: jest.Mock;
	fetchFileMock?: jest.Mock;
	fetchPendingFileRecursivelyMock?: jest.Mock;
	renameMock?: jest.Mock;
	getFileMock?: jest.Mock;
	refreshFileMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props = {}) => {
	const {
		fetchFileMock,
		fetchPendingFileRecursivelyMock,
		renameMock,
		uploadMock,
		getFileMock,
		refreshFileMock,
	} = props;
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);
	const fileRecord = ref<FileRecordResponse>();

	const fetchFile = fetchFileMock ?? jest.fn();
	const fetchPendingFileRecursively =
		fetchPendingFileRecursivelyMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();
	const getFile = getFileMock ?? jest.fn();
	const refreshFile = refreshFileMock ?? jest.fn();

	const businessError = ref<BusinessError>({
		statusCode: "",
		message: "",
	});

	const mocks = {
		fetchFile,
		fetchPendingFileRecursively,
		rename,
		upload,
		getFile,
		refreshFile,
		businessError,
		fileRecord,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
