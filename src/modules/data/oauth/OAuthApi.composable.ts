import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";
import {
	OAuthApiFactory,
	OAuthSessionTokenExpirationResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";

export const useOAuthApi = () => {
	const { handleError } = useErrorHandler();
	const oauthApi = OAuthApiFactory(undefined, "/v3", $axios);

	const getSessionTokenExpiration = async (): Promise<Date | undefined> => {
		try {
			const response: AxiosResponse<OAuthSessionTokenExpirationResponse> =
				await oauthApi.oAuthControllerGetSessionTokenExpiration();

			const expirationDate = new Date(response.data.expiresAt);

			return expirationDate;
		} catch (error) {
			if (
				!isAxiosError(error) ||
				error.response?.status !== HttpStatusCode.NotFound
			) {
				handleError(error, {
					500: undefined,
				});
			}
		}
	};

	return { getSessionTokenExpiration };
};
