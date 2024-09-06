<template>
	<BoardMenuAction
		:icon="mdiRestore"
		data-testid="board-menu-action-revert"
		@click="onClick"
	>
		{{ t("pages.room.cards.label.revert") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiRestore } from "@icons/material";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
