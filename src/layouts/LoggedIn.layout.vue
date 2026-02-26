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
		<LoadingStateDialog />
		<KeepAlive>
			<AutoLogoutWarning />
			<LoggedOutDialog />
		</KeepAlive>
	</div>
</template>

<script setup lang="ts">
import { AutoLogoutWarning, LoggedOutDialog } from "@feature-auto-logout";
import { AlertContainer, ApplicationError, Sidebar, Topbar } from "@ui-layout";
import { LoadingStateDialog } from "@ui-loading-state-dialog";
import { SkipLink } from "@ui-skip-link";
import { useStorage } from "@vueuse/core";
import { computed, watch } from "vue";
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
</script>
