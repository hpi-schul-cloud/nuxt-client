<template>
	{{ userLanguage }}
	{{ t("common.actions.create") }}
	<Registration />
</template>

<script setup lang="ts">
import { createI18n } from "@/plugins/i18n";
import { Registration } from "@feature-room";

const useUserLanguage = (): string => {
	const match = document.cookie.match(/(?:^|;\s*)USER_LANG=([^;]*)/);
	return match?.[1] || "de";
};

const userLanguage = useUserLanguage();
const i18n = createI18n();
i18n.global.locale.value = userLanguage;

const { t } = i18n.global;
</script>
