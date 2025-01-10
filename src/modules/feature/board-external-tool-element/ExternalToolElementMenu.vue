<template>
	<BoardMenu
		:scope="BoardMenuScope.EXTERNAL_TOOL_ELEMENT"
		has-background
		:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
	>
		<BoardMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
		<BoardMenuActionMoveDown v-if="isNotLastElement" @click="onMoveDown" />
		<BoardMenuAction :icon="mdiCogOutline" @click="onEdit">
			{{ t("common.labels.settings") }}
		</BoardMenuAction>
		<BoardMenuActionDelete :name="displayName" @click="onDelete" />
	</BoardMenu>
</template>

<script setup lang="ts">
import { mdiCogOutline } from "@icons/material";
import {
	BoardMenu,
	BoardMenuAction,
	BoardMenuActionDelete,
	BoardMenuActionMoveDown,
	BoardMenuActionMoveUp,
	BoardMenuScope,
} from "@ui-board";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	displayName: {
		type: String,
	},
	columnIndex: { type: Number, required: true },
	isNotFirstElement: { type: Boolean, requried: false },
	isNotLastElement: { type: Boolean, requried: false },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

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
