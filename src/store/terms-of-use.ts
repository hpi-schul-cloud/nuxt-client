import { BusinessError, Status } from "@/store/types/commons";
import { ConsentVersion, CreateConsentVersionPayload } from "@/store/types/consent-version";
import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "termsOfUseModule",
	namespaced: true,
	stateFactory: true,
})
export default class TermsOfUseModule extends VuexModule {
	termsOfUse: ConsentVersion | null = null;
	status: Status = "";
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	get getTermsOfUse(): ConsentVersion | null {
		return this.termsOfUse;
	}

	get getStatus(): string {
		return this.status;
	}

	get getBusinessError() {
		return this.businessError;
	}

	@Mutation
	setTermsOfUse(termsOfUse: ConsentVersion | null): void {
		this.termsOfUse = termsOfUse;
	}

	@Mutation
	setBusinessError(businessError: BusinessError): void {
		this.businessError = businessError;
	}

	@Mutation
	resetBusinessError(): void {
		this.businessError = {
			statusCode: "",
			message: "",
		};
	}

	@Mutation
	setStatus(status: Status): void {
		this.status = status;
	}

	@Action
	async fetchTermsOfUse(schoolId: string): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			const params = {
				schoolId,
				consentTypes: ["termsOfUse"],
				consentDataId: { $exists: true },
				$populate: "consentData",
				$limit: 1,
				$sort: {
					publishedAt: -1,
				},
			};
			const response = (await $axios.get("/v1/consentVersions", { params })).data;

			this.setTermsOfUse(response.data.length ? response.data[0] : null);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async createTermsOfUse(payload: CreateConsentVersionPayload): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			// create new terms of use and delete the old one
			const response = (await $axios.post("/v1/consentVersions", payload)).data;
			if (this.termsOfUse) {
				await $axios.delete(`/v1/consentVersions/${this.termsOfUse._id}`);
			}

			response.consentData = {
				data: payload.consentData,
			};

			this.setTermsOfUse(response);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async deleteTermsOfUse(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			if (this.termsOfUse) {
				await $axios.delete(`/v1/consentVersions/${this.termsOfUse._id}`);
			}

			this.setTermsOfUse(null);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}
}
