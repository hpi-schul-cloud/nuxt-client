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
const { runtimeConfig } = useRuntimeConfigStore();

const dashboardAnnouncement = computed((): string | undefined => {
	if (!runtimeConfig.DASHBOARD_ANNOUNCEMENT_ENABLED) {
		return undefined;
	}

	const userRoles = useAppStore().userRoles;
	const rolesForAnnouncement = getAnnouncementUserRoles();
	const hasMatchingRole = userRoles.some((role) => rolesForAnnouncement.has(simplifyRoleName(role)));

	if (!hasMatchingRole) {
		return undefined;
	}

	const langKey = `DASHBOARD_ANNOUNCEMENT_TEXT_${locale.value.toUpperCase()}`;
	return runtimeConfig[langKey] as string | undefined;
});

const getAnnouncementUserRoles = () => {
	const allowedUserRoles = String(runtimeConfig.DASHBOARD_ANNOUNCEMENT_FOR_ROLES ?? "");
	const simplifiedUserRoles = simplifyRoleName(allowedUserRoles);
	return new Set(simplifiedUserRoles.split(","));
};

const simplifyRoleName = (role: string) => role.replaceAll(/[^a-z,]+/gi, "").toLowerCase();
</script>
