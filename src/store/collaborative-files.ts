import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
	CollaborativeFile,
	CollaborativeFileType,
} from "@/store/types/collaborative-file";
import { FileMetaListResponse } from "@/store/collaborative-files/file-meta-list.response";
import { FileTypeResponse } from "@/store/collaborative-files/file-meta.response";
import { useFileTableUtils } from "@/pages/files/file-table-utils.composable";

@Module({
	name: "collaborativeFilesModule",
	namespaced: true,
	stateFactory: true,
})
export default class CollaborativeFilesModule extends VuexModule {
	loading = false;

	files: CollaborativeFile[] = [];

	get getFiles(): CollaborativeFile[] {
		return this.files;
	}

	get getLoading() {
		return this.loading;
	}

	@Action
	async fetchFilesOverview(): Promise<void> {
		this.setFiles([
			{
				name: "Favorites",
				translationKey: "pages.files.overview.favorites",
				icon: "favorite",
				path: "/cfiles/",
				size: 221,
				type: CollaborativeFileType.FAVORITES,
				lastChanged: new Date(2022, 10, 1, 14, 4).toISOString(),
			},
			{
				name: "Personal Files",
				translationKey: "pages.files.overview.personalFiles",
				icon: "folder",
				path: "/files/my",
				size: 33,
				type: CollaborativeFileType.DIRECTORY,
				lastChanged: new Date(2022, 10, 1, 14, 1).toISOString(),
			},
			{
				name: "Course Files",
				translationKey: "pages.files.overview.courseFiles",
				icon: "folder_shared",
				path: "/files/courses",
				size: 1337,
				type: CollaborativeFileType.SHARED_DIRECTORY,
				lastChanged: new Date(2021, 10, 1, 14, 3).toISOString(),
			},
			{
				name: "Team Files",
				translationKey: "pages.files.overview.teamFiles",
				icon: "folder_shared",
				path: "/cfiles/teams",
				size: 33331,
				type: CollaborativeFileType.SHARED_DIRECTORY,
				lastChanged: new Date(2019, 11, 1, 14, 4).toISOString(),
			},
			{
				name: "Shared Files",
				translationKey: "pages.files.overview.sharedFiles",
				icon: "folder_shared",
				path: "/files/shared",
				size: 123123,
				type: CollaborativeFileType.SHARED_DIRECTORY,
				lastChanged: new Date(2022, 10, 1, 9, 4).toISOString(),
			},
		]);
	}

	@Action
	async fetchTeams(): Promise<void> {
		this.setLoading(true);
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
						lastChanged: new Date(2022, 11, 3, 15, 16).toISOString(),
					},
					{
						id: "455738mb219",
						path: "/cfiles/teams/Basketball%20Arbeitsgemeinschaft",
						type: FileTypeResponse.SHARED_DIRECTORY,
						size: 232,
						name: "Basketball Arbeitsgemeinschaft",
						lastChanged: new Date(2022, 11, 2, 15, 19).toISOString(),
					},
				],
				size: 2,
			};

			await this.addFileMetaData(data);
			this.setLoading(false);
		} catch (error: any) {
			console.log(error);
			this.setLoading(false);
		}
	}

	@Action
	async fetchTeamFiles(path: string): Promise<void> {
		this.setLoading(true);
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
				size: 2,
			};

			await this.addFileMetaData(data);
			this.setLoading(false);
		} catch (error: any) {
			console.log(error);
			this.setLoading(false);
		}
	}

	@Mutation
	setFiles(files: CollaborativeFile[]) {
		this.files = files;
	}

	@Mutation
	setLoading(loading: boolean): void {
		this.loading = loading;
	}

	@Action
	async addFileMetaData(response: FileMetaListResponse): Promise<void> {
		const mappedFiles: CollaborativeFile[] = useFileTableUtils(
			this,
			() => ""
		).mapFileMetaListResponse(response);
		this.setFiles(mappedFiles);
	}
}
