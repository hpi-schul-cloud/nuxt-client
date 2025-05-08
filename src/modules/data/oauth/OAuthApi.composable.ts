import { AxiosResponse } from "axios";
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
			handleError(error, {
				404: undefined,
				500: undefined,
			});
		}
	};

	return { getSessionTokenExpiration };
};
