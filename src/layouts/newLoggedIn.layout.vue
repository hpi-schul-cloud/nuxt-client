<template>
	<div>
		<!-- TODO - Skip Links not visible -->
		<SkipLinks />
		<Sidebar v-model="sidebarExpanded" />
		<v-app-bar title="Application bar">
			<template v-slot:prepend>
				<v-app-bar-nav-icon
					:icon="sidebarToggleIcon"
					@click="onToggleSidebar"
				/>
			</template>
		</v-app-bar>

		<v-main id="main-content" class="content">
			<application-error-wrapper>
				<snackbar />
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
import Sidebar from "@/components/feature-layout/Sidebar.vue";
import Snackbar from "@/components/molecules/Alert.vue";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";
import autoLogoutWarning from "@/components/organisms/AutoLogoutWarning.vue";
import { mdiMenuClose, mdiMenuOpen } from "@/components/icons/material";

const { lgAndUp } = useDisplay();

const isDesktop = computed(() => {
	return lgAndUp.value;
});

const sidebarExpanded = ref(isDesktop.value);
const sidebarToggleIcon = computed(() => {
	return sidebarExpanded.value ? mdiMenuOpen : mdiMenuClose;
});

const onToggleSidebar = () => {
	sidebarExpanded.value = !sidebarExpanded.value;
};
</script>
