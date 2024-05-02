<template>
	<VAppBar flat>
		<template v-slot:prepend>
			<VAppBarNavIcon
				:icon="sidebarToggleIcon"
				@click="() => $emit('sidebar-toggled')"
				size="small"
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
			<StatusAlerts :status-alerts="statusAlerts" />
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
		<div v-if="school && isTabletOrBigger" class="mr-3 mr-lg-4">
			{{ school.name }}
		</div>
		<VImg
			v-if="hasLogo && isDesktop"
			:src="school!.logo.url"
			alt=""
			max-height="40"
			max-width="160"
			class="mr-3"
		/>
		<UserMenu v-if="user" :user="user" :role-names="roleNames" class="mr-3" />
	</VAppBar>
</template>

<script setup lang="ts">
import { ComputedRef, computed, onMounted, toRef } from "vue";
import { useDisplay } from "vuetify";
import {
	AUTH_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import {
	mdiMenuOpen,
	mdiMenu,
	mdiAlert,
	mdiQrcode,
} from "@/components/icons/material";
import TopbarItem from "./TopbarItem.vue";
import PageShare from "./PageShare.vue";
import StatusAlerts from "./StatusAlerts.vue";
import UserMenu from "./UserMenu.vue";
import { StatusAlert } from "@/store/types/status-alert";

const props = defineProps({
	sidebarExpanded: {
		type: Boolean,
		required: true,
	},
});

const statusAlertsModule = injectStrict(STATUS_ALERTS_MODULE_KEY);
const authModule = injectStrict(AUTH_MODULE_KEY);

const { lgAndUp, mdAndUp } = useDisplay();

const isDesktop = computed(() => {
	return lgAndUp.value;
});

const isTabletOrBigger = computed(() => {
	return mdAndUp.value;
});

const sidebarToggleIcon = computed(() => {
	return toRef(props.sidebarExpanded).value ? mdiMenuOpen : mdiMenu;
});

onMounted(() => {
	(async () => {
		await statusAlertsModule.fetchStatusAlerts();
	})();
});

const statusAlerts: ComputedRef<StatusAlert[]> = computed(() => {
	return [
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "info",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
		{
			title: "Currently, there are no courses here.",
			text: "Currently, there are no courses here.",
			status: "danger",
			origin: {
				page: "string",
				message_id: 2,
			},
			timestamp: "string",
			url: "string",
			createdAt: "string",
		},
	];
	// return statusAlertsModule.getStatusAlerts;
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
</script>
