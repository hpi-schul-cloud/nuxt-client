<template>
	<KebabMenuAction
		:icon="mdiArrowLeft"
		data-testid="board-menu-action-move-left"
	>
		{{ t("components.board.action.moveLeft") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { mdiArrowLeft } from "@icons/material";
import { KebabMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
