interface Theme {
	name: string;
}
declare module "vue/types/vue" {
	interface Vue {
		$theme: Theme;
	}
}
