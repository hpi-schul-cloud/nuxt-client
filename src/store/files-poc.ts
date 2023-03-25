import {
	FileApiFactory,
	FileApiInterface,
	FileRecordParamsParentType,
	FileRecordResponse as FileRecord,
	RenameFileParams,
} from "@/fileStorageApi/v3";
import { downloadFile } from "@/utils/fileHelper";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { authModule } from "./store-accessor";
import { BusinessError, Status } from "./types/commons";

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
	async fetchFiles(
		parentId: string,
		parentType: FileRecordParamsParentType
	): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await this.fileStorageApi.list(
				schoolId,
				parentId,
				parentType
			);

			this.setFiles(response.data.data);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async upload(
		parentId: string,
		parentType: FileRecordParamsParentType,
		file: File
	): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const schoolId = authModule.getUser?.schoolId as string;
			const response = await this.fileStorageApi.upload(
				schoolId,
				parentId,
				parentType,
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
			const res = await this.fileStorageApi.download(file.id, file.name, {
				responseType: "blob",
			});

			downloadFile(res.data as unknown as Blob, file.name, file.mimeType);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async rename(fileRecordId: string, params: RenameFileParams): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const response = await this.fileStorageApi.patchFilename(
				fileRecordId,
				params
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

	get fileStorageApi(): FileApiInterface {
		return FileApiFactory(undefined, "/v3", $axios);
	}
}
