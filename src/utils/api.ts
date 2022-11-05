import { AxiosInstance } from "axios";
import Vue from "vue";

let $axios: AxiosInstance;

export function initializeAxios(axios: AxiosInstance) {
	$axios = axios;
	Vue.prototype.$axios = axios;
}

export { $axios };
