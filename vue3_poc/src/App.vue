<template>
	<div class="mx-auto w-50">
		<div class="text-right"><v-btn @click="onLogout">Logout</v-btn></div>
		<router-view />
	</div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "./store/auth";

export default defineComponent({
	setup() {
		const authStore = useAuthStore();

		const onLogout = () => {
			authStore.logout();
			window.location.assign("/logout");
		};

		return {
			onLogout,
		};
	},
});
</script>
