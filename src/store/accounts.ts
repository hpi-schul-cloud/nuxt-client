import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { $axios } from "../utils/api";
import { BusinessError, Status } from "./types/commons";
import { AxiosResponse } from "axios";

type JwtTimerResponse = {
	ttl: number;
};

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
	async getTTL(): Promise<number> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const response: AxiosResponse<JwtTimerResponse> = await $axios.get(
				"/v1/accounts/jwtTimer"
			);
			const ttl = response.data.ttl;
			this.setStatus("completed");
			return ttl ?? 0;
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			throw error;
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
