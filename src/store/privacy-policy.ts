import { BusinessError, Status } from "@/store/types/commons";
import { ConsentVersion, CreateConsentVersionPayload } from "@/store/types/consent-version";
import { $axios } from "@/utils/api";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({
	name: "privacyPolicyModule",
	namespaced: true,
	stateFactory: true,
})
export default class PrivacyPolicyModule extends VuexModule {
	privacyPolicy: ConsentVersion | null = null;
	status: Status = "";
	businessError: BusinessError = {
		statusCode: "",
		message: "",
	};

	get getPrivacyPolicy(): ConsentVersion | null {
		return this.privacyPolicy;
	}

	get getStatus(): string {
		return this.status;
	}

	get getBusinessError() {
		return this.businessError;
	}

	@Mutation
	setPrivacyPolicy(privacyPolicy: ConsentVersion | null): void {
		this.privacyPolicy = privacyPolicy;
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
	async fetchPrivacyPolicy(schoolId: string): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			const params = {
				schoolId,
				consentTypes: ["privacy"],
				consentDataId: { $exists: true },
				$populate: "consentData",
				$limit: 1,
				$sort: {
					publishedAt: -1,
				},
			};
			const response = (await $axios.get("/v1/consentVersions", { params })).data;

			this.setPrivacyPolicy(response.data.length ? response.data[0] : null);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async createPrivacyPolicy(payload: CreateConsentVersionPayload): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			// create new privacy policy and delete the old one
			const response = (await $axios.post("/v1/consentVersions", payload)).data;
			if (this.privacyPolicy) {
				await $axios.delete(`/v1/consentVersions/${this.privacyPolicy._id}`);
			}

			response.consentData = {
				data: payload.consentData,
			};

			this.setPrivacyPolicy(response);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}

	@Action
	async deletePrivacyPolicy(): Promise<void> {
		try {
			this.resetBusinessError();
			this.setStatus("pending");

			if (this.privacyPolicy) {
				await $axios.delete(`/v1/consentVersions/${this.privacyPolicy._id}`);
			}

			this.setPrivacyPolicy(null);
			this.setStatus("completed");
		} catch (error) {
			this.setBusinessError(error as BusinessError);
			this.setStatus("error");
		}
	}
}
