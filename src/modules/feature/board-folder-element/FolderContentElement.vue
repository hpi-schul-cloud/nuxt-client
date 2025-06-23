<template>
	<v-card
		ref="folderContentElement"
		class="mb-4"
		data-testid="board-folder-element"
		elevation="0"
		variant="outlined"
		:ripple="false"
		:tabindex="isEditMode ? 0 : undefined"
		:aria-label="
			t('components.cardElement.folderElement') + ' ' + element.content.title
		"
		@keydown.up.down="onKeydownArrow"
		@keydown.stop
	>
		<ContentElementBar
			:has-grey-background="true"
			:icon="mdiFolderOpenOutline"
			tabindex="0"
			role="button"
			class="content-element-bar"
			:aria-label="
				t('components.cardElement.folderElement') + ' ' + element.content.title
			"
			@click="onTitleClick"
			@keydown.enter="onTitleClick"
		>
			<template #title>
				{{
					element.content.title ||
					t("components.cardElement.folderElement.untitled")
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
		<v-card-text>
			<FolderTitleInput
				v-if="isEditMode"
				:data-testid="`folder-title-input-${columnIndex}-${rowIndex}-${elementIndex}`"
				:title="element.content.title"
				@update:title="onUpdateTitle"
			/>
			<FileStatistic :element-id="element.id" />
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { FileFolderElement } from "@/types/board/ContentElement";
import { useBoardFocusHandler, useContentElementState } from "@data-board";
import { mdiFolderOpenOutline } from "@icons/material";
import { BoardMenu, BoardMenuScope, ContentElementBar } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
} from "@ui-kebab-menu";
import { ref, toRef } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import FileStatistic from "./FileStatistic.vue";
import FolderTitleInput from "./FolderTitleInput.vue";

interface FolderContentElementProps {
	element: FileFolderElement;
	isEditMode: boolean;
	isNotFirstElement?: boolean;
	isNotLastElement?: boolean;
	columnIndex: number;
	rowIndex: number;
	elementIndex: number;
}

const { t } = useI18n();

const props = defineProps<FolderContentElementProps>();

const emit = defineEmits<{
	(e: "delete:element", elementId: string): void;
	(e: "move-down:edit"): void;
	(e: "move-up:edit"): void;
	(e: "move-keyboard:edit", event: KeyboardEvent): void;
}>();

const folderContentElement = ref(null);
const element = toRef(props, "element");
const { modelValue } = useContentElementState(props, { autoSaveDebounce: 100 });

const onUpdateTitle = (value: string) => {
	modelValue.value.title = value;
};

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

const router = useRouter();
const onTitleClick = () => {
	const folderRoute = `/folder/${element.value.id}`;

	router.push(folderRoute);
};
</script>

<style scoped>
.content-element-bar:focus {
	outline-offset: -10px;
}
</style>
