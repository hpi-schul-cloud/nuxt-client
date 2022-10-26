import { AxiosInstance } from "axios";

let $axios: AxiosInstance;

export function initializeAxios(axios: AxiosInstance) {
	$axios = axios;
}

export { $axios };
