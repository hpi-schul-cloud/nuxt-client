import Vue from "vue";

interface Theme {
	name: string;
}
declare module "vue/types/vue" {
	interface Vue {
		$mq(): string;
		$theme: Theme;
	}
}
