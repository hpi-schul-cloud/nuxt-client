<template>
	<KebabMenuAction
		:icon="mdiShareVariantOutline"
		data-testid="kebab-menu-action-share"
	>
		{{ text ?? t("common.actions.shareCopy") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiShareVariantOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	text: { type: String, required: false, default: undefined },
});
</script>
