import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export type Error = {
	statusCode: string;
	message: string;
};

@Module({
	name: "error",
	namespaced: true,
	stateFactory: true,
})
export default class ErrorModule extends VuexModule {
	private error: Error | null = null;

	@Action
	setError(payload: Error | null): void {
		this.setErrorObject(payload);
	}

	@Mutation
	setErrorObject(payload: Error | null): void {
		this.error = payload;
	}

	get getError(): Error | null {
		return this.error;
	}
}
