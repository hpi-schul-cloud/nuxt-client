<template>
	<BoardMenuAction
		:icon="mdiContentCopy"
		data-testid="board-menu-action-copy"
		@click="onClick"
	>
		{{ t("common.actions.copy") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiContentCopy } from "@icons/material";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
