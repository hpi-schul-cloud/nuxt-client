<template>
	<v-app>
		<v-navigation-drawer v-if="isLoggedIn">
			NavigationDrawer
		</v-navigation-drawer>
		<v-app-bar flat>
			<v-app-bar-title>dBildungscloud</v-app-bar-title>
			<v-btn v-if="isLoggedIn" @click="onLogout">Logout</v-btn>
		</v-app-bar>
		<v-main>
			<slot />
		</v-main>
		<v-footer app>Footer</v-footer>
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
