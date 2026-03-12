import { useOAuthApi } from "./oauthApi.composable";
import * as serverApi from "@/generated/serverApi/v3";
import { OAuthApiInterface, OAuthSessionTokenExpirationResponse } from "@/generated/serverApi/v3";
import { axiosErrorFactory, mockApi, mockApiResponse } from "@@/tests/test-utils";
import { HttpStatusCode } from "axios";
import { Mocked } from "vitest";

describe("oauthApi.composable", () => {
	let oauthApi: Mocked<OAuthApiInterface>;

	beforeEach(() => {
		oauthApi = mockApi<OAuthApiInterface>();

		vi.spyOn(serverApi, "OAuthApiFactory").mockReturnValue(oauthApi);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("getSessionTokenExpiration", () => {
		describe("when the call succeeds with status 200", () => {
			const setup = () => {
				const expiration: OAuthSessionTokenExpirationResponse = {
					expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
				};

				oauthApi.oAuthControllerGetSessionTokenExpiration.mockResolvedValueOnce(mockApiResponse({ data: expiration }));

				return {
					expiration,
				};
			};

			it("should return the session token expiration date", async () => {
				const { expiration } = setup();

				const result = await useOAuthApi().getSessionTokenExpiration();

				expect(result).toEqual(new Date(expiration.expiresAt));
			});

			it("should return call the api for the expiration", async () => {
				setup();

				await useOAuthApi().getSessionTokenExpiration();

				expect(oauthApi.oAuthControllerGetSessionTokenExpiration).toHaveBeenCalled();
			});
		});

		describe("when the api call fails with any error status code", () => {
			const setup = () => {
				const error = axiosErrorFactory.withStatusCode(HttpStatusCode.NotFound).build();

				oauthApi.oAuthControllerGetSessionTokenExpiration.mockRejectedValueOnce(error);

				return { error };
			};

			it("should return undefined", async () => {
				setup();

				const result = await useOAuthApi().getSessionTokenExpiration();

				expect(result).toBeUndefined();
			});
		});
	});
});
