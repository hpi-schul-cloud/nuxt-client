<template>
	<BoardMenu
		:scope="BoardMenuScope.DELETED_ELEMENT"
		has-background
		:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
	>
		<KebabMenuActionDelete
			scope-language-key="components.cardElement.deletedElement"
			@click="onDelete"
		/>
	</BoardMenu>
</template>

<script setup lang="ts">
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import { KebabMenuActionDelete } from "@ui-kebab-menu";

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
