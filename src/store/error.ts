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
	private errorList: Error[] = [];

	@Action
	setError(payload: Error): void {
		if (!payload) return;

		this.setErrorObject(payload);
		this.setErrorList(payload);
	}

	@Action
	resetError(): void {
		this.setErrorObject(null);
	}

	@Mutation
	setErrorObject(payload: Error | null): void {
		this.error = payload;
	}

	// TODO: This is for only see the error list, DELETE after implementation
	@Mutation
	setErrorList(payload: any): void {
		this.errorList.push(payload);
	}

	get getError(): Error | null {
		return this.error;
	}
	get getErrorList(): Error[] {
		return this.errorList;
	}
}
