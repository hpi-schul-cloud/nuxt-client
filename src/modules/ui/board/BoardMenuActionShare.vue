<template>
	<BoardMenuAction
		:icon="mdiShareVariantOutline"
		data-testid="board-menu-action-share"
		@click="onClick"
	>
		{{ $t("common.actions.shareCopy") }}
	</BoardMenuAction>
</template>

<script setup lang="ts">
import { BoardMenuAction } from "@ui-board";
import { mdiShareVariantOutline } from "@icons/material";

const emit = defineEmits(["click"]);

const onClick = ($event: Event) => emit("click", $event);
</script>
