<template>
	<div ref="columnHeader" class="board-column-header mb-4">
		<div class="d-flex align-items-start">
			<div class="flex-grow-1">
				<BoardColumnInteractionHandler
					:id="columnId"
					:is-edit-mode="isEditMode"
					@start-edit-mode="onStartEditMode"
					@end-edit-mode="onEndEditMode"
					@move:column-keyboard="onMoveColumnKeyboard"
				>
					<BoardAnyTitleInput
						:value="title"
						:empty-value-fallback="t('components.board.column.defaultTitle')"
						:data-testid="`column-title-${index}`"
						scope="column"
						:is-edit-mode="isEditMode"
						class="w-100"
						:is-focused="isFocusedById"
						@update:value="onUpdateTitle"
						@blur="onEndEditMode"
					/>
				</BoardColumnInteractionHandler>
			</div>
			<div class="mt-2 mr-3">
				<BoardMenu
					v-if="hasDeletePermission"
					:scope="BoardMenuScope.COLUMN"
					:data-testid="`column-menu-btn-${index}`"
				>
					<KebabMenuActionRename v-if="!isEditMode" @click="onStartEditMode" />
					<template v-if="isListBoard">
						<KebabMenuActionMoveUp
							v-if="isNotFirstColumn"
							@click="onMoveColumnUp"
						/>
						<KebabMenuActionMoveDown
							v-if="isNotLastColumn"
							@click="onMoveColumnDown"
						/>
					</template>
					<template v-else>
						<KebabMenuActionMoveLeft
							v-if="isNotFirstColumn"
							@click="onMoveColumnLeft"
						/>
						<KebabMenuActionMoveRight
							v-if="isNotLastColumn"
							@click="onMoveColumnRight"
						/>
					</template>
					<KebabMenuActionDelete
						:name="title"
						scope-language-key="components.boardColumn"
						@click="onDelete"
					/>
				</BoardMenu>
			</div>
		</div>
		<VDivider role="presentation" class="flex-1-0-100 border-opacity-75" />
	</div>
</template>

<script setup lang="ts">
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import { BoardMenuScope } from "@ui-board";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import BoardMenu from "@/modules/ui/board/BoardMenu.vue"; // FIX_CIRCULAR_DEPENDENCY
import {
	KebabMenuActionDelete,
	KebabMenuActionRename,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
	KebabMenuActionMoveLeft,
	KebabMenuActionMoveRight,
} from "@ui-kebab-menu";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useCourseBoardEditMode } from "@/modules/util/board/editMode.composable"; // FIX_CIRCULAR_DEPENDENCY
import { ref, toRef } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
	columnId: { type: String, required: true },
	index: { type: Number, required: true },
	isListBoard: { type: Boolean, required: true },
	isNotFirstColumn: { type: Boolean, requried: false },
	isNotLastColumn: { type: Boolean, requried: false },
	title: { type: String, required: true },
});

const emit = defineEmits([
	"delete:column",
	"move:column-down",
	"move:column-left",
	"move:column-right",
	"move:column-up",
	"update:title",
]);
const { t } = useI18n();

const columnId = toRef(props, "columnId");
const { hasEditPermission, hasDeletePermission } = useBoardPermissions();
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(
	columnId.value
);

const columnHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(columnId.value, columnHeader);

const onStartEditMode = () => {
	if (!hasEditPermission.value) return;
	startEditMode();
};

const onEndEditMode = () => {
	if (!hasEditPermission.value) return;
	stopEditMode();
};

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:column", props.columnId);
	}
};

const onMoveColumnKeyboard = (event: KeyboardEvent) => {
	let keyLeft = "ArrowLeft";
	let keyRight = "ArrowRight";
	if (props.isListBoard) {
		keyLeft = "ArrowUp";
		keyRight = "ArrowDown";
	}
	if (event.code === keyLeft) {
		emit("move:column-left");
	} else if (event.code === keyRight) {
		emit("move:column-right");
	}
};

const emitIfNotListBoard = (
	event: "move:column-left" | "move:column-right"
) => {
	if (!props.isListBoard) {
		emit(event);
	}
};

const onMoveColumnLeft = () => emitIfNotListBoard("move:column-left");
const onMoveColumnRight = () => emitIfNotListBoard("move:column-right");

const onMoveColumnDown = () => emit("move:column-down");
const onMoveColumnUp = () => emit("move:column-up");

const onUpdateTitle = (newTitle: string) => emit("update:title", newTitle);
</script>
