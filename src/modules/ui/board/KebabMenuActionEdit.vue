<template>
	<KebabMenuAction
		:icon="mdiPencilOutline"
		data-testid="board-menu-action-edit"
	>
		{{ t("common.actions.edit") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiPencilOutline } from "@icons/material";
import { KebabMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
