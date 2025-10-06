<template>
	<KebabMenuAction :icon="mdiEyeOutline" data-testid="kebab-menu-action-publish">
		{{ t("common.action.publish") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiEyeOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
