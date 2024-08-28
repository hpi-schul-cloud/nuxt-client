<template>
	<BoardMenu
		:scope="BoardMenuScope.MEDIA_EXTERNAL_TOOL_ELEMENT"
		has-background
		data-testid="deleted-element-menu-btn"
	>
		<BoardMenuActionDelete @click="onDelete" />
	</BoardMenu>
</template>

<script setup lang="ts">
import { BoardMenu, BoardMenuActionDelete, BoardMenuScope } from "@ui-board";

const emit = defineEmits<{
	(e: "delete:element"): void;
}>();

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element");
	}
};
</script>
