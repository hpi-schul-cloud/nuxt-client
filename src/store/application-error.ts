import { HttpStatusCode } from "@/store/types/http-status-code.enum";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "applicationErrorModule",
	namespaced: true,
	stateFactory: true,
})
export default class ApplicationErrorModule extends VuexModule {
	private statusCode: HttpStatusCode | null = null;
	private translationKey = "";

	@Action({ rawError: true })
	setError(payload: { statusCode: HttpStatusCode; translationKey: string }): void {
		if (!payload) return;
		this.setStatusCode(payload.statusCode);
		this.setTranslationKey(payload.translationKey);
	}

	@Action({ rawError: true })
	resetError(): void {
		this.setStatusCode(null);
		this.setTranslationKey("");
	}

	@Mutation
	setStatusCode(statusCode: HttpStatusCode | null): void {
		this.statusCode = statusCode;
	}
	@Mutation
	setTranslationKey(translationKey: string | null): void {
		this.translationKey = translationKey || "";
	}

	get getStatusCode(): HttpStatusCode | null {
		return this.statusCode;
	}
	get getTranslationKey(): string {
		return this.translationKey;
	}
}
