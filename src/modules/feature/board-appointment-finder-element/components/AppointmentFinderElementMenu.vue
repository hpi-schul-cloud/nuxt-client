<template>
	<BoardMenu
		:scope="BoardMenuScope.COLLABORATIVE_TEXT_EDITOR_ELEMENT"
		has-background
	>
		<BoardMenuActionMoveUp @click="onMoveUp" />
		<BoardMenuActionMoveDown @click="onMoveDown" />
		<BoardMenuActionDelete @click="onDelete" />
		<BoardMenuAction
			:icon="mdiPencilOutline"
			data-testid="board-menu-action-edit"
			@click="onEdit"
		>
			{{ $t("common.actions.edit") }}
		</BoardMenuAction>
	</BoardMenu>
</template>

<script setup lang="ts">
import { mdiPencilOutline } from "@icons/material";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
	BoardMenuAction,
} from "@ui-board";

const emit = defineEmits<{
	(e: "delete:element"): void;
	(e: "move-down:element"): void;
	(e: "move-up:element"): void;
	(e: "edit:finder"): void;
}>();

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element");
	}
};

const onMoveDown = () => emit("move-down:element");

const onMoveUp = () => emit("move-up:element");

const onEdit = () => emit("edit:finder");
</script>
