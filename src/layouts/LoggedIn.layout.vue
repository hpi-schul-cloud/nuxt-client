<template>
	<div>
		<SkipLink />
		<Sidebar v-model="sidebarExpanded" v-if="sidebarExpanded" />
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
import AlertContainer from "@/components/molecules/AlertContainer.vue";
import ApplicationErrorWrapper from "@/components/molecules/ApplicationErrorWrapper.vue";
import LoadingStateDialog from "@/components/molecules/LoadingStateDialog.vue";
import autoLogoutWarning from "@/components/organisms/AutoLogoutWarning.vue";
import { Sidebar, Topbar } from "@ui-layout";
import { SkipLink } from "@ui-skip-link";
import { computed, onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const { lgAndUp } = useDisplay();

const isDesktop = computed(() => {
	return lgAndUp.value;
});

const sidebarExpanded = ref(isDesktop.value);

const onToggleSidebar = () => {
	sidebarExpanded.value = !sidebarExpanded.value;
};

watch(sidebarExpanded, (value) => {
	localStorage.setItem("sidebarExpanded", value.toString());
});

onMounted(() => {
	const sidebarExpandedValue = localStorage.getItem("sidebarExpanded");
	sidebarExpanded.value = sidebarExpandedValue === "true" || false;
});
</script>
