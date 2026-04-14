<template>
	<InfoAlert v-if="!!dashboardAnnouncement" class="mb-4" data-testid="dashboard-announcement-alert">
		<RenderHTML :html="dashboardAnnouncement" />
	</InfoAlert>
</template>

<script setup lang="ts">
import { useI18nGlobal } from "@/plugins/i18n";
import { useAppStore } from "@data-app";
import { useRuntimeConfigStore } from "@data-runtime-config";
import { RenderHTML } from "@feature-render-html";
import { InfoAlert } from "@ui-alert";
import { computed } from "vue";

const { locale } = useI18nGlobal();

const dashboardAnnouncement = computed((): string | undefined => {
	const { runtimeConfig } = useRuntimeConfigStore();
	if (!runtimeConfig.DASHBOARD_ANNOUNCEMENT_ENABLED) {
		return undefined;
	}

	const userRoles = useAppStore().userRoles;
	const rolesForAnnouncement = new Set(String(runtimeConfig.DASHBOARD_ANNOUNCEMENT_FOR_ROLES).split(","));
	const hasMatchingRole = userRoles.some((role) => rolesForAnnouncement.has(role));

	if (!hasMatchingRole) {
		return undefined;
	}

	const langKey = `DASHBOARD_ANNOUNCEMENT_TEXT_${locale.value.toUpperCase()}`;
	return runtimeConfig[langKey] as string | undefined;
});
</script>
