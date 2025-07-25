import { initializeAxios } from "@/utils/api";
import { AxiosHeaders, AxiosInstance, AxiosResponse } from "axios";
import TermsOfUseModule from "./terms-of-use";
import {
	ConsentVersion,
	CreateConsentVersionPayload,
} from "@/store/types/consent-version";
import { BusinessError } from "@/store/types/commons";

let receivedRequests: { path: string }[] = [];
const mockApiResponse: AxiosResponse = {
	data: {},
	status: 200,
	statusText: "OK",
	headers: new AxiosHeaders(),
	config: {
		headers: new AxiosHeaders(),
	},
};

const axiosInitializer = (axiosResponse: AxiosResponse, error?: boolean) => {
	initializeAxios({
		get: async (path: string) => {
			if (error) {
				throw new Error("expected error");
			}

			receivedRequests.push({ path });
			return axiosResponse;
		},
		post: async (path: string) => {
			if (error) {
				throw new Error("expected error");
			}
			receivedRequests.push({ path });
			return axiosResponse;
		},
		delete: async (path: string) => {
			if (error) {
				throw new Error("expected error");
			}
			receivedRequests.push({ path });
			return axiosResponse;
		},
	} as AxiosInstance);
};

describe("terms of use module", () => {
	describe("actions", () => {
		beforeEach(() => {
			receivedRequests = [];
		});

		describe("fetchTermsOfUse", () => {
			it("should call backend and set correct state", async () => {
				const termsOfUseModule = new TermsOfUseModule({});

				mockApiResponse.data = {
					data: [
						{
							_id: "123",
							schoolId: "schoolid",
							title: "sometitle",
							consentText: "",
							publishedAt: "somedate",
							createdAt: "somedate",
							updatedAt: "somedate",
							consentTypes: ["termsOfUse"],
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
				};
				axiosInitializer(mockApiResponse);
				const setTermsOfUseSpy = vi.spyOn(termsOfUseModule, "setTermsOfUse");
				const setStatusSpy = vi.spyOn(termsOfUseModule, "setStatus");

				await termsOfUseModule.fetchTermsOfUse("schoolid");

				expect(receivedRequests.length).toBe(1);
				expect(receivedRequests[0].path).toBe("/v1/consentVersions");
				expect(setStatusSpy).toHaveBeenCalledWith("pending");
				expect(setStatusSpy).toHaveBeenCalledWith("completed");
				expect(setTermsOfUseSpy).toHaveBeenCalledWith(
					mockApiResponse.data.data[0]
				);
				expect(termsOfUseModule.termsOfUse).toBe(mockApiResponse.data.data[0]);
			});
		});

		describe("createTermsOfUse", () => {
			it("should call backend and set correct state", async () => {
				const termsOfUseModule = new TermsOfUseModule({});

				termsOfUseModule.termsOfUse = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["termsOfUse"],
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
					consentTypes: ["termsOfUse"],
					publishedAt: "currentDate",
					consentData: "data:application/pdf;base64,SOMENEWFILEDATA",
				};
				mockApiResponse.data = {
					_id: "321",
					schoolId: "333",
					title: "somenewtitle",
					consentText: "",
					publishedAt: "currentDate",
					consentTypes: ["termsOfUse"],
					consentData: {
						data: "data:application/pdf;base64,SOMENEWFILEDATA",
					},
				};
				axiosInitializer(mockApiResponse);
				const setTermsOfUseSpy = vi.spyOn(termsOfUseModule, "setTermsOfUse");
				const setStatusSpy = vi.spyOn(termsOfUseModule, "setStatus");

				await termsOfUseModule.createTermsOfUse(createPolicyPayload);

				expect(receivedRequests.length).toBe(2);
				expect(receivedRequests[0].path).toBe("/v1/consentVersions");
				expect(receivedRequests[1].path).toBe("/v1/consentVersions/123");
				expect(setStatusSpy).toHaveBeenCalledWith("pending");
				expect(setStatusSpy).toHaveBeenCalledWith("completed");
				expect(setTermsOfUseSpy).toHaveBeenCalledWith(mockApiResponse.data);
				expect(termsOfUseModule.termsOfUse).toBe(mockApiResponse.data);
			});
		});

		describe("deleteTermsOfUse", () => {
			it("should call backend and set correct state", async () => {
				const termsOfUseModule = new TermsOfUseModule({});

				termsOfUseModule.termsOfUse = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["termsOfUse"],
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
				axiosInitializer(mockApiResponse);
				const setTermsOfUseSpy = vi.spyOn(termsOfUseModule, "setTermsOfUse");
				const setStatusSpy = vi.spyOn(termsOfUseModule, "setStatus");

				await termsOfUseModule.deleteTermsOfUse();

				expect(receivedRequests.length).toBe(1);
				expect(receivedRequests[0].path).toBe("/v1/consentVersions/123");
				expect(setStatusSpy).toHaveBeenCalledWith("pending");
				expect(setStatusSpy).toHaveBeenCalledWith("completed");
				expect(setTermsOfUseSpy).toHaveBeenCalledWith(null);
				expect(termsOfUseModule.termsOfUse).toBe(null);
			});

			it("should catch error and set correct state", async () => {
				axiosInitializer(mockApiResponse, true);
				const termsOfUseModule = new TermsOfUseModule({});

				const termsToSet: ConsentVersion = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["termsOfUse"],
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
				termsOfUseModule.setTermsOfUse(termsToSet);
				await termsOfUseModule.deleteTermsOfUse();

				expect(termsOfUseModule.getBusinessError).not.toBe(null);
				expect(termsOfUseModule.getStatus).toBe("error");
			});
		});
	});

	describe("mutations", () => {
		describe("setTermsOfUse", () => {
			it("should set terms of use", () => {
				axiosInitializer(mockApiResponse);

				const termsOfUseModule = new TermsOfUseModule({});

				const termsToSet: ConsentVersion = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["termsOfUse"],
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

				expect(termsOfUseModule.getTermsOfUse).not.toBe(termsToSet);
				termsOfUseModule.setTermsOfUse(termsToSet);
				expect(termsOfUseModule.termsOfUse).toBe(termsToSet);
			});
		});

		describe("setStatus", () => {
			it("should set status", () => {
				axiosInitializer(mockApiResponse);
				const termsOfUseModule = new TermsOfUseModule({});

				const statusToSet = "completed";

				expect(termsOfUseModule.getStatus).not.toBe(statusToSet);
				termsOfUseModule.setStatus(statusToSet);
				expect(termsOfUseModule.status).toBe(statusToSet);
			});
		});

		describe("setBusinessError", () => {
			it("should set businessError", () => {
				axiosInitializer(mockApiResponse);

				const termsOfUseModule = new TermsOfUseModule({});

				const businessErrorToSet = {
					statusCode: "400",
					message: "error",
					error: { type: "BadRequest" },
				};

				expect(termsOfUseModule.getBusinessError).not.toBe(businessErrorToSet);
				termsOfUseModule.setBusinessError(businessErrorToSet);
				expect(termsOfUseModule.businessError).toBe(businessErrorToSet);
			});

			it("should reset businessError", () => {
				axiosInitializer(mockApiResponse);
				const termsOfUseModule = new TermsOfUseModule({});

				termsOfUseModule.businessError = {
					statusCode: "400",
					message: "error",
					error: {},
				};

				termsOfUseModule.resetBusinessError();
				expect(termsOfUseModule.businessError.statusCode).toBe("");
				expect(termsOfUseModule.businessError.message).toBe("");
			});
		});
	});

	describe("getters", () => {
		describe("getTermsOfUse", () => {
			it("should return terms of use state", () => {
				axiosInitializer(mockApiResponse);
				const termsOfUseModule = new TermsOfUseModule({});

				const termsToSet: ConsentVersion = {
					_id: "123",
					schoolId: "333",
					title: "sometitle",
					consentText: "",
					publishedAt: "somedate",
					createdAt: "somedate",
					updatedAt: "somedate",
					consentTypes: ["termsOfUse"],
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

				termsOfUseModule.termsOfUse = termsToSet;
				expect(termsOfUseModule.getTermsOfUse).toBe(termsToSet);
			});
		});

		describe("getStatus", () => {
			it("should return the status state", () => {
				axiosInitializer(mockApiResponse);

				const termsOfUseModule = new TermsOfUseModule({});

				const statusToSet = "completed";
				termsOfUseModule.status = statusToSet;

				expect(termsOfUseModule.getStatus).toBe(statusToSet);
			});
		});

		describe("getBusinessError", () => {
			it("should return business error", () => {
				axiosInitializer(mockApiResponse);

				const termsOfUseModule = new TermsOfUseModule({});

				const businessErrorToSet: BusinessError = {
					statusCode: "404",
					message: "not found",
				};
				termsOfUseModule.businessError = businessErrorToSet;

				expect(termsOfUseModule.getBusinessError).toBe(businessErrorToSet);
			});
		});
	});
});
