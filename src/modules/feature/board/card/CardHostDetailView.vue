<template>
	<div>
		<v-dialog
			:model-value="isOpen"
			:fullscreen="isFullscreen"
			:scrim="isFullscreen"
			:width="700"
			scrollable
			transition="dialog-bottom-transition"
			@keydown.escape="onDialogClose"
		>
			<v-card>
				<div class="toolbar-fixed-offset">
					<v-toolbar class="toolbar-position" color="white">
						<v-btn icon @click="onDialogClose">
							<v-icon>{{ mdiClose }}</v-icon>
						</v-btn>
						<v-spacer />
						<v-btn class="mr-4" @click="onToggleFullscreen"> toggle fullscreen (debug) </v-btn>
						<v-btn class="mr-4" @click="onToggleEdit">
							{{
								isEditMode ? $t("common.actions.edit") + " " + $t("common.actions.finish") : $t("common.actions.edit")
							}}
						</v-btn>

						<v-btn color="primary" @click="onDeleteCard">
							{{ $t("components.boardCard") }} {{ $t("common.actions.delete") }}
						</v-btn>
					</v-toolbar>
				</div>
				<v-card-text>
					<div class="detail-view-size pt-lg-8 pt-md-4 pt-1 mx-auto">
						<CardTitle
							:is-edit-mode="isEditMode"
							:value="card.title"
							scope="card"
							:is-focused="true"
							@update:value="onUpdateCardTitle"
							@enter="onEnterTitle"
						/>
						<ContentElementList
							:elements="card.elements"
							:is-edit-mode="isEditMode"
							:is-detail-view="true"
							:row-index="rowIndex"
							:column-index="columnIndex"
							@delete:element="onDeleteElement"
							@move-down:element="onMoveElementDown"
							@move-up:element="onMoveElementUp"
							@move-keyboard:element="onMoveElementKeyboard"
						/>
						<CardAddElementMenu @add-element="onAddElement" />
					</div>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardTitle from "./CardTitle.vue";
import ContentElementList from "./ContentElementList.vue";
import type { CardResponse } from "@/serverApi/v3";
import type { ElementMove } from "@/types/board/DragAndDrop";
import { mdiClose } from "@icons/material";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { ref } from "vue";

type Props = {
	card: CardResponse;
	isOpen: boolean;
	rowIndex: number;
	columnIndex: number;
};

const props = defineProps<Props>();

const emit = defineEmits<{
	(e: "update:title", value: string): void;
	(e: "delete:element", elementId: string): void;
	(e: "delete:card"): void;
	(e: "move-down:element", elementMove: ElementMove): void;
	(e: "move-up:element", elementMove: ElementMove): void;
	(e: "move-keyboard:element", elementMove: ElementMove, keyCode: string): void;
	(e: "add:element"): void;
	(e: "enter:title"): void;
	(e: "close:detail-view"): void;
}>();

const isEditMode = ref(false);
const isFullscreen = ref(true);

const { askDeleteConfirmation } = useDeleteConfirmationDialog();

const onToggleEdit = () => {
	isEditMode.value = !isEditMode.value;
};

const onToggleFullscreen = () => {
	isFullscreen.value = !isFullscreen.value;
};

const onDialogClose = () => {
	emit("close:detail-view");
};

const onUpdateCardTitle = (value: string) => {
	emit("update:title", value);
};

const onEnterTitle = () => {
	emit("enter:title");
};

const onAddElement = () => {
	emit("add:element");
	isEditMode.value = true;
};

const onDeleteElement = (elementId: string) => {
	emit("delete:element", elementId);
};

const onDeleteCard = async () => {
	const shouldDelete = await askDeleteConfirmation(props.card.title, "components.boardCard");

	if (shouldDelete) {
		emit("delete:card");
	}
};

const onMoveElementDown = (elementMove: ElementMove) => {
	emit("move-down:element", elementMove);
};

const onMoveElementUp = (elementMove: ElementMove) => {
	emit("move-up:element", elementMove);
};

const onMoveElementKeyboard = (elementMove: ElementMove, keyCode: string) => {
	emit("move-keyboard:element", elementMove, keyCode);
};
</script>

<style scoped>
.detail-view-size {
	max-width: 30vw;
	min-width: 400px;
}

.toolbar-position {
	position: absolute;
	width: 100%;
	z-index: 1000;
}

.toolbar-fixed-offset {
	margin-bottom: 64px;
}
</style>
