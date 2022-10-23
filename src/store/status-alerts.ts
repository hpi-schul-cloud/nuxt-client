import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { BusinessError, Status } from "./types/commons";
import { StatusAlert } from "./types/status-alert";
import { $axios } from "../utils/api";

@Module({
	name: "status-alerts",
	namespaced: true,
	stateFactory: true,
})
export default class StatusAlertsModule extends VuexModule {
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};
	status: Status = "";
	statusAlerts: StatusAlert[] = [];

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

	@Mutation
	setStatusAlerts(statusAlerts: StatusAlert[]): void {
		this.statusAlerts = statusAlerts;
	}

	get getStatusAlerts(): StatusAlert[] {
		return this.statusAlerts;
	}

	@Action
	async fetchStatusAlerts(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const response = await $axios.get("/v1/alert");
			// @ts-ignore
			this.setStatusAlerts(response as StatusAlert[]);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
		}
	}
}
