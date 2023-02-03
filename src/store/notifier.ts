import { AlertPayload } from "@/store/types/alert-payload";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "notifierModule",
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
		const alertData: AlertPayload = {
			...payload,
			autoClose: payload.autoClose === undefined || payload.autoClose,
			timeout: payload.timeout || this.defaultTimeout,
			position: payload.position || "top",
		};
		this.setNotifier(alertData);
		if (!alertData.autoClose) return;
		setTimeout(() => {
			this.setNotifier(undefined);
		}, payload.timeout || this.defaultTimeout);
	}

	@Mutation
	setNotifier(payload: AlertPayload | undefined): void {
		this.notifier = payload;
	}
}
