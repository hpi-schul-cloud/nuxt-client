import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { FileResponseMapper } from "@/serverApi/v3/files/file-response.mapper";
import { FileMetaListResponse } from "@/serverApi/v3/files/file-meta-list.response";
import { FileTypeResponse } from "@/serverApi/v3/files/file-meta.response";
import { File, FileType } from "@store/types/file";
import { filesModule } from "@utils/store-accessor";

@Module({
	name: "files",
	namespaced: true,
	stateFactory: true,
})
export default class FilesModule extends VuexModule {
	loading: boolean = false;

	files: File[] = [];

	get getFiles(): File[] {
		return this.files;
	}

	@Action
	async fetchFilesOverview(): Promise<void> {
		filesModule.setFiles([
			{
				name: "Favorites",
				translationKey: "pages.files.overview.favorites",
				icon: "favorite",
				path: "/cfiles/",
				size: 221,
				type: FileType.FAVORITES,
				lastChanged: new Date(2022, 10, 1, 14, 4),
			},
			{
				name: "Personal Files",
				translationKey: "pages.files.overview.personalFiles",
				icon: "folder",
				path: "/files/my",
				size: 33,
				type: FileType.DIRECTORY,
				lastChanged: new Date(2022, 10, 1, 14, 4),
			},
			{
				name: "Course Files",
				translationKey: "pages.files.overview.courseFiles",
				icon: "folder_shared",
				path: "/files/courses",
				size: 1337,
				type: FileType.SHARED_DIRECTORY,
				lastChanged: new Date(2021, 10, 1, 14, 4),
			},
			{
				name: "Team Files",
				translationKey: "pages.files.overview.teamFiles",
				icon: "folder_shared",
				path: "/cfiles/teams",
				size: 33331,
				type: FileType.SHARED_DIRECTORY,
				lastChanged: new Date(2019, 11, 1, 14, 4),
			},
			{
				name: "Shared Files",
				translationKey: "pages.files.overview.sharedFiles",
				icon: "folder_shared",
				path: "/files/shared",
				size: 123123,
				type: FileType.SHARED_DIRECTORY,
				lastChanged: new Date(2022, 10, 1, 9, 4),
			},
		]);
	}

	@Action
	async fetchTeams(): Promise<void> {
		filesModule.setLoading(true);
		try {
			// only mock data, comes from api in the future
			const data: FileMetaListResponse = {
				data: [
					{
						id: "213s34g2121",
						path: "/cfiles/teams/Lehrerzimmer",
						type: FileTypeResponse.SHARED_DIRECTORY,
						size: 212232,
						name: "Lehrerzimmer",
						lastChanged: new Date(2022, 11, 3, 15, 16),
					},
					{
						id: "455738mb219",
						path: "/cfiles/teams/Basketball%2Arbeitsgemeinschaft",
						type: FileTypeResponse.SHARED_DIRECTORY,
						size: 232,
						name: "Basketball Arbeitsgemeinschaft",
						lastChanged: new Date(2022, 11, 2, 15, 16),
					},
				],
				size: 2,
			};

			filesModule.addFileMetaData(data);
			filesModule.setLoading(false);
		} catch (error: any) {
			console.log(error);
			filesModule.setLoading(false);
		}
	}

	@Action
	async fetchTeamFiles(path: string): Promise<void> {
		filesModule.setLoading(true);
		try {
			// only mock data, comes from api in the future
			const data: FileMetaListResponse = {
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
				size: 2,
			};

			filesModule.addFileMetaData(data);
			filesModule.setLoading(false);
		} catch (error: any) {
			console.log(error);
			filesModule.setLoading(false);
		}
	}

	@Mutation
	addFiles(files: File[]) {
		this.files = this.files.concat(files);
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Mutation
	addFileMetaData(payload: FileMetaListResponse): void {
		const mappedFiles: File[] =
			FileResponseMapper.mapFileMetaListResponse(payload);
		filesModule.addFiles(mappedFiles);
	}
}
