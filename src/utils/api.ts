import { useApplicationError } from "@/composables/application-error.composable";
import { AxiosError, AxiosInstance } from "axios";
import Vue from "vue";

let $axios: AxiosInstance;

export const setupApiErrorHandlers = (axios: AxiosInstance): void => {
	const onResponseError = (error: AxiosError): Promise<AxiosError> => {
		const status = error.response?.status ?? 500;

		if ([401, 403].includes(status)) {
			const { createApplicationError } = useApplicationError();
			return Promise.reject(createApplicationError(status));
		}

		return Promise.reject(error);
	};

	axios.interceptors.response.use(undefined, onResponseError);
};

export const initializeAxios = (axios: AxiosInstance) => {
	$axios = axios;
	Vue.prototype.$axios = axios;
};

export { $axios };
