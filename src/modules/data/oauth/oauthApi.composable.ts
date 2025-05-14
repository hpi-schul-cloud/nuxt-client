import {
	OAuthApiFactory,
	OAuthSessionTokenExpirationResponse,
} from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";

export const useOAuthApi = () => {
	const oauthApi = OAuthApiFactory(undefined, "/v3", $axios);

	const getSessionTokenExpiration = async (): Promise<Date | undefined> => {
		try {
			const response: AxiosResponse<OAuthSessionTokenExpirationResponse> =
				await oauthApi.oAuthControllerGetSessionTokenExpiration();

			const expirationDate = new Date(response.data.expiresAt);

			return expirationDate;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			return undefined;
		}
	};

	return { getSessionTokenExpiration };
};
