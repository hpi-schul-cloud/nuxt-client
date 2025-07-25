import { MeResponse } from "@/serverApi/v3";

declare module "vue/types/vue" {
	interface Vue {
		$me: MeResponse;
	}
}
