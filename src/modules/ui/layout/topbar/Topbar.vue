<template>
	<VAppBar flat :height="appBarHeight">
		<CloudLogo v-if="!sidebarExpanded" class="mt-1" />
		<template #prepend>
			<VAppBarNavIcon
				v-if="!sidebarExpanded"
				:icon="mdiMenu"
				size="default"
				data-test-id="sidebar-toggle"
				@click="() => $emit('sidebar-toggled')"
			/>
		</template>
		<VSpacer />
		<TopbarItem
			v-if="showStatusAlertIcon"
			class="mr-2"
			:icon="mdiAlert"
			:color="statusAlertColor"
			:aria-label="$t('global.topbar.actions.alerts')"
			:title="$t('global.topbar.actions.alerts')"
			data-test-id="status-alerts-icon"
		>
			<CloudStatusMessages :status-alerts="statusAlerts" />
		</TopbarItem>
		<TopbarItem
			v-if="isTabletOrBigger"
			class="mr-2"
			:icon="mdiQrcode"
			:aria-label="$t('global.topbar.actions.qrCode')"
			:title="$t('global.topbar.actions.qrCode')"
			data-test-id="qr-code-btn"
		>
			<PageShare />
		</TopbarItem>
		<div
			v-if="school && isTabletOrBigger"
			class="mr-3 mr-lg-4 school-name"
			data-testid="school-name"
		>
			{{ school.name }}
		</div>
		<img
			v-if="hasLogo && isDesktop"
			:src="school!.logo.url"
			alt=""
			class="school-logo mr-3"
			data-testid="school-logo"
		/>
		<UserMenu v-if="user" :user="user" :role-names="roleNames" class="mr-3" />
	</VAppBar>
</template>

<script setup lang="ts">
import { ComputedRef, computed, onMounted } from "vue";
import { useDisplay } from "vuetify";
import {
	AUTH_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { mdiMenu, mdiAlert, mdiQrcode } from "@icons/material";
import TopbarItem from "./TopbarItem.vue";
import PageShare from "./PageShare.vue";
import CloudStatusMessages from "./CloudStatusMessages.vue";
import UserMenu from "./UserMenu.vue";
import { StatusAlert } from "@/store/types/status-alert";
import CloudLogo from "../CloudLogo.vue";

defineProps({
	sidebarExpanded: {
		type: Boolean,
		required: true,
	},
});

defineEmits(["sidebar-toggled"]);

const statusAlertsModule = injectStrict(STATUS_ALERTS_MODULE_KEY);
const authModule = injectStrict(AUTH_MODULE_KEY);

const { lgAndUp, mdAndUp } = useDisplay();

const isDesktop = computed(() => {
	return lgAndUp.value;
});

const isTabletOrBigger = computed(() => {
	return mdAndUp.value;
});

onMounted(() => {
	(async () => {
		await statusAlertsModule.fetchStatusAlerts();
	})();
});

const statusAlerts: ComputedRef<StatusAlert[]> = computed(() => {
	return statusAlertsModule.getStatusAlerts;
});

const showStatusAlertIcon = computed(() => {
	return statusAlerts.value.length !== 0;
});

const statusAlertColor = computed(() => {
	const statusAlertsIncludeDanger =
		statusAlerts.value.filter((alert) => alert.status === "danger").length !==
		0;

	return statusAlertsIncludeDanger ? "error" : "info";
});

const user = computed(() => {
	return authModule.getUser;
});

const school = computed(() => {
	return authModule.getSchool;
});

const roleNames = computed(() => {
	return authModule.getUserRoles;
});

const hasLogo = computed(() => {
	return !!school.value?.logo?.url;
});

const appBarHeight = computed(() => {
	const height = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue("--topbar-height");
	const heightWithoutUnit = parseInt(height);

	return heightWithoutUnit;
});
</script>

<style scoped>
.school-name {
	max-width: 280px;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.school-logo {
	max-height: 40px;
	max-width: 160px;
}
</style>
