<template>
	<v-card
		ref="folderContentElement"
		class="mb-4"
		data-testid="board-folder-element"
		elevation="0"
		variant="outlined"
		:ripple="false"
		:tabindex="isEditMode ? 0 : undefined"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<ContentElementBar :has-grey-background="true" :icon="mdiFolderOpenOutline">
			<template #title>
				{{
					element.content.title ||
					$t("components.cardElement.folderElement.untitled")
				}}
			</template>
			<template v-if="isEditMode" #menu>
				<BoardMenu
					:scope="BoardMenuScope.FOLDER_ELEMENT"
					has-background
					:data-testid="`element-menu-button-${columnIndex}-${rowIndex}-${elementIndex}`"
				>
					<KebabMenuActionMoveUp v-if="isNotFirstElement" @click="onMoveUp" />
					<KebabMenuActionMoveDown
						v-if="isNotLastElement"
						@click="onMoveDown"
					/>
					<KebabMenuActionDelete
						scope-language-key="components.cardElement.folderElement"
						@click="onDelete"
					/>
				</BoardMenu>
			</template>
		</ContentElementBar>
	</v-card>
</template>

<script setup lang="ts">
import { FileFolderElement } from "@/types/board/ContentElement";
import { useBoardFocusHandler } from "@data-board";
import { mdiFolderOpenOutline } from "@icons/material";
import { BoardMenu, BoardMenuScope, ContentElementBar } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { PropType, ref, toRef } from "vue";

const props = defineProps({
	element: {
		type: Object as PropType<FileFolderElement>,
		required: true,
	},
	isEditMode: { type: Boolean, required: true },
	isNotFirstElement: { type: Boolean, required: false },
	isNotLastElement: { type: Boolean, required: false },
	columnIndex: { type: Number, required: true },
	rowIndex: { type: Number, required: true },
	elementIndex: { type: Number, required: true },
});

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const folderContentElement = ref(null);
const element = toRef(props, "element");

useBoardFocusHandler(element.value.id, folderContentElement);

const onKeydownArrow = (event: KeyboardEvent) => {
	if (props.isEditMode) {
		event.preventDefault();
		emit("move-keyboard:edit", event);
	}
};

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:element", element.value.id);
	}
};

const onMoveUp = () => emit("move-up:edit");
const onMoveDown = () => emit("move-down:edit");
</script>
