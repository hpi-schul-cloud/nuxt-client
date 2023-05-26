<template>
	<v-app>
		<component :is="layout">
			<router-view />
		</component>
	</v-app>
</template>

<script>
import { authModule } from "@/store";
import { Layouts } from "@/layouts/types";
import { I18N_KEY } from "./utils/injection-keys";
import { provide } from "vue";
import { i18n } from "./plugins/i18n";

const defaultLayout = Layouts.LOGGED_IN;

export default {
	setup() {
		provide(I18N_KEY, i18n);
	},
	computed: {
		layout() {
			let layout = defaultLayout;

			if (this.$route.meta?.layout) {
				layout = this.$route.meta?.layout;
			} else {
				layout = authModule.isLoggedIn ? Layouts.LOGGED_IN : Layouts.LOGGED_OUT;
			}

			return () => import(`@/layouts/${layout}.layout.vue`);
		},
		isLoggedIn() {
			return authModule.isLoggedIn;
		},
	},
};
</script>
