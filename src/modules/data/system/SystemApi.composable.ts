import { PublicSystemResponse, SystemsApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { AxiosResponse } from "axios";
import { System } from "./type";
import { useErrorHandler } from "@/components/error-handling/ErrorHandler.composable";

export const useSystemApi = () => {
	const { handleError } = useErrorHandler();
	const systemApi = SystemsApiFactory(undefined, "/v3", $axios);

	const getSystem = async (systemId: string): Promise<System | undefined> => {
		try {
			const response: AxiosResponse<PublicSystemResponse> =
				await systemApi.systemControllerGetSystem(systemId);

			const system: System = {
				id: response.data.id,
				displayName: response.data.displayName ?? "",
				hasEndSessionEndpoint: !!response.data.oauthConfig?.endSessionEndpoint,
			};

			return system;
		} catch (error) {
			handleError(error, {
				404: undefined,
				500: undefined,
			});
		}
	};

	return {
		getSystem,
	};
};
