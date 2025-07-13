<template>
	<KebabMenuAction
		:icon="mdiContentCopy"
		data-testid="kebab-menu-action-room-copy"
	>
		{{ t("common.actions.duplicate") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiContentCopy } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
