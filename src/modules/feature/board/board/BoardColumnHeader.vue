<template>
	<BoardColumnInteractionHandler
		:isEditMode="isEditMode"
		@start-edit-mode="onStartEditMode"
		@end-edit-mode="onEndEditMode"
		@move:column-keyboard="onMoveColumnKeyboard"
	>
		<div class="column-header mb-4 rounded" ref="columnHeader">
			<div class="d-flex align-center py-2 px-2">
				<BoardAnyTitleInput
					:value="title.trim()"
					:data-testid="`column-title-${index}`"
					scope="column"
					:isEditMode="isEditMode"
					class="w-100"
					:isFocused="isFocusedById"
					@update:value="onUpdateTitle"
				>
					<BoardMenu
						v-if="hasDeletePermission"
						scope="column"
						:data-testid="`column-menu-btn-${index}`"
					>
						<BoardMenuActionEdit v-if="!isEditMode" @click="onStartEditMode" />
						<BoardMenuActionMoveLeft
							v-if="!isListBoard"
							@click="onMoveColumnLeft"
						/>
						<BoardMenuActionMoveRight
							v-if="!isListBoard"
							@click="onMoveColumnRight"
						/>
						<BoardMenuActionMoveColumnUp
							v-if="isListBoard"
							@click="onMoveColumnUp"
						/>
						<BoardMenuActionMoveColumnDown
							v-if="isListBoard"
							@click="onMoveColumnDown"
						/>
						<BoardMenuActionDelete :name="title" @click="onDelete" />
					</BoardMenu>
				</BoardAnyTitleInput>
			</div>
			<VDivider aria-hidden="true" class="border-opacity-75" />
		</div>
	</BoardColumnInteractionHandler>
</template>

<script setup lang="ts">
import {
	useBoardFocusHandler,
	useBoardPermissions,
	useEditMode,
} from "@data-board";
import {
	BoardMenu,
	BoardMenuActionDelete,
	BoardMenuActionEdit,
	BoardMenuActionMoveColumnDown,
	BoardMenuActionMoveColumnUp,
	BoardMenuActionMoveLeft,
	BoardMenuActionMoveRight,
} from "@ui-board";
import { ref, toRef } from "vue";
import BoardAnyTitleInput from "../shared/BoardAnyTitleInput.vue";
import BoardColumnInteractionHandler from "./BoardColumnInteractionHandler.vue";

const props = defineProps({
	columnId: {
		type: String,
		required: true,
	},
	index: {
		type: Number,
	},
	isListBoard: {
		type: Boolean,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	titlePlaceholder: {
		type: String,
		required: true,
	},
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
const { isEditMode, startEditMode, stopEditMode } = useEditMode(columnId.value);

const columnHeader = ref<HTMLDivElement | null>(null);
const { isFocusedById } = useBoardFocusHandler(columnId.value, columnHeader);
const { hasEditPermission, hasDeletePermission } = useBoardPermissions();

const onStartEditMode = () => {
	if (!hasEditPermission) return;
	startEditMode();
};

const onEndEditMode = () => {
	if (!hasEditPermission) return;
	stopEditMode();
};

const onDelete = async (confirmation: Promise<boolean>) => {
	const shouldDelete = await confirmation;
	if (shouldDelete) {
		emit("delete:column", props.columnId);
	}
};

const onMoveColumnKeyboard = (event: KeyboardEvent) => {
	if (event.code === "ArrowLeft") {
		emit("move:column-left");
	} else if (event.code === "ArrowRight") {
		emit("move:column-right");
	} else {
		console.log("not supported key event");
	}
};

const emitIfNotListBoard = (event: string) => {
	console.log("emitIfNotListBoard", emit);
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
<style scoped>
.column-header {
	align-items: top;
}
</style>
