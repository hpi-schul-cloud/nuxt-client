// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue";
import { MeResponse } from "@/serverApi/v3";

declare module "vue/types/vue" {
	interface Vue {
		$me: MeResponse;
	}
}
