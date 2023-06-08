import * as fileStorageApi from "@/fileStorageApi/v3/api/file-api";
import { jest } from "@jest/globals";

jest.mock("axios");

export const setupFileStorageFactoryMock = () => {
	const fileApiFactory = {
		list: jest.fn(),
		copy: jest.fn(),
		rename: jest.fn(),
		copyFilesOfParentParams: jest.fn(),
		uploadFromUrl: jest.fn(),
		upload: jest.fn(),

		copyFile: jest.fn(),
		deleteByParent: jest.fn(),
		deleteFile: jest.fn(),
		download: jest.fn(),

		patchFilename: jest.fn(),
		restore: jest.fn(),
		restoreFile: jest.fn(),
	};

	jest
		.spyOn(fileStorageApi, "FileApiFactory")
		.mockReturnValue(
			fileApiFactory as unknown as fileStorageApi.FileApiInterface
		);

	return { fileApiFactory };
};
