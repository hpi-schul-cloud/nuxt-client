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

// const { dashboardAnnouncement } = storeToRefs(useRuntimeConfigStore());

// const parseRuntimeConfig = (entries: RuntimeConfig[]): RuntimeConfig =>
// 	Object.fromEntries(entries.map(({ key, value, description, type }) => [key, { value, description, type }]));

const dashboardAnnouncement = computed((): string | undefined => {
	const { runtimeConfig } = useRuntimeConfigStore();

	if (!runtimeConfig.value.DASHBOARD_ANNOUNCEMENT_ENABLED) {
		return undefined;
	}

	const userRoles = useAppStore().userRoles;
	const rolesForAnnouncement = String(runtimeConfig.value.DASHBOARD_ANNOUNCEMENT_FOR_ROLES).split(",");
	const hasMatchingRole = userRoles.some((role) => rolesForAnnouncement.includes(role));

	if (!hasMatchingRole) {
		return undefined;
	}

	const { locale } = useI18nGlobal();
	const langKey = `DASHBOARD_ANNOUNCEMENT_TEXT_${locale.value.toUpperCase()}`;

	return runtimeConfig.value[langKey]?.value as string | undefined;
});
</script>
