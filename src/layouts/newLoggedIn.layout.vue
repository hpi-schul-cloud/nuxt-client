<template>
	<div>
		<!-- TODO - Skip Links not visible -->
		<SkipLinks />
		<Sidebar v-model="sidebarExpanded" />
		<Topbar
			:sidebar-expanded="sidebarExpanded"
			@sidebar-toggled="onToggleSidebar"
		/>
		<v-main
			id="main-content"
			:class="{ 'fixed-position': isMobile && sidebarExpanded }"
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
import SkipLinks from "@/components/molecules/SkipLinks.vue";
import { Sidebar, Topbar } from "@ui-layout";
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";
import autoLogoutWarning from "@/components/organisms/AutoLogoutWarning.vue";

const { lgAndUp, mdAndDown } = useDisplay();

const isDesktop = computed(() => {
	return lgAndUp.value;
});

const isMobile = computed(() => {
	return mdAndDown.value;
});

const sidebarExpanded = ref(isDesktop.value);

const onToggleSidebar = () => {
	sidebarExpanded.value = !sidebarExpanded.value;
};
</script>
<style lang="scss" scoped>
.fixed-position {
	position: fixed;
	width: 100%;
}
</style>
