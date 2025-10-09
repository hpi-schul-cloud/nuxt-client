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
		<KebabMenuActionDelete
			:name="displayName"
			scope-language-key="components.cardElement.externalToolElement"
			@click="onDelete"
		/>
	</BoardMenu>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import { mdiCogOutline } from "@icons/material";
import { BoardMenuScope } from "@ui-board";
import { KebabMenuAction, KebabMenuActionDelete, KebabMenuActionMoveDown, KebabMenuActionMoveUp } from "@ui-kebab-menu";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	displayName: {
		type: String,
		default: undefined,
	},
	columnIndex: { type: Number, required: true },
	isNotFirstElement: { type: Boolean, requried: false },
	isNotLastElement: { type: Boolean, requried: false },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits(["edit:element", "delete:element", "move-down:element", "move-up:element"]);
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
