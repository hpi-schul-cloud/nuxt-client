<template>
	<div>
		<SkipLink />
		<Sidebar v-model="sidebarExpanded" />
		<Topbar :sidebar-expanded="sidebarExpanded" @sidebar-toggled="onToggleSidebar" />
		<VMain id="main-content" :class="{ 'position-fixed w-100': !isDesktop && sidebarExpanded }">
			<ApplicationError>
				<AlertContainer />
				<router-view />
			</ApplicationError>
		</VMain>
		<KeepAlive>
			<AutoLogoutWarning />
		</KeepAlive>
	</div>
</template>

<script setup lang="ts">
import { useNotificationListenerStore } from "@data-notification";
import { AutoLogoutWarning } from "@feature-auto-logout";
import { AlertContainer, ApplicationError, Sidebar, Topbar } from "@ui-layout";
import { SkipLink } from "@ui-skip-link";
import { useStorage } from "@vueuse/core";
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();

const isDesktop = computed(() => lgAndUp.value);

const sidebarExpanded = useStorage("sidebarExpanded", isDesktop.value);

watch(isDesktop, () => {
	sidebarExpanded.value = lgAndUp.value;
});

const onToggleSidebar = () => {
	sidebarExpanded.value = !sidebarExpanded.value;
};

// Start SSE notification listener when layout mounts (user is logged in)
const notificationListener = useNotificationListenerStore();

onMounted(() => {
	notificationListener.startListening();
});

onUnmounted(() => {
	notificationListener.stopListening();
});
</script>
