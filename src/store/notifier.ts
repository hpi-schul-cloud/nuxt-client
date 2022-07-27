import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface AlertPayload {
	text: string;
	status?: "success" | "danger" | "warning" | "info";
	/**
	 * Timeout in ms before the Alert is closed.
	 *
	 * Use 0 to not close the Alert automatically.
	 */
	timeout?: number;
}

@Module({
	name: "notifier",
	namespaced: true,
	stateFactory: true,
})
export default class NotifierModule extends VuexModule {
	notifier: AlertPayload | undefined = undefined;

	get getNotifier(): AlertPayload | undefined {
		return this.notifier;
	}

	@Action
	show(payload: AlertPayload) {
		this.setNotifier(payload);
	}

	@Mutation
	setNotifier(payload: AlertPayload): void {
		this.notifier = payload;
	}
}
