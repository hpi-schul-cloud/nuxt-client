<template>
	<BoardMenu
		:scope="BoardMenuScope.DELETED_ELEMENT"
		has-background
		:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
	>
		<KebabMenuActionDelete
			@click="onDelete"
			:scope="BoardMenuScope.DELETED_ELEMENT"
		/>
	</BoardMenu>
</template>

<script setup lang="ts">
import { BoardMenu, KebabMenuActionDelete, BoardMenuScope } from "@ui-board";

defineProps({
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

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
