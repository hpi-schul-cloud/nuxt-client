import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";
import { AxiosResponse } from "axios";

@Module({
	name: "accountsModule",
	namespaced: true,
	stateFactory: true,
})
export default class AccountsModule extends VuexModule {
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};
	status: Status = "";

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

	@Mutation
	setStatus(status: Status): void {
		this.status = status;
	}

	@Action
	async getTTL(): Promise<AxiosResponse | undefined> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const response = $axios.post("/v1/accounts/jwtTimer");
			this.setStatus("completed");
			return response;
		} catch (error) {
			this.setBusinessError(error as BusinessError);
		}
	}

	@Action
	async resetJwtTimer(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			$axios.post("/v1/accounts/jwtTimer");
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
		}
	}
}
