import { useFileStorageApi } from "@/components/feature-board/shared/FileStorageApi.composable";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { jest } from "@jest/globals";
import { ref } from "vue";

interface Props {
	fetchFileMock?: jest.Mock;
	fetchPendingFileRecursivelyMock?: jest.Mock;
	renameMock?: jest.Mock;
	uploadMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props = {}) => {
	const {
		fetchFileMock,
		fetchPendingFileRecursivelyMock,
		renameMock,
		uploadMock,
	} = props;
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);
	const fileRecord = ref<FileRecordResponse>();

	const fetchFile = fetchFileMock ?? jest.fn();
	const fetchPendingFileRecursively =
		fetchPendingFileRecursivelyMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();

	const mocks = {
		fetchFile,
		fetchPendingFileRecursively,
		rename,
		upload,
		fileRecord,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
