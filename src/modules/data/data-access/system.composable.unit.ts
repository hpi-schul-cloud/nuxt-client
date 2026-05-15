import { useSystem } from "./system.composable";
import { createTestEnvStore, mockApi, mockApiResponse, mockComposable } from "@@/tests/test-utils";
import { publicSystemResponseFactory } from "@@/tests/test-utils/factory/publicSystemResponseFactory";
import * as serverApi from "@api-server";
import { useOAuthApi } from "@data-oauth";
import { createTestingPinia } from "@pinia/testing";
import { flushPromises } from "@vue/test-utils";
import { setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { ref } from "vue";

vi.mock("@data-oauth");

describe("useSystem", () => {
	let systemApiMock: Mocked<serverApi.SystemsApiInterface>;
	let useOAuthApiMock: Mocked<ReturnType<typeof useOAuthApi>>;

	beforeEach(() => {
		setActivePinia(createTestingPinia());
		systemApiMock = mockApi<serverApi.SystemsApiInterface>();
		vi.spyOn(serverApi, "SystemsApiFactory").mockReturnValue(systemApiMock);

		useOAuthApiMock = mockComposable(useOAuthApi);
		vi.mocked(useOAuthApi).mockReturnValue(useOAuthApiMock);
		useOAuthApiMock.getSessionTokenExpiration.mockResolvedValue(undefined);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("fetches and sets system data when systemId is provided", async () => {
		const systemId = ref("abc");
		const mockSystem = publicSystemResponseFactory.build();
		systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockSystem }));

		const { system, systemName } = useSystem(systemId);
		await flushPromises();

		expect(system.value).toEqual(mockSystem);
		expect(systemName.value).toEqual(mockSystem.displayName);
	});

	it("does not fetch system if systemId is undefined", async () => {
		const systemId = ref<string | undefined>(undefined);

		useSystem(systemId);
		await flushPromises();
		expect(systemApiMock.systemControllerGetSystem).not.toHaveBeenCalled();
	});

	it("does not set system if fetch fails", async () => {
		const systemId = ref("fail");
		systemApiMock.systemControllerGetSystem.mockRejectedValueOnce({});

		const { system } = useSystem(systemId);
		await flushPromises();

		expect(system.value).toBeUndefined();
	});

	describe("sessionTokenExpiration", () => {
		describe("when the system has an end session endpoint", () => {
			it("should fetch and set the session token expiration", async () => {
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build({
					oauthConfig: { endSessionEndpoint: "https://example.com/logout" },
				});
				const tokenExpiration = new Date(Date.now() + 3600 * 1000);
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));
				useOAuthApiMock.getSessionTokenExpiration.mockResolvedValue(tokenExpiration);

				const { sessionTokenExpiration } = useSystem(systemId);
				await flushPromises();

				expect(sessionTokenExpiration.value).toEqual(tokenExpiration);
			});
		});

		describe("when the system does not have an end session endpoint", () => {
			it("should not fetch the session token expiration", async () => {
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build();
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));

				const { sessionTokenExpiration } = useSystem(systemId);
				await flushPromises();

				expect(useOAuthApiMock.getSessionTokenExpiration).not.toHaveBeenCalled();
				expect(sessionTokenExpiration.value).toBeUndefined();
			});
		});
	});

	describe("updateSessionTokenExpiration", () => {
		describe("when the end session endpoint exists and the token is still valid", () => {
			it("should set isSessionTokenExpired to false", async () => {
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build({
					oauthConfig: { endSessionEndpoint: "https://example.com/logout" },
				});
				const futureExpiration = new Date(Date.now() + 3600 * 1000);
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));
				useOAuthApiMock.getSessionTokenExpiration.mockResolvedValue(futureExpiration);

				const { updateSessionTokenExpiration, isSessionTokenExpired } = useSystem(systemId);
				await flushPromises();

				await updateSessionTokenExpiration();

				expect(isSessionTokenExpired.value).toBe(false);
			});
		});

		describe("when the end session endpoint exists and the token is expired", () => {
			it("should set isSessionTokenExpired to true", async () => {
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build({
					oauthConfig: { endSessionEndpoint: "https://example.com/logout" },
				});
				const pastExpiration = new Date(Date.now() - 3600 * 1000);
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));
				useOAuthApiMock.getSessionTokenExpiration.mockResolvedValue(pastExpiration);

				const { updateSessionTokenExpiration, isSessionTokenExpired } = useSystem(systemId);
				await flushPromises();

				await updateSessionTokenExpiration();

				expect(isSessionTokenExpired.value).toBe(true);
			});
		});

		describe("when the end session endpoint exists but no token expiration is returned", () => {
			it("should set isSessionTokenExpired to true", async () => {
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build({
					oauthConfig: { endSessionEndpoint: "https://example.com/logout" },
				});
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));
				useOAuthApiMock.getSessionTokenExpiration.mockResolvedValue(undefined);

				const { updateSessionTokenExpiration, isSessionTokenExpired } = useSystem(systemId);
				await flushPromises();

				await updateSessionTokenExpiration();

				expect(isSessionTokenExpired.value).toBe(true);
			});
		});

		describe("when the end session endpoint does not exist", () => {
			it("should not fetch the session token expiration", async () => {
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build();
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));

				const { updateSessionTokenExpiration } = useSystem(systemId);
				await flushPromises();

				useOAuthApiMock.getSessionTokenExpiration.mockClear();
				await updateSessionTokenExpiration();

				expect(useOAuthApiMock.getSessionTokenExpiration).not.toHaveBeenCalled();
			});
		});
	});

	describe("isExternalLogoutAllowed", () => {
		describe("when the feature flag is enabled and the end session endpoint exists", () => {
			it("should return true", async () => {
				createTestEnvStore({ FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED: true });
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build({
					oauthConfig: { endSessionEndpoint: "https://example.com/logout" },
				});
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));

				const { isExternalLogoutAllowed } = useSystem(systemId);
				await flushPromises();

				expect(isExternalLogoutAllowed.value).toBe(true);
			});
		});

		describe("when the feature flag is disabled", () => {
			it("should return false", async () => {
				createTestEnvStore({ FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED: false });
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build({
					oauthConfig: { endSessionEndpoint: "https://example.com/logout" },
				});
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));

				const { isExternalLogoutAllowed } = useSystem(systemId);
				await flushPromises();

				expect(isExternalLogoutAllowed.value).toBe(false);
			});
		});

		describe("when the end session endpoint does not exist", () => {
			it("should return false", async () => {
				createTestEnvStore({ FEATURE_EXTERNAL_SYSTEM_LOGOUT_ENABLED: true });
				const systemId = ref("abc");
				const mockedSystem = publicSystemResponseFactory.build();
				systemApiMock.systemControllerGetSystem.mockResolvedValueOnce(mockApiResponse({ data: mockedSystem }));

				const { isExternalLogoutAllowed } = useSystem(systemId);
				await flushPromises();

				expect(isExternalLogoutAllowed.value).toBe(false);
			});
		});
	});

	describe("watch on systemId", () => {
		describe("when the systemId changes", () => {
			it("should fetch the updated system", async () => {
				const systemId = ref("abc");
				const firstSystem = publicSystemResponseFactory.build();
				const secondSystem = publicSystemResponseFactory.build();
				systemApiMock.systemControllerGetSystem
					.mockResolvedValueOnce(mockApiResponse({ data: firstSystem }))
					.mockResolvedValueOnce(mockApiResponse({ data: secondSystem }));

				const { system } = useSystem(systemId);
				await flushPromises();

				expect(system.value).toEqual(firstSystem);

				systemId.value = "xyz";
				await flushPromises();

				expect(system.value).toEqual(secondSystem);
			});
		});
	});
});
