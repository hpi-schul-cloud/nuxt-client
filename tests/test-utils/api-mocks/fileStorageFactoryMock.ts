import * as fileStorageApi from "@/fileStorageApi/v3/api/file-api";
import { jest } from "@jest/globals";

jest.mock("axios");

interface Props {
	listMock?: jest.Mock;
	copyMock?: jest.Mock;
	renameMock?: jest.Mock;
	copyFilesOfParentParamsMock?: jest.Mock;
	uploadFromUrlMock?: jest.Mock;
	uploadMock?: jest.Mock;
	copyFileMock?: jest.Mock;
	deleteByParentMock?: jest.Mock;
	deleteFileMock?: jest.Mock;
	downloadMock?: jest.Mock;
	patchFilenameMock?: jest.Mock;
	restoreMock?: jest.Mock;
	restoreFileMock?: jest.Mock;
}

export const setupFileStorageFactoryMock = (props: Props) => {
	const {
		listMock,
		copyMock,
		renameMock,
		copyFilesOfParentParamsMock,
		uploadFromUrlMock,
		uploadMock,
		copyFileMock,
		deleteByParentMock,
		deleteFileMock,
		downloadMock,
		patchFilenameMock,
		restoreMock,
		restoreFileMock,
	} = props;

	const fileApiFactory = {
		list: listMock ?? jest.fn(),
		copy: copyMock ?? jest.fn(),
		rename: renameMock ?? jest.fn(),
		copyFilesOfParentParams: copyFilesOfParentParamsMock ?? jest.fn(),
		uploadFromUrl: uploadFromUrlMock ?? jest.fn(),
		upload: uploadMock ?? jest.fn(),

		copyFile: copyFileMock ?? jest.fn(),
		deleteByParent: deleteByParentMock ?? jest.fn(),
		deleteFile: deleteFileMock ?? jest.fn(),
		download: downloadMock ?? jest.fn(),

		patchFilename: patchFilenameMock ?? jest.fn(),
		restore: restoreMock ?? jest.fn(),
		restoreFile: restoreFileMock ?? jest.fn(),
	};

	jest
		.spyOn(fileStorageApi, "FileApiFactory")
		.mockReturnValue(
			fileApiFactory as unknown as fileStorageApi.FileApiInterface
		);

	return { fileApiFactory };
};
