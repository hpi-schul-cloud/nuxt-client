<template>
	<BoardMenuAction
		:icon="mdiEyeOutline"
		data-testid="board-menu-action-publish"
	>
		{{ t("common.action.publish") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiEyeOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
