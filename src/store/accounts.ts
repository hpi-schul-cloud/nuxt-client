import {
	Module,
	VuexModule,
	Mutation,
	Action,
	getModule,
} from "vuex-module-decorators";
import { rootStore } from "./index";
import { $axios } from "../utils/api";

type BusinessError = {
	statusCode: string;
	message: string;
};

type Status = "pending" | "completed" | "error" | "";

@Module({
	name: "accounts",
	namespaced: true,
	dynamic: true,
	store: rootStore,
	stateFactory: true,
})
export class AccountsModule extends VuexModule {
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
	async getTTL(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			$axios.$post("/v1/accounts/jwtTimer");
			this.setStatus("completed");
		} catch (error: any) {
			this.setBusinessError(error);
		}
	}

	@Action
	async resetJwtTimer(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			$axios.$post("/v1/accounts/jwtTimer");
			this.setStatus("completed");
		} catch (error: any) {
			this.setBusinessError(error);
		}
	}
}

export default getModule(AccountsModule);
