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
			<autoLogoutWarning />
		</keep-alive>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import { SkipLink } from "@ui-skip-link";
import { Sidebar, Topbar } from "@ui-layout";
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";
import autoLogoutWarning from "@/components/organisms/AutoLogoutWarning.vue";

const { lgAndUp } = useDisplay();

const isDesktop = computed(() => {
	return lgAndUp.value;
});

const sidebarExpanded = ref(isDesktop.value);

const onToggleSidebar = () => {
	sidebarExpanded.value = !sidebarExpanded.value;
};
</script>
