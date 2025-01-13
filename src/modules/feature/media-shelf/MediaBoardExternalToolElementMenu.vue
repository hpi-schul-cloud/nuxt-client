<template>
	<BoardMenu
		variant="outlined"
		:scope="BoardMenuScope.MEDIA_EXTERNAL_TOOL_ELEMENT"
		has-background
		data-testid="deleted-element-menu-btn"
	>
		<KebabMenuAction
			:icon="mdiTrashCanOutline"
			data-testid="board-menu-action-delete"
			@click="$emit('delete:element')"
		>
			{{ $t("components.board.action.deleteFromSection") }}
		</KebabMenuAction>
	</BoardMenu>
</template>

<script setup lang="ts">
import { mdiTrashCanOutline } from "@icons/material";
import { BoardMenu, KebabMenuAction, BoardMenuScope } from "@ui-board";

defineEmits<{
	(e: "delete:element"): void;
}>();
</script>
