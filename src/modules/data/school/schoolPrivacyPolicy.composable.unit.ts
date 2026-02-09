import { useSchoolPrivacyPolicy } from "./schoolPrivacyPolicy.composable";
import { CreateConsentVersionPayload } from "./types";
import { initializeAxios } from "@/utils/api";
import { privacyPolicyFactory } from "@@/tests/test-utils";
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

describe("schoolPrivacyPolicy composable", () => {
	let axiosMock: DeepMocked<AxiosInstance>;

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		axiosMock = createMock<AxiosInstance>();
		initializeAxios(axiosMock);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("fetchPrivacyPolicy", () => {
		it("should fetch the privacy policy for a school", async () => {
			const privacyPolicyResponse = privacyPolicyFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [privacyPolicyResponse] } });

			const { fetchPrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await fetchPrivacyPolicy("schoolId");

			expect(axiosMock.get).toHaveBeenCalledWith("/v1/consentVersions", {
				params: {
					schoolId: "schoolId",
					consentTypes: ["privacy"],
					consentDataId: { $exists: true },
					$populate: "consentData",
					$limit: 1,
					$sort: { publishedAt: -1 },
				},
			});
			expect(privacyPolicy.value).toEqual(privacyPolicyResponse);
		});

		it("should set privacy policy to null if API returns empty list", async () => {
			axiosMock.get.mockResolvedValueOnce({ data: { data: [] } });

			const { fetchPrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await fetchPrivacyPolicy("schoolId");

			expect(axiosMock.get).toHaveBeenCalled();
			expect(privacyPolicy.value).toBeNull();
		});

		it("should set privacy policy to null if API request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.get.mockRejectedValueOnce(new Error("network"));

			const { fetchPrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await fetchPrivacyPolicy("schoolId");

			expect(privacyPolicy.value).toBeNull();
			consoleErrorSpy.mockRestore();
		});
	});

	describe("createPrivacyPolicy", () => {
		const consentVersionPayload: CreateConsentVersionPayload = {
			schoolId: "schoolId",
			consentTypes: ["privacy"],
			publishedAt: new Date().toISOString(),
			title: "New Privacy Policy",
			consentData: "data:application/pdf;base64,SOMEFILEDATA",
		};

		it("should not set privacy policy if API post request fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());
			axiosMock.post.mockRejectedValueOnce(new Error("network"));

			const { createPrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await createPrivacyPolicy(consentVersionPayload);

			expect(privacyPolicy.value).toBeNull();
			expect(useNotificationStore().notify).not.toHaveBeenCalled();
			consoleErrorSpy.mockRestore();
		});

		it("should create new privacy policy if no existing policy is present", async () => {
			const policyResponse = privacyPolicyFactory.build();
			axiosMock.post.mockResolvedValueOnce({ data: policyResponse });

			const { createPrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await createPrivacyPolicy(consentVersionPayload);

			expect(axiosMock.post).toHaveBeenCalledWith("/v1/consentVersions", consentVersionPayload);
			expect(privacyPolicy.value).toEqual({
				...policyResponse,
				consentData: { data: consentVersionPayload.consentData },
			});
		});

		it("should notify success if privacy policy is created successfully", async () => {
			const policyPostResponse = privacyPolicyFactory.build();
			axiosMock.post.mockResolvedValueOnce({ data: policyPostResponse });

			const { createPrivacyPolicy } = useSchoolPrivacyPolicy();
			await createPrivacyPolicy(consentVersionPayload);

			expect(useNotificationStore().notify).toHaveBeenCalledWith(
				expect.objectContaining({ status: "success", text: "pages.administration.school.index.schoolPolicy.success" })
			);
		});

		it("should create new privacy policy and delete existing one", async () => {
			const existingPolicy = privacyPolicyFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingPolicy] } });

			const newPolicyResponse = privacyPolicyFactory.build();
			axiosMock.post.mockResolvedValueOnce({ data: newPolicyResponse });

			const { fetchPrivacyPolicy, createPrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await fetchPrivacyPolicy(existingPolicy.schoolId);
			await createPrivacyPolicy(consentVersionPayload);

			expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/consentVersions/${existingPolicy._id}`);
			expect(axiosMock.post).toHaveBeenCalledWith("/v1/consentVersions", consentVersionPayload);
			expect(privacyPolicy.value).toEqual({
				...newPolicyResponse,
				consentData: {
					data: consentVersionPayload.consentData,
				},
			});
		});

		it("should create new privacy policy even if deletion of old policy fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());

			const existingPolicy = privacyPolicyFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingPolicy] } });
			axiosMock.delete.mockRejectedValueOnce(new Error("network"));

			const newPolicyResponse = privacyPolicyFactory.build();
			axiosMock.post.mockResolvedValueOnce({ data: newPolicyResponse });

			const { fetchPrivacyPolicy, createPrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await fetchPrivacyPolicy(existingPolicy.schoolId);
			await createPrivacyPolicy(consentVersionPayload);

			expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/consentVersions/${existingPolicy._id}`);
			expect(axiosMock.post).toHaveBeenCalledWith("/v1/consentVersions", consentVersionPayload);
			expect(privacyPolicy.value).toEqual({
				...newPolicyResponse,
				consentData: {
					data: consentVersionPayload.consentData,
				},
			});
			consoleErrorSpy.mockRestore();
		});
	});

	describe("deletePrivacyPolicy", () => {
		it("should delete the existing privacy policy and notify success", async () => {
			const existingPolicy = privacyPolicyFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingPolicy] } });

			const { fetchPrivacyPolicy, deletePrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await fetchPrivacyPolicy(existingPolicy.schoolId);
			await deletePrivacyPolicy();

			expect(axiosMock.delete).toHaveBeenCalledWith(`/v1/consentVersions/${existingPolicy._id}`);
			expect(privacyPolicy.value).toBeNull();
			expect(useNotificationStore().notify).toHaveBeenCalledWith(
				expect.objectContaining({
					status: "success",
					text: "pages.administration.school.index.schoolPolicy.delete.success",
				})
			);
		});

		it("should not change privacy policy if deletion fails", async () => {
			const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(vi.fn());

			const existingPolicy = privacyPolicyFactory.build();
			axiosMock.get.mockResolvedValueOnce({ data: { data: [existingPolicy] } });
			axiosMock.delete.mockRejectedValueOnce(new Error("network"));

			const { fetchPrivacyPolicy, deletePrivacyPolicy, privacyPolicy } = useSchoolPrivacyPolicy();
			await fetchPrivacyPolicy(existingPolicy.schoolId);
			await deletePrivacyPolicy();

			expect(privacyPolicy.value).toEqual(existingPolicy);
			consoleErrorSpy.mockRestore();
		});
	});
});
