import { useAccount } from "./account.composable";
import { initializeAxios } from "@/utils/api";
import { createTestAppStore, mockAxiosInstance } from "@@/tests/test-utils";
import * as serverApi from "@api-server";
import { useAppStore } from "@data-app";
import { createTestingPinia } from "@pinia/testing";
import { AxiosInstance } from "axios";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";

vi.mock("vue-i18n", async (importOriginal) => {
	const actual = await importOriginal<typeof import("vue-i18n")>();
	return {
		...actual,
		useI18n: vi.fn(() => ({
			t: vi.fn((key: string) => key),
		})),
	};
});

describe("useAccount", () => {
	let axiosMock: Mocked<AxiosInstance>;
	let userId: string;

	const mockAccountApi = {
		accountControllerUpdateMyAccount: vi.fn(),
	};
	const mockOauth2Api = {
		oauthProviderControllerListConsentSessions: vi.fn(),
		oauthProviderControllerRevokeConsentSession: vi.fn(),
	};

	beforeEach(() => {
		setActivePinia(createTestingPinia({ stubActions: false }));
		const { mockedMe } = createTestAppStore();
		userId = mockedMe.user.id;
		useAppStore().login = vi.fn().mockResolvedValue({});

		axiosMock = mockAxiosInstance();
		initializeAxios(axiosMock);
		vi.clearAllMocks();

		vi.spyOn(serverApi, "AccountApiFactory").mockReturnValue(
			mockAccountApi as unknown as serverApi.AccountApiInterface
		);
		vi.spyOn(serverApi, "Oauth2ApiFactory").mockReturnValue(mockOauth2Api as unknown as serverApi.Oauth2ApiInterface);
	});

	it("loads user profile from /v1/users/:id", async () => {
		axiosMock.get.mockResolvedValueOnce({
			data: {
				firstName: "Max",
				lastName: "Mustermann",
				email: "max@example.com",
				discoverable: true,
			},
		});

		const { loadProfile, profile } = useAccount();
		const result = await loadProfile();

		expect(axiosMock.get).toHaveBeenCalledWith(`/v1/users/${userId}`);
		expect(result?.email).toBe("max@example.com");
		expect(profile.value?.firstName).toBe("Max");
		expect(profile.value?.discoverable).toBe(true);
	});

	it("updates profile via PATCH /account/me", async () => {
		mockAccountApi.accountControllerUpdateMyAccount.mockResolvedValueOnce({});
		axiosMock.get.mockResolvedValueOnce({
			data: { firstName: "Max", lastName: "Mustermann", email: "new@example.com" },
		});

		const { updateProfile } = useAccount();
		const success = await updateProfile({
			passwordOld: "currentPassword",
			email: "new@example.com",
		});

		expect(success).toBe(true);
		expect(mockAccountApi.accountControllerUpdateMyAccount).toHaveBeenCalledWith({
			passwordOld: "currentPassword",
			email: "new@example.com",
		});
	});

	it("updates visibility in central directory", async () => {
		axiosMock.patch.mockResolvedValueOnce({});

		const { updateVisibility, profile } = useAccount();
		profile.value = {
			id: userId,
			firstName: "Max",
			lastName: "Mustermann",
			email: "max@example.com",
			isSSO: false,
			isStudent: false,
			discoverable: false,
		};

		const success = await updateVisibility(true);

		expect(success).toBe(true);
		expect(axiosMock.patch).toHaveBeenCalledWith(`/v1/users/${userId}`, { discoverable: true });
		expect(profile.value?.discoverable).toBe(true);
	});

	it("loads consent sessions and revokes a session", async () => {
		mockOauth2Api.oauthProviderControllerListConsentSessions.mockResolvedValueOnce({
			data: [{ client_id: "client-1", client_name: "App 1", challenge: "ch-1" }],
		});
		mockOauth2Api.oauthProviderControllerRevokeConsentSession.mockResolvedValueOnce({});

		const { loadConsentSessions, revokeConsentSession, consentSessions } = useAccount();
		const sessions = await loadConsentSessions();

		expect(sessions).toHaveLength(1);
		expect(consentSessions.value[0].client_name).toBe("App 1");

		const success = await revokeConsentSession("client-1");
		expect(success).toBe(true);
		expect(consentSessions.value).toHaveLength(0);
	});
});
