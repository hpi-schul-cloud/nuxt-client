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
		<!-- the quick navigation lives in a feature module, so the layout fills this in -->
		<VSpacer />
		<div
			class="d-flex align-center"
			:class="{ 'top-bar-search-centered': isDesktop }"
			:style="isDesktop ? { left: `calc(${mainRect.left}px + (100% - ${mainRect.left}px) / 2)` } : undefined"
			data-testid="topbar-search"
		>
			<slot name="search" />
		</div>
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
		<div v-if="schoolDetails && isTabletOrBigger" class="mr-3 mr-lg-4 school-name" data-testid="school-name">
			{{ schoolDetails.name }}
		</div>
		<img
			v-if="schoolDetails.logo?.dataUrl && isDesktop"
			:src="schoolDetails.logo.dataUrl"
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
import { useAppStoreRefs, useSchoolStoreRefs, useStatusAlerts } from "@data-app";
import { mdiAlert, mdiMenu, mdiQrcode } from "@icons/material";
import { useWindowScroll } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay, useLayout } from "vuetify";

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
// the topbar runs under the sidebar, so centre the search over the content area like the page below it
const { mainRect } = useLayout();

onMounted(() => {
	fetchStatusAlerts();
});

const showStatusAlertIcon = computed(() => statusAlerts.value.length !== 0);

const statusAlertColor = computed(() => {
	const statusAlertsIncludeDanger = statusAlerts.value.filter((alert) => alert.status === "danger").length !== 0;

	return statusAlertsIncludeDanger ? "error" : "info";
});

const { user, userRoles: roleNames } = useAppStoreRefs();
const { schoolDetails } = useSchoolStoreRefs();

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
	z-index: var(--z-floating);
	transition: top 0.2s ease-in-out;
}

.top-bar-search-centered {
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
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
