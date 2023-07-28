import { useFileStorageApi } from "@/components/feature-board/shared/FileStorageApi.composable";
import { FileRecordResponse } from "@/fileStorageApi/v3";
import { jest } from "@jest/globals";
import { ref } from "vue";

interface Props {
	fetchFileMock?: jest.Mock;
	renameMock?: jest.Mock;
	uploadMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props = {}) => {
	const { fetchFileMock, renameMock, uploadMock } = props;
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);
	const fileRecord = ref<FileRecordResponse>();

	const fetchFile = fetchFileMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();

	const mocks = {
		fetchFile,
		rename,
		upload,
		fileRecord,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
