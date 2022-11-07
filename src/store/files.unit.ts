import FilesModule from "@store/files";
import { FileMetaListResponse } from "@/serverApi/v3/files/file-meta-list.response";
import { File, FileIcon, FileType } from "@store/types/file";
import {
	FileMetaResponse,
	FileTypeResponse,
} from "@/serverApi/v3/files/file-meta.response";
import { FileResponseMapper } from "@/serverApi/v3/files/file-response.mapper";

describe("Files module", () => {
	let filesModule: FilesModule;

	beforeEach(() => {
		filesModule = new FilesModule({});
	});

	function setup() {
		const setLoadingSpy = jest.spyOn(filesModule, "setLoading");
		const addFileMetaDataSpy = jest.spyOn(filesModule, "addFileMetaData");
		const fileResponseMapperSpy = jest.spyOn(
			FileResponseMapper,
			"mapFileMetaListResponse"
		);
		const mockFile: File = {
			name: "name",
			size: 123,
			lastChanged: new Date(2022, 1, 1),
			type: FileType.SHARED_DIRECTORY,
			icon: FileIcon.SHARED_FOLDER,
			path: "/root/path",
			translationKey: "translation.key.test",
		};
		const mockFileMetaListResponse: FileMetaListResponse = {
			size: 2,
			data: [
				{
					id: "8484841",
					path: "/cfiles/teams/Lehrerzimmer/Fotos",
					type: FileTypeResponse.DIRECTORY,
					size: 1234,
					name: "Fotos",
					lastChanged: new Date(2022, 11, 4, 10, 16),
				},
				{
					id: "2371272n12",
					path: "/cfiles/teams/Lehrerzimmer/Klassenbuch.txt",
					type: FileTypeResponse.FILE,
					size: 23939,
					name: "Klassenbuch.txt",
					lastChanged: new Date(2022, 11, 4, 15, 16),
				},
			],
		};
		return {
			setLoadingSpy,
			addFileMetaDataSpy,
			fileResponseMapperSpy,
			mockFile,
			mockFileMetaListResponse,
		};
	}

	describe("getFiles", () => {
		it("should return files from store", async () => {
			const { mockFile } = setup();
			filesModule.files[0] = mockFile;

			const files: File[] = await filesModule.getFiles;

			expect(files[0]).toEqual(mockFile);
		});
	});

	describe("fetchFilesOverview", () => {
		it("should set the fetched files to store", async () => {
			await filesModule.fetchFilesOverview();

			expect(filesModule.files.length).toBeGreaterThan(0);
		});
	});

	describe("fetchTeams", () => {
		it("should set loading to true and after success to false", async () => {
			const { setLoadingSpy } = setup();

			await filesModule.fetchTeams();

			expect(setLoadingSpy).toHaveBeenCalledWith(true);
			expect(setLoadingSpy).toHaveBeenCalledWith(false);
		});

		it("should set loading to false when an error was thrown", async () => {
			const { addFileMetaDataSpy } = setup();
			addFileMetaDataSpy.mockImplementation(() => {
				throw new Error();
			});

			await filesModule.fetchTeams();

			expect(filesModule.loading).toBeFalsy();
		});

		it("should add files to store after fetching them from api", async () => {
			const { addFileMetaDataSpy } = setup();

			await filesModule.fetchTeams();

			expect(addFileMetaDataSpy).toHaveBeenCalledWith(
				expect.objectContaining<FileMetaListResponse>({
					size: 2,
				} as FileMetaListResponse)
			);
		});
	});

	describe("fetchTeamFiles", () => {
		it("should set loading to true and after success to false", async () => {
			const { setLoadingSpy } = setup();

			await filesModule.fetchTeamFiles("/path");

			expect(setLoadingSpy).toHaveBeenCalledWith(true);
			expect(setLoadingSpy).toHaveBeenCalledWith(false);
		});

		it("should set loading to false when an error was thrown", async () => {
			const { addFileMetaDataSpy } = setup();
			addFileMetaDataSpy.mockImplementation(() => {
				throw new Error();
			});

			await filesModule.fetchTeamFiles("/path");

			expect(filesModule.loading).toBeFalsy();
		});

		it("should add files to store after fetching them from api", async () => {
			const { addFileMetaDataSpy } = setup();

			await filesModule.fetchTeamFiles("/path");

			expect(addFileMetaDataSpy).toHaveBeenCalledWith(
				expect.objectContaining<FileMetaListResponse>({
					size: 2,
				} as FileMetaListResponse)
			);
		});
	});

	describe("setFiles", () => {
		it("should set files to store", async () => {
			const { mockFile } = setup();

			await filesModule.setFiles([mockFile]);

			expect(filesModule.files[0]).toEqual(mockFile);
		});
	});

	describe("setLoading", () => {
		it("should set loading to store", async () => {
			await filesModule.setLoading(true);
			expect(filesModule.loading).toBeTruthy();

			await filesModule.setLoading(false);
			expect(filesModule.loading).toBeFalsy();
		});
	});

	describe("addFileMetaData", () => {
		it("should call the fileResponseMapper", async () => {
			const { mockFileMetaListResponse, fileResponseMapperSpy } = setup();

			await filesModule.addFileMetaData(mockFileMetaListResponse);

			expect(fileResponseMapperSpy).toHaveBeenCalledWith(
				mockFileMetaListResponse
			);
		});

		it("should set the mapped files to store", async () => {
			const { mockFileMetaListResponse } = setup();

			await filesModule.addFileMetaData(mockFileMetaListResponse);

			expect(filesModule.files[0]).toEqual(
				expect.objectContaining<FileMetaResponse>({
					path: mockFileMetaListResponse.data[0].path,
				} as FileMetaResponse)
			);
		});
	});
});
