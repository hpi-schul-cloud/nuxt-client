<template>
	<InfoAlert v-if="!!dashboardAnnouncement" class="mb-4" data-testid="dashboard-announcement-alert">{{
		dashboardAnnouncement
	}}</InfoAlert>
</template>

<script setup lang="ts">
import { useI18nGlobal } from "@/plugins/i18n";
import { $axios } from "@/utils/api";
import { LanguageType, RuntimeConfigApiFactory } from "@api-server";
import { useAppStore } from "@data-app";
import { InfoAlert } from "@ui-alert";
import { computed, onMounted, reactive } from "vue";

type RuntimeConfigAnnouncement = {
	DASHBOARD_ANNOUNCEMENT_ENABLED: boolean;
	DASHBOARD_ANNOUNCEMENT_FOR_ROLES: string;
	DASHBOARD_ANNOUNCEMENT_TEXT_DE: string;
	DASHBOARD_ANNOUNCEMENT_TEXT_EN: string;
	DASHBOARD_ANNOUNCEMENT_TEXT_ES: string;
	DASHBOARD_ANNOUNCEMENT_TEXT_UK: string;
};

const runtimeConfigApi = RuntimeConfigApiFactory(undefined, "/v3", $axios);
const runtimeConfigAnnouncement = reactive<RuntimeConfigAnnouncement>({
	DASHBOARD_ANNOUNCEMENT_ENABLED: false,
	DASHBOARD_ANNOUNCEMENT_FOR_ROLES: "",
	DASHBOARD_ANNOUNCEMENT_TEXT_DE: "",
	DASHBOARD_ANNOUNCEMENT_TEXT_EN: "",
	DASHBOARD_ANNOUNCEMENT_TEXT_ES: "",
	DASHBOARD_ANNOUNCEMENT_TEXT_UK: "",
});

const fetchRuntimeAnnouncement = async () => {
	const { data } = await runtimeConfigApi.runtimeConfigControllerGetRuntimeConfig();

	if (data?.data) {
		const configMap = Object.fromEntries(data.data.map((item) => [item.key, item.value]));
		Object.assign(runtimeConfigAnnouncement, configMap);
	}
};

const dashboardAnnouncement = computed((): string | undefined => {
	if (!runtimeConfigAnnouncement.DASHBOARD_ANNOUNCEMENT_ENABLED) {
		return undefined;
	}

	const userRoles = useAppStore().userRoles;
	const rolesForAnnouncement = runtimeConfigAnnouncement.DASHBOARD_ANNOUNCEMENT_FOR_ROLES.split(",");

	if (!userRoles.some((role) => rolesForAnnouncement.includes(role))) {
		return undefined;
	}

	const { locale } = useI18nGlobal();
	const textByLocale: Record<LanguageType, string> = {
		[LanguageType.DE]: runtimeConfigAnnouncement.DASHBOARD_ANNOUNCEMENT_TEXT_DE,
		[LanguageType.EN]: runtimeConfigAnnouncement.DASHBOARD_ANNOUNCEMENT_TEXT_EN,
		[LanguageType.ES]: runtimeConfigAnnouncement.DASHBOARD_ANNOUNCEMENT_TEXT_ES,
		[LanguageType.UK]: runtimeConfigAnnouncement.DASHBOARD_ANNOUNCEMENT_TEXT_UK,
	};

	return textByLocale[locale.value as LanguageType];
});

onMounted(() => {
	fetchRuntimeAnnouncement();
});
</script>
