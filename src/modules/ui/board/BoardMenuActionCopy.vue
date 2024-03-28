<template>
	<BoardMenuAction
		:icon="mdiContentCopy"
		@click="onClick"
		data-testid="board-menu-action-copy"
	>
		{{ $t("common.actions.copy") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiContentCopy } from "@/components/icons/material";

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
