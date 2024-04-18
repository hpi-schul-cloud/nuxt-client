<template>
	<VAppBar flat>
		<template v-slot:prepend>
			<VAppBarNavIcon
				:icon="sidebarToggleIcon"
				@click="() => $emit('sidebar-toggled')"
			/>
		</template>
		<VSpacer />
		<VMenu v-if="showStatusAlertIcon">
			<template v-slot:activator="{ props }">
				<VBtn
					v-bind="props"
					icon="$mdiAlert"
					class="mx-1"
					:title="$t('global.topbar.actions.alerts')"
					:aria-label="$t('global.topbar.actions.alerts')"
					:color="statusAlertColor"
					data-testid="status-alerts-icon"
				/>
			</template>
			<StatusAlerts :status-alerts="statusAlerts" />
		</VMenu>
		<VMenu>
			<template v-slot:activator="{ props }">
				<v-btn
					v-bind="props"
					icon="$mdiQrcode"
					class="mx-1"
					:title="$t('global.topbar.actions.qrCode')"
					:aria-label="$t('global.topbar.actions.qrCode')"
					data-testid="qr-code-btn"
				/>
			</template>
			<VCard>
				<menu-qr-code />
			</VCard>
		</VMenu>
		<div v-if="school" class="mx-1">
			{{ school.name }}
		</div>
		<img
			v-if="school?.logo?.url"
			class="school-logo"
			:src="school.logo.url"
			ref="image"
			alt=""
		/>
		<popup-icon-initials
			v-if="user"
			:first-name="user.firstName || 'Unknown'"
			:last-name="user.lastName || 'Unknown'"
			:user-role="translatedRoleName"
			class="item"
			data-testid="item"
		>
			<language-menu />
			<a
				href="/account"
				class="account-link"
				role="menuitem"
				:aria-label="$t('global.topbar.settings').toString()"
				data-testid="account-link"
			>
				{{ $t("global.topbar.settings") }}
			</a>
			<button
				class="logout-button"
				data-testid="logout"
				role="menuitem"
				:aria-label="$t('common.labels.logout').toString()"
				@click="sendEvent('logout')"
			>
				{{ $t("common.labels.logout") }}
			</button>
		</popup-icon-initials>
	</VAppBar>
</template>

<script setup lang="">
import { computed, onMounted, toRef } from "vue";
import {
	AUTH_MODULE_KEY,
	STATUS_ALERTS_MODULE_KEY,
	injectStrict,
} from "@/utils/inject";
import { useI18n } from "vue-i18n";
import { mdiMenuOpen, mdiMenu } from "@/components/icons/material";
import LanguageMenu from "@/components/topbar/LanguageMenu.vue";
import MenuQrCode from "@/components/topbar/MenuQrCode.vue";
import PopupIconInitials from "@/components/topbar/PopupIconInitials.vue";
import StatusAlerts from "@/components/topbar/StatusAlerts.vue";

const props = defineProps({
	sidebarExpanded: {
		type: Boolean,
		required: true,
	},
});

const { t } = useI18n();
const authModule = injectStrict(AUTH_MODULE_KEY);

const statusAlertsModule = injectStrict(STATUS_ALERTS_MODULE_KEY);

onMounted(() => {
	(async () => {
		await statusAlertsModule.fetchStatusAlerts();
	})();
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
const translatedRoleName = computed(() => {
	return t(`common.roleName.${roleNames.value[0]}`).toString();
});

const statusAlerts = computed(() => {
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

	return statusAlertsIncludeDanger
		? "rgba(var(--v-theme-error))"
		: "rgba(var(--v-theme-info))";
});

const sidebarToggleIcon = computed(() => {
	return toRef(props.sidebarExpanded).value ? mdiMenuOpen : mdiMenu;
});
</script>

<style lang=""></style>
