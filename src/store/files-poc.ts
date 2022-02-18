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

@Module({
	name: "finished-tasks",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class FilesPOCModule extends VuexModule {
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
				`http://localhost:4444/api/v3/files-storage/upload/${schoolId}/schools/${schoolId}`,
				formData,
				{
					onUploadProgress: (...args) => {
						console.log(args);
					},
				}
			);

			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
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

	get getStatus(): Status {
		return this.status;
	}

	get getBusinessError(): BusinessError {
		return this.businessError;
	}
}

export default getModule(FilesPOCModule);
