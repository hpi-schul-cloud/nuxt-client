<template>
	<KebabMenuAction :icon="mdiContentCopy" :data-testid="testId">
		{{ t("common.actions.duplicate") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiContentCopy } from "@icons/material";
import { useAttrs } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const attrs = useAttrs();
const testId = attrs["data-testid"] ?? "kebab-menu-action-duplicate";
</script>
