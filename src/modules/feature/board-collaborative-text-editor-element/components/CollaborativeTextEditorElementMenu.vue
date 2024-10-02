<template>
	<BoardMenu
		:scope="BoardMenuScope.COLLABORATIVE_TEXT_EDITOR_ELEMENT"
		has-background
	>
		<BoardMenuActionMoveUp @click="onMoveUp" />
		<BoardMenuActionMoveDown @click="onMoveDown" />
		<BoardMenuActionDelete @click="onDelete" />
	</BoardMenu>
</template>

<script setup lang="ts">
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
} from "@ui-board";

const emit = defineEmits<{
	(e: "delete:element"): void;
	(e: "move-down:element"): void;
	(e: "move-up:element"): void;
}>();

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element");
	}
};

const onMoveDown = () => emit("move-down:element");

const onMoveUp = () => emit("move-up:element");
</script>
