import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { BusinessError, Status } from "./types/commons";
import { StatusAlert } from "./types/status-alert";
import { $axios } from "../utils/api";

@Module({
	name: "statusAlerts",
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
	async fetchStatusAlerts() {
		try {
			this.resetBusinessError();
			this.setStatus("pending");
			const response = await $axios.$get("/v1/alert");
			this.setStatusAlerts(response as StatusAlert[]);
			this.setStatusAlerts([
				{
					title: "Important info",
					text: "Description of the alert",
					status: "info",
					origin: {
						page: "status",
						message_id: 1,
					},
					timestamp: "2022-08-25 10:33:38",
					url: "https://status.test.cloud",
				},
				{
					title: "Problem resolved",
					text: "Description of the alert 2",
					status: "done",
					origin: {
						page: "status",
						message_id: 2,
					},
					timestamp: "2022-08-25 10:33:38",
					url: "https://status.test.cloud",
				},
				{
					title: "Critical problem in progress info2",
					text: "Description of the alert 3",
					status: "danger",
					origin: {
						page: "status",
						message_id: 3,
					},
					timestamp: "2022-08-25 10:33:38",
					url: "https://status.test.cloud",
				},
			]);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
		}
	}
}
