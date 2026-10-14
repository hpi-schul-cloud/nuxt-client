<template>
	<div>
		<SkipLink />
		<Sidebar v-model="sidebarExpanded" />
		<Topbar :sidebar-expanded="sidebarExpanded" @sidebar-toggled="onToggleSidebar">
			<template v-if="isQuickNavigationEnabled" #search>
				<QuickNavTrigger />
			</template>
		</Topbar>
		<QuickNavDialog v-if="isQuickNavigationEnabled" />
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
import { notifyFromQueryParams } from "@/utils/toast-query.utils";
import { useEnvConfig } from "@data-env";
import { useNotificationListenerStore } from "@data-notification";
import { AutoLogoutWarning } from "@feature-auto-logout";
import { QuickNavDialog, QuickNavTrigger } from "@feature-quick-nav";
import { AlertContainer, ApplicationError, Sidebar, Topbar } from "@ui-layout";
import { SkipLink } from "@ui-skip-link";
import { useStorage } from "@vueuse/core";
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useRouter } from "vue-router";
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();

const isDesktop = computed(() => lgAndUp.value);

const isQuickNavigationEnabled = computed(() => useEnvConfig().value.FEATURE_QUICK_NAVIGATION_ENABLED);

const sidebarExpanded = useStorage("sidebarExpanded", isDesktop.value);

useRouter()
	.isReady()
	.then(() => {
		notifyFromQueryParams();
	});

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
