<template>
	<BoardMenu
		:scope="BoardMenuScope.H5P_ELEMENT"
		has-background
		:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
	>
		<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
		<KebabMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
		<KebabMenuAction :icon="mdiCogOutline" @click="onEdit">
			{{ t("common.labels.settings") }}
		</KebabMenuAction>
		<KebabMenuAction v-if="hasLinkedContent" :icon="mdiTrayArrowDown" @click="onDownload">
			{{ t("components.board.action.download") }}
		</KebabMenuAction>
		<KebabMenuActionDelete :name="displayName" @click="onDelete" />
	</BoardMenu>
</template>

<script setup lang="ts">
import { askDeletionForType } from "@/utils/confirmation-dialog.utils";
import { mdiCogOutline, mdiTrayArrowDown } from "@icons/material";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import { KebabMenuAction, KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
	displayName?: string;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
	hasLinkedContent: boolean;
}>();

const emit = defineEmits([
	"edit:element",
	"delete:element",
	"move-down:element",
	"move-up:element",
	"download:content",
]);
const onEdit = () => emit("edit:element");
const onDownload = () => emit("download:content");
const onDelete = async () => {
	const shouldDelete = await askDeletionForType("components.cardElement.h5pElement");
	if (shouldDelete) {
		emit("delete:element");
	}
};

const onMoveDown = () => emit("move-down:element");

const onMoveUp = () => emit("move-up:element");
</script>
