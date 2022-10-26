import { AxiosInstance } from "axios";

declare module "vue/types/vue" {
	export interface Vue {
		$axios: AxiosInstance;
	}

	export interface VueConstructor {
		axios: AxiosInstance;
	}
}
