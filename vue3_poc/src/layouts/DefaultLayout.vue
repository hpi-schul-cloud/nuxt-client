<template>
	<v-app>
		<v-navigation-drawer v-if="isLoggedIn" color="grey">
			NavigationDrawer
		</v-navigation-drawer>
		<v-app-bar flat color="blue-grey">
			<v-app-bar-title>dBildungscloud</v-app-bar-title>
			<v-btn v-if="isLoggedIn" @click="onLogout">Logout</v-btn>
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
		<v-footer app color="blue-grey" height="200">Footer</v-footer>
	</v-app>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useAuthStore } from "@/store/auth";

export default defineComponent({
	setup() {
		const authStore = useAuthStore();

		const onLogout = () => {
			authStore.logout();
			window.location.assign("/logout");
		};

		const isLoggedIn = computed(() => authStore.isLoggedIn);

		return {
			onLogout,
			isLoggedIn,
		};
	},
});
</script>
