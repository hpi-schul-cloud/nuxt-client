<template>
	<KebabMenuAction
		:icon="mdiPencilOutline"
		data-testid="kebab-menu-action-edit"
	>
		{{ text ?? t("common.actions.edit") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiPencilOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
defineProps({
	text: { type: String, required: false, default: undefined },
});
</script>
