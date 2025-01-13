<template>
	<BoardMenuAction
		:icon="mdiPencilOutline"
		data-testid="board-menu-action-edit"
	>
		{{ t("common.actions.edit") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiPencilOutline } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
