<template>
	<div>
		<SkipLink />
		<Sidebar v-model="sidebarExpanded" />
		<Topbar
			:sidebar-expanded="sidebarExpanded"
			@sidebar-toggled="onToggleSidebar"
		/>
		<v-main
			id="main-content"
			:class="{ 'position-fixed w-100': !isDesktop && sidebarExpanded }"
		>
			<application-error-wrapper>
				<AlertContainer />
				<router-view />
			</application-error-wrapper>
		</v-main>
		<loading-state-dialog />
		<keep-alive>
			<AutoLogoutWarning />
		</keep-alive>
	</div>
</template>

<script setup lang="ts">
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";
import { AutoLogoutWarning } from "@feature-auto-logout";
import { LoadingStateDialog } from "@ui-loading-state-dialog";
import { Sidebar, Topbar } from "@ui-layout";
import { SkipLink } from "@ui-skip-link";
import { useStorage } from "@vueuse/core";
import { computed, watch } from "vue";
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();

const isDesktop = computed(() => {
	return lgAndUp.value;
});

const sidebarExpanded = useStorage("sidebarExpanded", isDesktop.value);

watch(isDesktop, () => {
	sidebarExpanded.value = lgAndUp.value;
});

const onToggleSidebar = () => {
	sidebarExpanded.value = !sidebarExpanded.value;
};
</script>
