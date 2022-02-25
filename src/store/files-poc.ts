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

const API_URL = "http://localhost:4444/api/v3/files-storage";

type APIFile = {
	creatorId: string;
	id: string;
	name: string;
	targetId: string;
	targetType: string;
	type: string;
};
@Module({
	name: "files-poc",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class FilesPOCModule extends VuexModule {
	files: File[] = [];

	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	status: Status = "";

	@Action
	async upload(file: File): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const schoolId = AuthModule.getUser?.schoolId;

			const formData = new FormData();
			formData.append("file", file, file.name);

			const response = await $axios.post(
				`${API_URL}/upload/${schoolId}/schools/${schoolId}`,
				formData
				// {
				// 	onUploadProgress: (...args) => {
				// 		console.log(args);
				// 	},
				// }
			);

			this.appendFile(response.data as File);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async download(file: APIFile): Promise<void> {
		this.resetBusinessError();
		this.setStatus("pending");

		try {
			const res = await $axios.get(
				`${API_URL}/download/${file.id}/${file.name}`,
				{ responseType: "blob" }
			);
			downloadFile(res.data, file.name);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Mutation
	appendFile(file: File) {
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

	get getFiles(): File[] {
		return this.files;
	}

	get getStatus(): Status {
		return this.status;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}
}

export default getModule(FilesPOCModule);
