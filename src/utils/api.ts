import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { AxiosError, AxiosInstance, isAxiosError } from "axios";
import Vue from "vue";

let $axios: AxiosInstance;

export function initializeAxios(axios: AxiosInstance) {
	$axios = axios;
	Vue.prototype.$axios = axios;
}

const createApiResponseError = (error: AxiosError): ApiResponseError => {
	const { message, code, title, type } = error.response
		?.data as ApiResponseError;

	return { message, code, title, type };
};

const createApiValidationError = (error: AxiosError): ApiValidationError => {
	const { message, code, title, type, validationErrors } = error.response
		?.data as ApiValidationError;

	return { message, code, title, type, validationErrors };
};

export const mapAxiosErrorToApiResponseError = (
	error: unknown
): ApiResponseError | ApiValidationError => {
	let apiError: ApiResponseError | ApiValidationError = {
		message: "",
		code: 0,
		title: "",
		type: "",
	};

	if (isAxiosError(error)) {
		const errorPayload = error.response?.data;
		apiError =
			"validationErrors" in errorPayload
				? createApiValidationError(errorPayload)
				: createApiResponseError(errorPayload);
	} else if (error instanceof Error) {
		apiError.message = error.message;
	}

	return apiError;
};

export { $axios };
