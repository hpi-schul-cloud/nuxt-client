import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import { BusinessError, Status } from "./types/commons";

import { $axios } from "../utils/api";

export type StatusAlert = {
	title: string,
	text: string,
	status: string,
	origin: {
		page: string,
		message_id: number,
	},
	timestamp: string,
	url: string,
}

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
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
		}
	}
}