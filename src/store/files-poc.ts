import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";
import AuthModule from "./auth";
import { BusinessError, Status } from "./types/commons";
import { downloadFile } from "@utils/fileHelper";
import { FileApiInterface, FileApiFactory } from "@/fileStorageApi/v3";

type FileRecord = {
	id: string;
	name: string;
	parentId: string;
	creatorId: string;
	type: string;
	parentType: string;
};

@Module({
	name: "files-poc",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class FilesPOCModule extends VuexModule {
	files: FileRecord[] = [];

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";
	private _fileStorageApi?: FileApiInterface;

	@Action
	async fetchFiles(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const schoolId = AuthModule.getUser?.schoolId as string;
			const response = await this.fileStorageApi.filesStorageControllerList(
				schoolId,
				schoolId,
				"schools"
			);

			this.setFiles(response.data.data);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async upload(file: File): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const schoolId = AuthModule.getUser?.schoolId as string;
			const response = await this.fileStorageApi.filesStorageControllerUpload(
				schoolId,
				schoolId,
				"schools",
				file
			);
			this.appendFile(response.data);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async download(file: FileRecord): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const res = await this.fileStorageApi.filesStorageControllerDownload(
				file.id,
				file.name,
				{ responseType: "blob" }
			);

			downloadFile(res.data as unknown as Blob, file.name, file.type);

			this.setStatus("completed");
		} catch (error) {
			console.log(error);

			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Mutation
	setFiles(files: FileRecord[]) {
		this.files = files;
	}

	@Mutation
	appendFile(file: FileRecord) {
		this.files.push(file);
	}

	@Mutation
	setStatus(status: Status) {
		this.status = status;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
		};
	}

	get getFiles(): FileRecord[] {
		return this.files;
	}

	get getStatus(): Status {
		return this.status;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}

	private get fileStorageApi() {
		if (!this._fileStorageApi) {
			this._fileStorageApi = FileApiFactory(undefined, "/v3", $axios);
		}
		return this._fileStorageApi;
	}
}

export default getModule(FilesPOCModule);
