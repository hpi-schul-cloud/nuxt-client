import {Action, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {ApplicationError} from "@store/types/application-error";

@Module({
	name: "application-error",
	namespaced: true,
	stateFactory: true,
})
export default class ApplicationErrorModule extends VuexModule {
	private applicationError: ApplicationError | null = null;

	@Action({ rawError: true })
	setError(payload: ApplicationError): void {
		if (!payload) return;
		this.setErrorObject(payload);
	}

	@Action({ rawError: true })
	resetError(): void {
		this.setErrorObject(null);
	}

	@Mutation
	setErrorObject(payload: ApplicationError | null): void {
		this.applicationError = payload;
	}

	get getError(): ApplicationError | null {
		return this.applicationError;
	}
}
