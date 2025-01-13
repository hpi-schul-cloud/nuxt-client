<template>
	<KebabMenuAction
		:icon="mdiRenameOutline"
		data-testid="board-menu-action-rename"
	>
		{{ t("common.actions.rename") }}
	</KebabMenuAction>
</template>

<script setup lang="ts">
import { KebabMenuAction } from "@ui-board";
import { mdiRenameOutline } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>
