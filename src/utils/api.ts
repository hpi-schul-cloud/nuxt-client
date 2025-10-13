import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { isObject } from "@vueuse/core";
import { AxiosInstance, isAxiosError } from "axios";
import { getCurrentInstance } from "vue";

let $axios: AxiosInstance;

export const initializeAxios = (axios: AxiosInstance) => {
	$axios = axios;
	const app = getCurrentInstance()?.appContext.app;
	if (app) {
		app.config.globalProperties.$axios = axios;
	}
};

export const mapAxiosErrorToResponseError = (error: unknown): ApiResponseError | ApiValidationError => {
	let apiError: ApiResponseError | ApiValidationError = {
		message: "UNKNOWN_ERROR",
		code: 1,
		title: "",
		type: "Unknown error",
	};

	if (isAxiosError<ApiValidationError | ApiResponseError, Record<string, unknown>>(error)) {
		const errorPayload = error.response?.data;
		if (errorPayload && isObject(errorPayload)) {
			apiError = errorPayload;
		} else if (typeof errorPayload === "string") {
			apiError.message = errorPayload;
			apiError.code = error.response?.status || apiError.code;
			apiError.type = error.code || apiError.type;
			apiError.title = error.response?.statusText || apiError.title;
		}
	}
	return apiError;
};

export { $axios };
