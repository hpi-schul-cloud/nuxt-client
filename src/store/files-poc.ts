import {
	FileApiFactory,
	FileRecordResponse as FileRecord,
} from "@/fileStorageApi/v3";
import { authModule } from "@/store";
import { downloadFile } from "@/utils/fileHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";

const fileStorageApi = FileApiFactory(undefined, "/v3", $axios);

@Module({
	name: "filesPOCModule",
	namespaced: true,
	stateFactory: true,
})
export default class FilesPOCModule extends VuexModule {
	files: FileRecord[] = [];

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	@Action
	async fetchFiles(): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileStorageApi.filesStorageControllerList(
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
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await fileStorageApi.filesStorageControllerUpload(
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
			const res = await fileStorageApi.filesStorageControllerDownload(
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

	@Action
	async rename(params: { fileId: string; fileName: string }): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const response = await fileStorageApi.filesStorageControllerPatchFilename(
				params.fileId,
				{
					fileName: params.fileName,
				}
			);

			this.replaceFile(response.data);

			this.setStatus("completed");
		} catch (error) {
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
	replaceFile(file: FileRecord) {
		this.files = this.files.map((f) => (f.id === file.id ? file : f));
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
}
