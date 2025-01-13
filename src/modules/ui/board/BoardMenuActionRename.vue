<template>
	<BoardMenuAction
		:icon="mdiRenameOutline"
		data-testid="board-menu-action-rename"
	>
		{{ t("common.actions.rename") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiRenameOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
