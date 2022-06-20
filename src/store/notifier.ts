import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
	name: "notifier",
	namespaced: true,
	stateFactory: true,
})
export default class NotifierModule extends VuexModule {
	notifier: object = {};

	@Action
	show(payload: {}) {
		this.setNotifier(payload);
	}

	@Mutation
	setNotifier(payload: {}): void {
		this.notifier = payload;
	}

	get getNotifier(): object {
		return this.notifier;
	}
}
