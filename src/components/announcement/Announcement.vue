<template>
	<InfoAlert v-if="!!dashboardAnnouncement" class="mb-4" data-testid="dashboard-announcement-alert">
		<RenderHTML :html="dashboardAnnouncement" />
	</InfoAlert>
</template>

<script setup lang="ts">
import { useI18nGlobal } from "@/plugins/i18n";
import { useAppStore } from "@data-app";
import { useRuntimeConfig } from "@data-runtime";
import { RenderHTML } from "@feature-render-html";
import { InfoAlert } from "@ui-alert";
import { computed, Ref } from "vue";

const dashboardAnnouncement = computed((): string | undefined => {
	const runtimeConfig = useRuntimeConfig() as unknown as Ref<{ key: string; value: string | boolean }[]>;

	if (!runtimeConfig.value) {
		return undefined;
	}

	const asObject = runtimeConfig.value?.reduce(
		(acc, { key, value }) => {
			acc[key] = value;
			return acc;
		},
		{} as Record<string, string | boolean>
	);

	if (!asObject.DASHBOARD_ANNOUNCEMENT_ENABLED) {
		return undefined;
	}

	const userRoles = useAppStore().userRoles;
	const rolesForAnnouncement = (asObject.DASHBOARD_ANNOUNCEMENT_FOR_ROLES as string).split(",");

	if (!userRoles.some((role) => rolesForAnnouncement.includes(role))) {
		return undefined;
	}

	const { locale } = useI18nGlobal();

	const langKey = `DASHBOARD_ANNOUNCEMENT_TEXT_${locale.value.toUpperCase()}`;

	return runtimeConfig.value.find((item) => item.key === langKey)?.value as string | undefined;
});
</script>
