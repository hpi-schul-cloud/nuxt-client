<template>
	<BoardMenu
		:scope="BoardMenuScope.EXTERNAL_TOOL_ELEMENT"
		has-background
		:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
	>
		<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
		<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
		<KebabMenuAction :icon="mdiCogOutline" @click="onEdit">
			{{ t("common.labels.settings") }}
		</KebabMenuAction>
		<KebabMenuActionDelete :name="displayName" @click="onDelete" />
	</BoardMenu>
</template>

<script setup lang="ts">
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { mdiCogOutline } from "@icons/material";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import { KebabMenuAction, KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	displayName: {
		type: String,
		default: undefined,
	},
	columnIndex: { type: Number, required: true },
	isNotFirstElement: { type: Boolean, required: false },
	isNotLastElement: { type: Boolean, required: false },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits(["edit:element", "delete:element", "move-down:element", "move-up:element"]);
const onEdit = () => emit("edit:element");

const onDelete = async () => {
	const shouldDelete = await askDeletionForType("components.cardElement.externalToolElement");
	if (shouldDelete) {
		emit("delete:element");
	}
};

const onMoveDown = () => emit("move-down:element");

const onMoveUp = () => emit("move-up:element");
</script>
