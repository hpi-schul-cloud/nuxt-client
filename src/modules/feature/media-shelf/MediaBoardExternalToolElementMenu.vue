<template>
	<BoardMenu
		variant="outlined"
		:scope="BoardMenuScope.MEDIA_EXTERNAL_TOOL_ELEMENT"
		has-background
		data-testid="deleted-element-menu-btn"
	>
		<KebabMenuAction
			:icon="mdiTrashCanOutline"
			data-testid="kebab-menu-action-delete"
			@click="$emit('delete:element')"
		>
			{{ $t("components.board.action.deleteFromSection") }}
		</KebabMenuAction>
	</BoardMenu>
</template>

<script setup lang="ts">
import { mdiTrashCanOutline } from "@icons/material";
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import { KebabMenuAction } from "@ui-kebab-menu";

defineEmits<{
	(e: "delete:element"): void;
}>();
</script>
