<template>
	<VToolbar :height="appBarHeight" class="top-bar">
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
			:aria-label="t('global.topbar.actions.alerts')"
			data-test-id="status-alerts-icon"
		>
			<CloudStatusMessages :status-alerts="statusAlerts" />
		</TopbarItem>
		<TopbarItem
			v-if="isTabletOrBigger"
			class="mr-2"
			:icon="mdiQrcode"
			:aria-label="t('global.topbar.actions.qrCode')"
			data-test-id="qr-code-btn"
		>
			<PageShare />
		</TopbarItem>
		<div v-if="school && isTabletOrBigger" class="mr-3 mr-lg-4 school-name" data-testid="school-name">
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
	</VToolbar>
</template>

<script setup lang="ts">
import CloudLogo from "../CloudLogo.vue";
import CloudStatusMessages from "./CloudStatusMessages.vue";
import PageShare from "./PageShare.vue";
import TopbarItem from "./TopbarItem.vue";
import UserMenu from "./UserMenu.vue";
import { useAppStoreRefs, useStatusAlerts } from "@data-app";
import { mdiAlert, mdiMenu, mdiQrcode } from "@icons/material";
import { useWindowScroll } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";

const { y } = useWindowScroll();
const isScrollingDown = ref(false);
const { fetchStatusAlerts, statusAlerts } = useStatusAlerts();
const { t } = useI18n();

watch(y, (newVal, oldVal) => {
	isScrollingDown.value = newVal > oldVal;
});

defineProps({
	sidebarExpanded: {
		type: Boolean,
		required: true,
	},
});

defineEmits(["sidebar-toggled"]);

const { lgAndUp: isDesktop, mdAndUp: isTabletOrBigger } = useDisplay();

onMounted(() => {
	fetchStatusAlerts();
});

const showStatusAlertIcon = computed(() => statusAlerts.value.length !== 0);

const statusAlertColor = computed(() => {
	const statusAlertsIncludeDanger = statusAlerts.value.filter((alert) => alert.status === "danger").length !== 0;

	return statusAlertsIncludeDanger ? "error" : "info";
});

const { user, school, userRoles: roleNames } = useAppStoreRefs();

const hasLogo = computed(() => school.value?.logo?.url !== undefined);

const appBarHeight = computed(() => {
	const height = window.getComputedStyle(document.documentElement).getPropertyValue("--topbar-height");
	return parseInt(height);
});
</script>

<style scoped>
.top-bar {
	position: sticky;
	background-color: #fff !important;
	top: 0;
	z-index: 1000;
	transition: top 0.2s ease-in-out;
}

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
