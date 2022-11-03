import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import wait from "fork-ts-checker-webpack-plugin/lib/utils/async/wait";
import { FileResponseMapper } from "@/serverApi/v3/files/file-response.mapper";
import { FileMetaListResponse } from "@/serverApi/v3/files/file-meta-list.response";
import { FileTypeResponse } from "@/serverApi/v3/files/file-meta.response";
import { File } from "@store/types/file";
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
	async fetchFilesMeta(): Promise<void> {
		filesModule.setLoading(true);
		try {
			wait(2);
			const data: FileMetaListResponse = {
				data: [
					{
						id: "213s34g2121",
						path: "/teacherroom",
						type: FileTypeResponse.FAVORITES,
						size: 212232,
						name: "Lehrerzimmer",
						lastChanged: new Date(2022, 11, 3, 15, 16),
					},
					{
						id: "455738mb219",
						path: "/BasketballAg",
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

	@Mutation
	addFiles(files: File[]) {
		this.files = { ...this.files, ...files };
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
