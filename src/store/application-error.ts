import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { router } from "@/router";

export type ApplicationError = {
	statusCode: number;
	message: string;
};

@Module({
	name: "application-error",
	namespaced: true,
	stateFactory: true,
})
export default class ApplicationErrorModule extends VuexModule {
	private applicationError: ApplicationError | null = null;
	private errorList: ApplicationError[] = [];

	@Action
	setError(payload: ApplicationError): void {
		if (!payload) return;

		this.setErrorObject(payload);
		this.setErrorList(payload);
		router.replace("/error");
	}

	@Action
	resetError(): void {
		this.setErrorObject(null);
	}

	@Mutation
	setErrorObject(payload: ApplicationError | null): void {
		this.applicationError = payload;
	}

	// TODO: This is for only see the error list, DELETE after implementation
	@Mutation
	setErrorList(payload: any): void {
		this.errorList.push(payload);
	}

	get getError(): ApplicationError | null {
		return this.applicationError;
	}
	get getErrorList(): ApplicationError[] {
		return this.errorList;
	}
}
