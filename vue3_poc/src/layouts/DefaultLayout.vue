<template>
	<v-app>
		<v-navigation-drawer v-if="isLoggedIn">
			<v-list>
				<v-list-item>
					<v-img src="src/assets/logo-image-mono.svg"></v-img>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar flat>
			<template v-slot:append>
				<v-btn v-if="isLoggedIn" @click="onLogout">Logout</v-btn>
			</template>
		</v-app-bar>
		<v-main class="mx-6">
			<slot />
		</v-main>
		<v-footer app height="100">
			<v-row justify="center" no-gutters>
				<v-btn flat to="/">Home</v-btn>
				<v-btn flat to="/tasks">Tasks</v-btn>
				<v-btn flat to="/composition">Composition API</v-btn>
				<v-btn flat to="/vitest">Vuetify Welcome page</v-btn>
				<v-btn flat to="/imprint">Imprint</v-btn>
			</v-row>
		</v-footer>
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
