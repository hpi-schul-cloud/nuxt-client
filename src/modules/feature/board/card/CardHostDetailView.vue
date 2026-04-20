<template>
	<div>
		<VDialog
			:model-value="isOpen"
			:fullscreen="true"
			:scrim="true"
			:width="700"
			scrollable
			@keydown.escape="onDialogClose"
		>
			<v-card>
				<div class="toolbar-fixed-offset">
					<v-toolbar class="toolbar-position" color="white">
						<v-btn icon @click="onDialogClose">
							<v-icon>{{ mdiClose }}</v-icon>
						</v-btn>
						<v-spacer />
						<v-btn class="mr-4" data-testid="toolbar-edit-button" @click="onToggleEdit">
							{{
								isEditMode ? $t("common.actions.edit") + " " + $t("common.actions.finish") : $t("common.actions.edit")
							}}
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
		</VDialog>
	</div>
</template>

<script setup lang="ts">
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardTitle from "./CardTitle.vue";
import ContentElementList from "./ContentElementList.vue";
import type { ElementMove } from "@/types/board/DragAndDrop";
import type { CardResponse } from "@api-server";
import { mdiClose } from "@icons/material";
import { ref } from "vue";

type Props = {
	card: CardResponse;
	isOpen: boolean;
	rowIndex: number;
	columnIndex: number;
};

defineProps<Props>();

const emit = defineEmits<{
	(e: "update:title", value: string): void;
	(e: "delete:element", elementId: string): void;
	(e: "move-down:element", elementMove: ElementMove): void;
	(e: "move-up:element", elementMove: ElementMove): void;
	(e: "move-keyboard:element", elementMove: ElementMove, keyCode: string): void;
	(e: "add:element"): void;
	(e: "enter:title"): void;
	(e: "close:detail-view"): void;
}>();

const isEditMode = ref(false);

const onToggleEdit = () => {
	isEditMode.value = !isEditMode.value;
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
