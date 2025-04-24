import { useFileStorageApi } from "@data-file";

interface Props {
	fetchFilesMock?: jest.Mock;
	renameMock?: jest.Mock;
	uploadMock?: jest.Mock;
	uploadFromUrlMock?: jest.Mock;
	getFileRecordsByParentIdMock?: jest.Mock;
}

export const setupFileStorageApiMock = (props: Props = {}) => {
	const {
		fetchFilesMock,
		renameMock,
		uploadMock,
		uploadFromUrlMock,
		getFileRecordsByParentIdMock,
	} = props;
	const mockedFileStorageApi = jest.mocked(useFileStorageApi);
	const getFileRecordsByParentId =
		getFileRecordsByParentIdMock ?? jest.fn(() => []);

	const fetchFiles = fetchFilesMock ?? jest.fn();
	const rename = renameMock ?? jest.fn();
	const upload = uploadMock ?? jest.fn();
	const uploadFromUrl = uploadFromUrlMock ?? jest.fn();

	const mocks = {
		fetchFiles,
		rename,
		upload,
		uploadFromUrl,
		getFileRecordsByParentId,
	};

	mockedFileStorageApi.mockReturnValue(mocks);

	return mocks;
};
