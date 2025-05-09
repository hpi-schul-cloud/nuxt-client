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
		<KebabMenuActionDelete
			:name="displayName"
			scope-language-key="components.cardElement.h5pElement"
			@click="onDelete"
		/>
	</BoardMenu>
</template>

<script setup lang="ts">
import { mdiCogOutline } from "@icons/material";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuAction,
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps<{
	displayName?: string;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
}>();

const emit = defineEmits([
	"edit:element",
	"delete:element",
	"move-down:element",
	"move-up:element",
]);
const onEdit = () => emit("edit:element");

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element");
	}
};

const onMoveDown = () => emit("move-down:element");

const onMoveUp = () => emit("move-up:element");
</script>
