import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { AlertPayload } from "@store/types/alert-payload";

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
