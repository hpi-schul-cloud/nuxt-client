<template>
	<div class="mx-auto w-50">
		<div class="text-right">
			<v-btn v-if="isLoggedIn" @click="onLogout">Logout</v-btn>
		</div>
		<router-view />
	</div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { useAuthStore } from "./store/auth";

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
