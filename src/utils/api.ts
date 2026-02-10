import { ApiResponseError, ApiValidationError } from "@/store/types/commons";
import { useAutoLogout } from "@feature-auto-logout";
import { isObject } from "@vueuse/core";
import { AxiosInstance, HttpStatusCode, isAxiosError } from "axios";
import { getCurrentInstance } from "vue";

let $axios: AxiosInstance;
let isCheckingJWT = false;

// ob hier wirklich ein composable importiert werden sollte.. kann man bestimmt besser lösen
const { notifyBeingLoggedOut } = useAutoLogout();

export const initializeAxios = async (axios: AxiosInstance) => {
	$axios = axios;
	$axios.interceptors.response.use(
		(response) => response,
		(error) => {
			handleUnauthorizedError(error);
			return Promise.reject(error);
		}
	);
	const app = getCurrentInstance()?.appContext.app;
	if (app) {
		// warum hier das riginale axios? Damit wir keine neue Instanz aufmachen?
		// eher so? app.config.globalProperties.$axios = $axios;
		app.config.globalProperties.$axios = axios;
	}
};

const handleUnauthorizedError = async (error: unknown) => {
	if (isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized) {
		if (!isCheckingJWT) {
			isCheckingJWT = true;
			try {
				const response = await $axios.get("/v1/accounts/jwtTimer");
				const ttl = response?.data?.ttl;
				if (!ttl || ttl <= 0) {
					notifyBeingLoggedOut();
				}
			} catch {
				notifyBeingLoggedOut();
			} finally {
				isCheckingJWT = false;
			}
		}
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
