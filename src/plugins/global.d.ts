import Vue from "vue";

interface Theme {
	name: string;
	short_name: string;
}
declare module "vue/types/vue" {
	interface Vue {
		$mq(): string;
		$theme: Theme;
	}
}
