<template>
	<BoardMenuAction
		:icon="mdiRestore"
		@click="onClick"
		data-testid="board-menu-action-revert"
	>
		{{ t("pages.room.cards.label.revert") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { mdiRestore } from "@mdi/js";
import { BoardMenuAction } from "@ui-board";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
