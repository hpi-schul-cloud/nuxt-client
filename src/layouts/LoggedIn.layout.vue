<template>
	<div>
		<SkipLink />
		<Sidebar v-model="sidebarExpanded" />
		<Topbar :sidebar-expanded="sidebarExpanded" @sidebar-toggled="onToggleSidebar" />
		<v-main id="main-content" :class="{ 'position-fixed w-100': !isDesktop && sidebarExpanded }">
			<ApplicationError>
				<router-view />
			</ApplicationError>
		</v-main>
		<loading-state-dialog />
		<keep-alive>
			<AutoLogoutWarning />
		</keep-alive>
	</div>
</template>

<script setup lang="ts">
import ApplicationError from "@/components/molecules/ApplicationError.vue";
import { AutoLogoutWarning } from "@feature-auto-logout";
import { Sidebar, Topbar } from "@ui-layout";
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
