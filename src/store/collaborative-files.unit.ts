import CollaborativeFilesModule from "@/store/collaborative-files";
import {
	CollaborativeFile,
	CollaborativeFileType,
	FileIcon,
} from "@/store/types/collaborative-file";
import { FileMetaListResponse } from "@/store/collaborative-files/file-meta-list.response";
import {
	FileMetaResponse,
	FileTypeResponse,
} from "@/store/collaborative-files/file-meta.response";
import * as fileTableComposable from "@/pages/files/file-table-utils.composable";

describe("CollaborativeFilesModule", () => {
	let collaborativeFilesModule: CollaborativeFilesModule;

	beforeEach(() => {
		collaborativeFilesModule = new CollaborativeFilesModule({});
	});

	function setup() {
		const setLoadingSpy = jest.spyOn(collaborativeFilesModule, "setLoading");
		const addFileMetaDataSpy = jest.spyOn(
			collaborativeFilesModule,
			"addFileMetaData"
		);
		const tMock = jest.fn().mockImplementation((key: string) => {
			return key;
		});
		const mockFile: CollaborativeFile = {
			name: "name",
			size: 123,
			lastChanged: new Date(2022, 1, 1).toISOString(),
			type: CollaborativeFileType.SHARED_DIRECTORY,
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
					lastChanged: new Date(2022, 11, 4, 10, 16).toISOString(),
				},
				{
					id: "2371272n12",
					path: "/cfiles/teams/Lehrerzimmer/Klassenbuch.txt",
					type: FileTypeResponse.FILE,
					size: 23939,
					name: "Klassenbuch.txt",
					lastChanged: new Date(2022, 11, 4, 15, 16).toISOString(),
				},
			],
		};
		return {
			setLoadingSpy,
			addFileMetaDataSpy,
			mockFile,
			mockFileMetaListResponse,
			tMock,
		};
	}

	describe("getFiles", () => {
		it("should return files from store", async () => {
			const { mockFile } = setup();
			collaborativeFilesModule.files[0] = mockFile;

			const files: CollaborativeFile[] =
				await collaborativeFilesModule.getFiles;

			expect(files[0]).toEqual(mockFile);
		});
	});

	describe("getLoading", () => {
		it("should return loading from store", async () => {
			setup();

			let loading: boolean = await collaborativeFilesModule.getLoading;

			expect(loading).toEqual(collaborativeFilesModule.loading);
		});
	});

	describe("fetchFilesOverview", () => {
		it("should set the fetched files to store", async () => {
			await collaborativeFilesModule.fetchFilesOverview();

			expect(collaborativeFilesModule.files.length).toBeGreaterThan(0);
		});
	});

	describe("fetchTeams", () => {
		it("should set loading to true and after success to false", async () => {
			const { setLoadingSpy } = setup();

			await collaborativeFilesModule.fetchTeams();

			expect(setLoadingSpy).toHaveBeenCalledWith(true);
			expect(setLoadingSpy).toHaveBeenCalledWith(false);
		});

		it("should set loading to false when an error was thrown", async () => {
			const { addFileMetaDataSpy } = setup();
			addFileMetaDataSpy.mockImplementation(() => {
				throw new Error();
			});

			await collaborativeFilesModule.fetchTeams();

			expect(collaborativeFilesModule.loading).toBeFalsy();
		});

		it("should add files to store after fetching them from api", async () => {
			const { addFileMetaDataSpy } = setup();

			await collaborativeFilesModule.fetchTeams();

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

			await collaborativeFilesModule.fetchTeamFiles("/path");

			expect(setLoadingSpy).toHaveBeenCalledWith(true);
			expect(setLoadingSpy).toHaveBeenCalledWith(false);
		});

		it("should set loading to false when an error was thrown", async () => {
			const { addFileMetaDataSpy } = setup();
			addFileMetaDataSpy.mockImplementation(() => {
				throw new Error();
			});

			await collaborativeFilesModule.fetchTeamFiles("/path");

			expect(collaborativeFilesModule.loading).toBeFalsy();
		});

		it("should add files to store after fetching them from api", async () => {
			const { addFileMetaDataSpy } = setup();

			await collaborativeFilesModule.fetchTeamFiles("/path");

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

			await collaborativeFilesModule.setFiles([mockFile]);

			expect(collaborativeFilesModule.files[0]).toEqual(mockFile);
		});
	});

	describe("setLoading", () => {
		it("should set loading to store", async () => {
			await collaborativeFilesModule.setLoading(true);
			expect(collaborativeFilesModule.loading).toBeTruthy();

			await collaborativeFilesModule.setLoading(false);
			expect(collaborativeFilesModule.loading).toBeFalsy();
		});
	});

	describe("addFileMetaData", () => {
		it("should call the useFileTableUtils", async () => {
			const { mockFileMetaListResponse, tMock } = setup();
			const mapFileMetaListResponseMock = jest.fn();
			jest.spyOn(fileTableComposable, "useFileTableUtils").mockReturnValue({
				...fileTableComposable.useFileTableUtils(
					collaborativeFilesModule,
					tMock
				),
				mapFileMetaListResponse: mapFileMetaListResponseMock,
			});

			await collaborativeFilesModule.addFileMetaData(mockFileMetaListResponse);

			expect(mapFileMetaListResponseMock).toHaveBeenCalledWith(
				mockFileMetaListResponse
			);
		});

		it("should set the mapped files to store", async () => {
			const { mockFileMetaListResponse, tMock } = setup();
			jest.spyOn(fileTableComposable, "useFileTableUtils").mockReturnValue({
				...fileTableComposable.useFileTableUtils(
					collaborativeFilesModule,
					tMock
				),
				mapFileMetaListResponse(
					response: FileMetaListResponse
				): CollaborativeFile[] {
					return [
						{
							path: mockFileMetaListResponse.data[0].path,
						} as CollaborativeFile,
					];
				},
			});

			await collaborativeFilesModule.addFileMetaData(mockFileMetaListResponse);

			expect(collaborativeFilesModule.files[0]).toEqual(
				expect.objectContaining<FileMetaResponse>({
					path: mockFileMetaListResponse.data[0].path,
				} as FileMetaResponse)
			);
		});
	});
});
