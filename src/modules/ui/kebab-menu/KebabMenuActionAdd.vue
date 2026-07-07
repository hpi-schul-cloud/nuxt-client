<template>
	<KebabMenuAction :icon="mdiPlus" data-testid="kebab-menu-action-add">
		{{ text ?? t("common.actions.add") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiPlus } from "@icons/material";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
	text: { type: String, required: false, default: undefined },
});
</script>
