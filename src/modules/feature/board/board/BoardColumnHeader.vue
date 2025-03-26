<template>
	<div class="d-flex flex-wrap mb-4 mt-2" ref="columnHeader">
		<div class="flex-1-0">
			<BoardColumnInteractionHandler
				:is-edit-mode="isEditMode"
				@start-edit-mode="onStartEditMode"
				@end-edit-mode="onEndEditMode"
				@move:column-keyboard="onMoveColumnKeyboard"
				:id="columnId"
			>
				<BoardAnyTitleInput
					:value="title.trim()"
					:data-testid="`column-title-${index}`"
					scope="column"
					:is-edit-mode="isEditMode"
					:placeholder="titlePlaceholder"
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
		<VDivider role="presentation" class="flex-1-0-100 border-opacity-75" />
	</div>
</template>

<script setup lang="ts">
import { useBoardFocusHandler, useBoardPermissions } from "@data-board";
import { BoardMenu, BoardMenuScope } from "@ui-board";
import {
	KebabMenuActionDelete,
	KebabMenuActionRename,
	KebabMenuActionMoveDown,
	KebabMenuActionMoveUp,
	KebabMenuActionMoveLeft,
	KebabMenuActionMoveRight,
} from "@ui-kebab-menu";
import { useCourseBoardEditMode } from "@util-board";
import { ref, toRef } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";

const props = defineProps({
	columnId: { type: String, required: true },
	index: { type: Number },
	isListBoard: { type: Boolean, required: true },
	isNotFirstColumn: { type: Boolean, requried: false },
	isNotLastColumn: { type: Boolean, requried: false },
	title: { type: String, required: true },
	titlePlaceholder: { type: String, default: "" },
});

const emit = defineEmits([
	"delete:column",
	"move:column-down",
	"move:column-left",
	"move:column-right",
	"move:column-up",
	"update:title",
]);

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
