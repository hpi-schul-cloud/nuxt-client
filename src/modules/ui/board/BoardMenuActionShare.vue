<template>
	<BoardMenuAction
		:icon="mdiShareVariantOutline"
		data-testid="board-menu-action-share"
	>
		{{ t("common.actions.shareCopy") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiShareVariantOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
