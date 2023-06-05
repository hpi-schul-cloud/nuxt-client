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

const defaultLayout = Layouts.LOGGED_IN;

export default {
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
