import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

export interface AlertPayload {
	text: string;
	status?: "success" | "danger"  | "warning" | "info"; //| "error";
	timeout?: number;
}

@Module({
	name: "notifier",
	namespaced: true,
	stateFactory: true,
})
export default class NotifierModule extends VuexModule {
	notifier: AlertPayload | undefined = undefined;

	@Action
	show(payload: AlertPayload) {
		this.setNotifier(payload);
	}

	@Mutation
	setNotifier(payload: AlertPayload): void {
		this.notifier = payload;
	}

	get getNotifier(): AlertPayload | undefined {
		return this.notifier;
	}
}
