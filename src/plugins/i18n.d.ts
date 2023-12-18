// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from "vue";

declare module "vue/types/vue" {
	interface Vue {
		$ts(key: string): string;
	}
}
