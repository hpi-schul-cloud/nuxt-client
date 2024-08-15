<template>
	<BoardMenu scope="element">
		<BoardMenuActionDelete @click="onDelete" />
	</BoardMenu>
</template>

<script setup lang="ts">
import { BoardMenu, BoardMenuActionDelete } from "@ui-board";

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
