<template>
	<BoardMenu
		variant="outlined"
		:scope="BoardMenuScope.MEDIA_EXTERNAL_TOOL_ELEMENT"
		has-background
		data-testid="deleted-element-menu-btn"
	>
		<BoardMenuAction
			:icon="mdiTrashCanOutline"
			data-testid="board-menu-action-delete"
			@click="$emit('delete:element')"
		>
			{{ $t("components.board.action.deleteFromSection") }}
		</BoardMenuAction>
	</BoardMenu>
</template>

<script setup lang="ts">
import { mdiTrashCanOutline } from "@icons/material";
import { BoardMenu, BoardMenuAction, BoardMenuScope } from "@ui-board";

defineEmits<{
	(e: "delete:element"): void;
}>();
</script>
