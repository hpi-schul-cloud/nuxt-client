<template>
	<KebabMenuAction
		:icon="mdiPencilOutline"
		data-testid="board-menu-action-edit"
	>
		{{ t("common.actions.edit") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import KebabMenuAction from "./KebabMenuAction.vue";
import { mdiPencilOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
