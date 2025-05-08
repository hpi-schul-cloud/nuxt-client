import { axiosErrorFactory, mockApiResponse } from "@@/tests/test-utils";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import * as serverApi from "@/serverApi/v3/api";
import {
	OAuthApiInterface,
	OAuthSessionTokenExpirationResponse,
} from "@/serverApi/v3/api";
import { createMock, DeepMocked } from "@golevelup/ts-jest";
import { useOAuthApi } from "./OAuthApi.composable";

jest.mock("@/components/error-handling/ErrorHandler.composable");

describe("OAuthApi.composable", () => {
	let oauthApi: DeepMocked<OAuthApiInterface>;
	let mockedUseErrorHandler: DeepMocked<ReturnType<typeof useErrorHandler>>;

	beforeEach(() => {
		oauthApi = createMock<OAuthApiInterface>();
		mockedUseErrorHandler = createMock<ReturnType<typeof useErrorHandler>>();

		jest.spyOn(serverApi, "OAuthApiFactory").mockReturnValue(oauthApi);
		jest.mocked(useErrorHandler).mockReturnValue(mockedUseErrorHandler);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getSessionTokenExpiration", () => {
		describe("when the call succeeds with status 200", () => {
			const setup = () => {
				const expiration: OAuthSessionTokenExpirationResponse = {
					expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
				};

				oauthApi.oAuthControllerGetSessionTokenExpiration.mockResolvedValueOnce(
					mockApiResponse({ data: expiration })
				);

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

				expect(
					oauthApi.oAuthControllerGetSessionTokenExpiration
				).toHaveBeenCalled();
			});
		});

		describe("when the api call fails with an error status", () => {
			const setup = () => {
				const error = axiosErrorFactory.withStatusCode(404).build();

				oauthApi.oAuthControllerGetSessionTokenExpiration.mockRejectedValueOnce(
					error
				);

				return { error };
			};

			it("should return undefined", async () => {
				setup();

				const result = await useOAuthApi().getSessionTokenExpiration();

				expect(result).toBeUndefined();
			});

			it("should pass the error to the error handler", async () => {
				const { error } = setup();

				await useOAuthApi().getSessionTokenExpiration();

				expect(mockedUseErrorHandler.handleError).toHaveBeenCalledWith(error, {
					404: undefined,
					500: undefined,
				});
			});
		});
	});
});
