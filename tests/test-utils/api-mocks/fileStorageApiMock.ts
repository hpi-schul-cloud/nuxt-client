import { FileRecordResponse } from "@/fileStorageApi/v3";
import { useFileStorageApi } from "@feature-board-file-element";
import { Jest as jest } from "@jest/environment";
import { ref } from "vue";

interface Props {
	fetchFileMock?: jest.Mock;
	renameMock?: jest.Mock;
	uploadMock?: jest.Mock;
	uploadFromUrlMock?: jest.Mock;
	getFileRecordMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props = {}) => {
	const {
		fetchFileMock,
		renameMock,
		uploadMock,
		uploadFromUrlMock,
		getFileRecordMock,
	} = props;
	const mockedFileStorageApi = vi.mocked(useFileStorageApi);
	const getFileRecord =
		getFileRecordMock ?? vi.fn(() => ref<FileRecordResponse>());

	const fetchFile = fetchFileMock ?? vi.fn();
	const rename = renameMock ?? vi.fn();
	const upload = uploadMock ?? vi.fn();
	const uploadFromUrl = uploadFromUrlMock ?? vi.fn();

	const mocks = {
		fetchFile,
		rename,
		upload,
		uploadFromUrl,
		getFileRecord,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
