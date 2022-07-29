import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AlertPayload } from "@store/types/alert-payload";

@Module({
	name: "notifier",
	namespaced: true,
	stateFactory: true,
})
export default class NotifierModule extends VuexModule {
	notifier: AlertPayload | undefined = undefined;
	private defaultTimeout = 5000;

	get getNotifier(): AlertPayload | undefined {
		return this.notifier;
	}

	@Action
	show(payload: AlertPayload) {
		let alertData: AlertPayload = {
			...payload,
			timeout: payload.timeout || this.defaultTimeout,
		};
		this.setNotifier(alertData);
	}

	@Mutation
	setNotifier(payload: AlertPayload): void {
		this.notifier = payload;
	}
}
