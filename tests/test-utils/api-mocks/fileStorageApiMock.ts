import { FileRecordResponse } from "@/fileStorageApi/v3";
import { useFileStorageApi } from "@feature-board-file-element";
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
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);
	const getFileRecord =
		getFileRecordMock ?? jest.fn(() => ref<FileRecordResponse>());

	const fetchFile = fetchFileMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();
	const uploadFromUrl = uploadFromUrlMock ?? jest.fn();

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
