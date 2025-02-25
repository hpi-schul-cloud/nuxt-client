import { initializeAxios } from "@/utils/api";
import { AxiosInstance } from "axios";
import PrivacyPolicyModule from "./privacy-policy";
import {
	ConsentVersion,
	CreateConsentVersionPayload,
} from "@/store/types/consent-version";
import { BusinessError } from "@/store/types/commons";

let receivedRequests: { path: string }[] = [];
let getRequestReturn:
	| { data: { data: ConsentVersion[] } }
	| { data: ConsentVersion } = {
	data: { data: [] },
};

const axiosInitializer = (error?: boolean) => {
	initializeAxios({
		get: async (path: string) => {
			if (error) {
				throw new Error("expected error");
			}

			receivedRequests.push({ path });
			return getRequestReturn;
		},
		post: async (path: string) => {
			if (error) {
				throw new Error("expected error");
			}
			receivedRequests.push({ path });
			return getRequestReturn;
		},
		delete: async (path: string) => {
			if (error) {
				throw new Error("expected error");
			}
			receivedRequests.push({ path });
			return getRequestReturn;
		},
	} as AxiosInstance);
};

axiosInitializer();

describe("privacy policy module", () => {
	describe("actions", () => {
		beforeEach(() => {
			receivedRequests = [];
			getRequestReturn = {
				data: { data: [] },
			};
		});

		describe("fetchPrivacyPolicy", () => {
			it("should call backend and set correct state", async () => {
				const policyModule = new PrivacyPolicyModule({});

				getRequestReturn = {
					data: {
						data: [
							{
								_id: "123",
								schoolId: "schoolid",
								title: "sometitle",
								consentText: "",
								publishedAt: "somedate",
								createdAt: "somedate",
								updatedAt: "somedate",
								consentTypes: ["privacy"],
								consentData: {
									_id: "999",
									schoolId: "333",
									createdAt: "someotherdate",
									updatedAt: "someotherdate",
									fileType: "pdf",
									fileName: "somefilename",
									data: "data:application/pdf;base64,SOMEFILEDATA",
								},
							},
						],
					},
				};

				const setPrivacyPolicySpy = jest.spyOn(
					policyModule,
					"setPrivacyPolicy"
				);
				const setStatusSpy = jest.spyOn(policyModule, "setStatus");

				await policyModule.fetchPrivacyPolicy("schoolid");

				expect(receivedRequests.length).toBe(1);
				expect(receivedRequests[0].path).toBe("/v1/consentVersions");
				expect(setStatusSpy).toHaveBeenCalledWith("pending");
				expect(setStatusSpy).toHaveBeenCalledWith("completed");
				expect(setPrivacyPolicySpy).toHaveBeenCalledWith(
					getRequestReturn.data.data[0]
				);
				expect(policyModule.privacyPolicy).toBe(getRequestReturn.data.data[0]);
			});
		});

		describe("createPrivacyPolicy", () => {
			it("should call backend and set correct state", async () => {
				const policyModule = new PrivacyPolicyModule({});

				policyModule.privacyPolicy = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["privacy"],
					consentData: {
						_id: "999",
						schoolId: "333",
						createdAt: "someotherdate",
						updatedAt: "someotherdate",
						fileType: "pdf",
						fileName: "somefilename",
						data: "data:application/pdf;base64,SOMEFILEDATA",
					},
				};

				const createPolicyPayload: CreateConsentVersionPayload = {
					schoolId: "333",
					title: "somenewtitle",
					consentText: "",
					consentTypes: ["privacy"],
					publishedAt: "currentDate",
					consentData: "data:application/pdf;base64,SOMENEWFILEDATA",
				};

				getRequestReturn = {
					data: {
						_id: "321",
						schoolId: "333",
						title: "somenewtitle",
						consentText: "",
						publishedAt: "currentDate",
						consentTypes: ["privacy"],
						createdAt: "someotherdate",
						updatedAt: "someotherdate",
						consentData: {
							_id: "999",
							schoolId: "333",
							fileType: "pdf",
							fileName: "somefilename",
							createdAt: "someotherdate",
							updatedAt: "someotherdate",
							data: "data:application/pdf;base64,SOMENEWFILEDATA",
						},
					},
				};

				const setPrivacyPolicySpy = jest.spyOn(
					policyModule,
					"setPrivacyPolicy"
				);
				const setStatusSpy = jest.spyOn(policyModule, "setStatus");

				await policyModule.createPrivacyPolicy(createPolicyPayload);

				expect(receivedRequests.length).toBe(2);
				expect(receivedRequests[0].path).toBe("/v1/consentVersions");
				expect(receivedRequests[1].path).toBe("/v1/consentVersions/123");
				expect(setStatusSpy).toHaveBeenCalledWith("pending");
				expect(setStatusSpy).toHaveBeenCalledWith("completed");
				expect(setPrivacyPolicySpy).toHaveBeenCalledWith(getRequestReturn.data);
				expect(policyModule.privacyPolicy).toBe(getRequestReturn.data);
			});
		});

		describe("deletePrivacyPolicy", () => {
			it("should call backend and set correct state", async () => {
				const policyModule = new PrivacyPolicyModule({});

				policyModule.privacyPolicy = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["privacy"],
					consentData: {
						_id: "999",
						schoolId: "333",
						createdAt: "someotherdate",
						updatedAt: "someotherdate",
						fileType: "pdf",
						fileName: "somefilename",
						data: "data:application/pdf;base64,SOMEFILEDATA",
					},
				};

				const setPrivacyPolicySpy = jest.spyOn(
					policyModule,
					"setPrivacyPolicy"
				);
				const setStatusSpy = jest.spyOn(policyModule, "setStatus");

				await policyModule.deletePrivacyPolicy();

				expect(receivedRequests.length).toBe(1);
				expect(receivedRequests[0].path).toBe("/v1/consentVersions/123");
				expect(setStatusSpy).toHaveBeenCalledWith("pending");
				expect(setStatusSpy).toHaveBeenCalledWith("completed");
				expect(setPrivacyPolicySpy).toHaveBeenCalledWith(null);
				expect(policyModule.privacyPolicy).toBe(null);
			});
		});

		it("should catch error and set correct state", async () => {
			axiosInitializer(true);
			const policyModule = new PrivacyPolicyModule({});

			const policyToSet: ConsentVersion = {
				_id: "123",
				schoolId: "333",
				title: "sometitle",
				consentText: "",
				publishedAt: "somedate",
				createdAt: "somedate",
				updatedAt: "somedate",
				consentTypes: ["privacy"],
				consentData: {
					_id: "999",
					schoolId: "333",
					createdAt: "someotherdate",
					updatedAt: "someotherdate",
					fileType: "pdf",
					fileName: "somefilename",
					data: "data:application/pdf;base64,SOMEFILEDATA",
				},
			};

			policyModule.setPrivacyPolicy(policyToSet);
			await policyModule.deletePrivacyPolicy();

			expect(policyModule.getBusinessError).not.toBe(null);
			expect(policyModule.getStatus).toBe("error");
		});
	});

	describe("mutations", () => {
		describe("setPrivacyPolicy", () => {
			it("should set privacy policy", () => {
				const policyModule = new PrivacyPolicyModule({});

				const policyToSet: ConsentVersion = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["privacy"],
					consentData: {
						_id: "999",
						schoolId: "333",
						createdAt: "someotherdate",
						updatedAt: "someotherdate",
						fileType: "pdf",
						fileName: "somefilename",
						data: "data:application/pdf;base64,SOMEFILEDATA",
					},
				};

				expect(policyModule.getPrivacyPolicy).not.toBe(policyToSet);
				policyModule.setPrivacyPolicy(policyToSet);
				expect(policyModule.privacyPolicy).toBe(policyToSet);
			});
		});

		describe("setStatus", () => {
			it("should set status", () => {
				const policyModule = new PrivacyPolicyModule({});

				const statusToSet = "completed";

				expect(policyModule.getStatus).not.toBe(statusToSet);
				policyModule.setStatus(statusToSet);
				expect(policyModule.status).toBe(statusToSet);
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				const policyModule = new PrivacyPolicyModule({});

				const businessErrorToSet = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};

				expect(policyModule.getBusinessError).not.toBe(businessErrorToSet);
				policyModule.setBusinessError(businessErrorToSet);
				expect(policyModule.businessError).toBe(businessErrorToSet);
			});

			it("should reset businessError", () => {
				const policyModule = new PrivacyPolicyModule({});

				policyModule.businessError = {
					statusCode: "400",
					message: "error",
					error: {},
				};

				policyModule.resetBusinessError();
				expect(policyModule.businessError.statusCode).toBe("");
				expect(policyModule.businessError.message).toBe("");
			});
		});
	});

	describe("getters", () => {
		describe("getPrivacyPolicy", () => {
			it("should return privacy policy state", () => {
				const policyModule = new PrivacyPolicyModule({});

				const policyToSet: ConsentVersion = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["privacy"],
					consentData: {
						_id: "999",
						schoolId: "333",
						createdAt: "someotherdate",
						updatedAt: "someotherdate",
						fileType: "pdf",
						fileName: "somefilename",
						data: "data:application/pdf;base64,SOMEFILEDATA",
					},
				};

				policyModule.privacyPolicy = policyToSet;
				expect(policyModule.getPrivacyPolicy).toBe(policyToSet);
			});
		});

		describe("getStatus", () => {
			it("should return the status state", () => {
				const policyModule = new PrivacyPolicyModule({});

				const statusToSet = "completed";
				policyModule.status = statusToSet;

				expect(policyModule.getStatus).toBe(statusToSet);
			});
		});

		describe("getBusinessError", () => {
			it("should return business error", () => {
				const policyModule = new PrivacyPolicyModule({});

				const businessErrorToSet: BusinessError = {
					statusCode: "404",
					message: "not found",
				};
				policyModule.businessError = businessErrorToSet;

				expect(policyModule.getBusinessError).toBe(businessErrorToSet);
			});
		});
	});
});
