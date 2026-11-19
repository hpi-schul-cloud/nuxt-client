<template>
	<VToolbar :height="appBarHeight" class="top-bar">
		<CloudLogo v-if="!sidebarExpanded" class="mt-1" />
		<div
			v-if="$slots.search && !isPhone"
			class="top-bar-search"
			:style="{ marginInlineStart: `${searchInset}px` }"
			data-testid="topbar-search"
		>
			<slot name="search" />
		</div>
		<!-- VToolbar keeps an empty prepend slot as a 4px box, which would push the search off the content edge -->
		<template v-if="!sidebarExpanded" #prepend>
			<VAppBarNavIcon
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
		<div v-if="$slots.search && isPhone" class="d-flex align-center mr-2" data-testid="topbar-search">
			<slot name="search" />
		</div>
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
import { SIDEBAR_WIDTH } from "../sidebar/sidebar-width";
import CloudStatusMessages from "./CloudStatusMessages.vue";
import PageShare from "./PageShare.vue";
import TopbarItem from "./TopbarItem.vue";
import UserMenu from "./UserMenu.vue";
import { useAppStoreRefs, useSchoolStoreRefs, useStatusAlerts } from "@data-app";
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

defineEmits(["sidebar-toggled"]);

const props = defineProps({
	sidebarExpanded: {
		type: Boolean,
		required: true,
	},
});

const { lgAndUp: isDesktop, mdAndUp: isTabletOrBigger, xs: isPhone } = useDisplay();

// Same as the horizontal padding of DefaultWireframe, where breadcrumbs and page titles start.
const CONTENT_GUTTER = 24;

// The toolbar runs underneath the sidebar, which only stays open beside the content on desktop.
// There the search starts where the page content starts; otherwise it follows the logo.
const searchInset = computed(() =>
	isDesktop.value && props.sidebarExpanded ? SIDEBAR_WIDTH + CONTENT_GUTTER : CONTENT_GUTTER
);
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

/*
 * Wide enough for "Nach Räumen, Kursen oder Aufgaben suchen" with the shortcut badge. Shrinks along with the
 * school name when space runs out, but never below a width that still reads as a field.
 */
.top-bar-search {
	display: flex;
	flex: 0 1 420px;
	min-width: 180px;
	margin-inline-end: 16px;
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
