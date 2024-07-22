import { AlertPayload } from "@/store/types/alert-payload";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "notifierModule",
	namespaced: true,
	stateFactory: true,
})
export default class NotifierModule extends VuexModule {
	notifierItems: AlertPayload[] = [];
	private defaultTimeout = 5000;

	get getNotifierItems(): AlertPayload[] {
		return this.notifierItems;
	}

	@Action
	show(payload: AlertPayload) {
		const alertData: AlertPayload = {
			...payload,
			autoClose: payload.autoClose === undefined || payload.autoClose,
			timeout: payload.timeout || this.defaultTimeout,
		};
		this.addNotifier(alertData);

		if (!alertData.autoClose) return;
		setTimeout(() => {
			this.removeNotifier(payload);
		}, payload.timeout || this.defaultTimeout);
	}

	@Mutation
	addNotifier(payload: AlertPayload): void {
		this.notifierItems.unshift(payload);
	}

	@Mutation
	removeNotifier(payload: AlertPayload): void {
		const index = this.notifierItems.indexOf(payload);
		this.notifierItems.splice(index, 1);
	}

	@Mutation
	reset(): void {
		this.notifierItems = [];
	}
}
