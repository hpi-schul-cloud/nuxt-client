import { useSchoolTermsOfUse } from "./schoolTermsOfUse.composable";
import { ConsentVersion, CreateConsentVersionPayload } from "./types";
import { initializeAxios } from "@/utils/api";
import { privacyPolicyFactory, termsOfUseFactory } from "@@/tests/test-utils";
import { useNotificationStore } from "@data-app";
import { createMock, DeepMocked } from "@golevelup/ts-vitest";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn(() => ({
			t: vi.fn((key: string) => key),
		})),
	};
});

describe("schoolTermsOfUse composable", () => {
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = createMock<AxiosInstance>();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	const createConsentVersionResponse = (termsOfUse: ConsentVersion) => {
		const { consentData, ...responseData } = termsOfUse;
		return {
			...responseData,
			consentDataId: consentData._id,
		};
	};

	describe("fetchTermsOfUse", () => {
		it("should fetch the terms of use for a school", async () => {
			const termsOfUseResponse = termsOfUseFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [termsOfUseResponse] } });

			const { fetchTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await fetchTermsOfUse("schoolId");

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/consentVersions", {
				params: {
					schoolId: "schoolId",
					consentTypes: ["termsOfUse"],
					consentDataId: { $exists: true },
					$populate: "consentData",
					$limit: 1,
					$sort: { publishedAt: -1 },
				},
			});
			expect(termsOfUse.value).toEqual(termsOfUseResponse);
		});

		it("should set terms of use to null if API returns empty list", async () => {
			axiosMock.get.mockResolvedValueOnce({ data: { data: [] } });

			const { fetchTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await fetchTermsOfUse("schoolId");

			expect(axiosMock.get).toHaveBeenCalled();
			expect(termsOfUse.value).toBeNull();
		});

		it("should set terms of use to null if API request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.get.mockRejectedValueOnce(new Error("network"));

			const { fetchTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await fetchTermsOfUse("schoolId");

			expect(termsOfUse.value).toBeNull();
			consoleErrorSpy.mockRestore();
		});
	});

	describe("createPrivacyPolicy", () => {
		const consentVersionPayload: CreateConsentVersionPayload = {
			schoolId: "schoolId",
			consentTypes: ["termsOfUse"],
			publishedAt: new Date().toISOString(),
			title: "Terms of Use",
			consentData: "data:application/pdf;base64,SOMEFILEDATA",
		};

		it("should not set terms of use if API post request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.post.mockRejectedValueOnce(new Error("network"));

			const { createTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await createTermsOfUse(consentVersionPayload);

			expect(termsOfUse.value).toBeNull();
			expect(useNotificationStore().notify).not.toHaveBeenCalled();
			consoleErrorSpy.mockRestore();
		});

		it("should create new privacy policy if no existing policy is present", async () => {
			const newPrivacyPolicy = privacyPolicyFactory.build();
			axiosMock.post.mockResolvedValueOnce({ data: createConsentVersionResponse(newPrivacyPolicy) });

			const { createTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await createTermsOfUse(consentVersionPayload);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/consentVersions", consentVersionPayload);
			expect(termsOfUse.value).toEqual({
				...newPrivacyPolicy,
				consentData: {
					_id: newPrivacyPolicy.consentData._id,
					schoolId: consentVersionPayload.schoolId,
					createdAt: newPrivacyPolicy.createdAt,
					updatedAt: newPrivacyPolicy.updatedAt,
					filetype: "pdf",
					filename: "Terms of Use",
					data: consentVersionPayload.consentData,
				},
			});
		});

		it("should notify success if terms of use is created successfully", async () => {
			const newTermsOfUse = termsOfUseFactory.build();
			axiosMock.post.mockResolvedValueOnce({ data: createConsentVersionResponse(newTermsOfUse) });

			const { createTermsOfUse } = useSchoolTermsOfUse();
			await createTermsOfUse(consentVersionPayload);

			expect(useNotificationStore().notify).toHaveBeenCalledWith(
				expect.objectContaining({ status: "success", text: "pages.administration.school.index.termsOfUse.success" })
			);
		});

		it("should create new terms of use and delete existing one", async () => {
			const existingTermsOfUse = termsOfUseFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingTermsOfUse] } });

			const newTermsOfUse = termsOfUseFactory.build();
			axiosMock.post.mockResolvedValueOnce({
				data: createConsentVersionResponse(newTermsOfUse),
			});

			const { fetchTermsOfUse, createTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await fetchTermsOfUse(existingTermsOfUse.schoolId);
			await createTermsOfUse(consentVersionPayload);

			expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/consentVersions/${existingTermsOfUse._id}`);
			expect(axiosMock.post).toHaveBeenCalledWith("/v1/consentVersions", consentVersionPayload);
			expect(termsOfUse.value).toEqual({
				...newTermsOfUse,
				consentData: {
					_id: newTermsOfUse.consentData._id,
					schoolId: consentVersionPayload.schoolId,
					createdAt: newTermsOfUse.createdAt,
					updatedAt: newTermsOfUse.updatedAt,
					filetype: "pdf",
					filename: "Terms of Use",
					data: consentVersionPayload.consentData,
				},
			});
		});

		it("should create new terms of use even if deletion of old policy fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());

			const existingTermsOfUse = termsOfUseFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingTermsOfUse] } });
			axiosMock.delete.mockRejectedValueOnce(new Error("network"));

			const newTermsOfUse = termsOfUseFactory.build({});
			axiosMock.post.mockResolvedValueOnce({ data: createConsentVersionResponse(newTermsOfUse) });

			const { fetchTermsOfUse, createTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await fetchTermsOfUse(existingTermsOfUse.schoolId);
			await createTermsOfUse(consentVersionPayload);

			expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/consentVersions/${existingTermsOfUse._id}`);
			expect(axiosMock.post).toHaveBeenCalledWith("/v1/consentVersions", consentVersionPayload);
			expect(termsOfUse.value).toEqual({
				...newTermsOfUse,
				consentData: {
					_id: newTermsOfUse.consentData._id,
					schoolId: consentVersionPayload.schoolId,
					createdAt: newTermsOfUse.createdAt,
					updatedAt: newTermsOfUse.updatedAt,
					filetype: "pdf",
					filename: "Terms of Use",
					data: consentVersionPayload.consentData,
				},
			});
			consoleErrorSpy.mockRestore();
		});
	});

	describe("deleteTermsOfUse", () => {
		it("should delete the existing terms of use and notify success", async () => {
			const existingTermsOfUse = termsOfUseFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingTermsOfUse] } });

			const { fetchTermsOfUse, deleteTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await fetchTermsOfUse(existingTermsOfUse.schoolId);
			await deleteTermsOfUse();

			expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/consentVersions/${existingTermsOfUse._id}`);
			expect(termsOfUse.value).toBeNull();
			expect(useNotificationStore().notify).toHaveBeenCalledWith(
				expect.objectContaining({
					status: "success",
					text: "pages.administration.school.index.termsOfUse.delete.success",
				})
			);
		});

		it("should not change terms of use if deletion fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());

			const existingTermsOfUse = termsOfUseFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingTermsOfUse] } });
			axiosMock.delete.mockRejectedValueOnce(new Error("network"));

			const { fetchTermsOfUse, deleteTermsOfUse, termsOfUse } = useSchoolTermsOfUse();
			await fetchTermsOfUse(existingTermsOfUse.schoolId);
			await deleteTermsOfUse();

			expect(termsOfUse.value).toEqual(existingTermsOfUse);
			consoleErrorSpy.mockRestore();
		});
	});
});
