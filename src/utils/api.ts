import { ApiResponseError } from "@/store/types/commons";
import { AxiosInstance, isAxiosError } from "axios";
import Vue from "vue";

let $axios: AxiosInstance;

export function initializeAxios(axios: AxiosInstance) {
	$axios = axios;
	Vue.prototype.$axios = axios;
}

export const mapAxiosErrorToApiResponseError = (
	error: unknown
): ApiResponseError => {
	const apiError = { message: "", code: 0, title: "", type: "" };

	if (isAxiosError(error)) {
		const { message, code, title, type } = error.response?.data;

		apiError.message = message;
		apiError.code = code;
		apiError.title = title;
		apiError.type = type;
	} else if (error instanceof Error) {
		apiError.message = error.message;
	}

	return apiError;
};

export { $axios };
