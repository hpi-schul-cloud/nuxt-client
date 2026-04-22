<template>
	<div>
		<VDialog :model-value="isOpen" fullscreen scrollable @keydown.escape="onDialogClose">
			<VCard>
				<div class="toolbar-fixed-offset">
					<VToolbar class="toolbar-position" color="white">
						<VBtn icon @click="onDialogClose">
							<VIcon>{{ mdiClose }}</VIcon>
						</VBtn>
						<VSpacer />
						<VBtn
							v-if="allowedOperations?.deleteCard && !isEditMode"
							class="mr-4 keep-inline-edit-mode"
							data-testid="toolbar-edit-button"
							@click="startEditMode"
						>
							{{ $t("common.actions.edit") }}
						</VBtn>
						<VBtn
							v-if="allowedOperations?.deleteCard && isEditMode"
							class="mr-4 keep-inline-edit-mode"
							data-testid="toolbar-view-button"
							@click="stopEditMode"
						>
							{{ $t("common.actions.view") }}
						</VBtn>
					</VToolbar>
				</div>
				<VCardText>
					<div class="detail-view-size pt-lg-8 pt-md-4 pt-1 mx-auto">
						<CardHostInteractionHandler
							:is-edit-mode="isEditMode"
							@start-edit-mode="startEditMode"
							@end-edit-mode="stopEditMode"
							@click.stop
						>
							<CardTitle
								:is-edit-mode="isEditMode"
								:value="card.title"
								scope="card"
								:is-focused="true"
								:has-edit-permission="allowedOperations?.updateCardTitle"
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
							<CardAddElementMenu v-if="isEditMode" data-testid="add-element-button" @add-element="onAddElement" />
						</CardHostInteractionHandler>
					</div>
				</VCardText>
			</VCard>
		</VDialog>
	</div>
</template>

<script setup lang="ts">
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardHostInteractionHandler from "./CardHostInteractionHandler.vue";
import CardTitle from "./CardTitle.vue";
import ContentElementList from "./ContentElementList.vue";
import type { ElementMove } from "@/types/board/DragAndDrop";
import type { CardResponse } from "@api-server";
import { useBoardAllowedOperations, useCourseBoardEditMode } from "@data-board";
import { mdiClose } from "@icons/material";
import { toRef } from "vue";

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
	(e: "move-down:element", elementMove: ElementMove): void;
	(e: "move-up:element", elementMove: ElementMove): void;
	(e: "move-keyboard:element", elementMove: ElementMove, keyCode: string): void;
	(e: "add:element"): void;
	(e: "enter:title"): void;
	(e: "close:detail-view"): void;
}>();

const cardId = toRef(props, "card");
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(cardId.value.id);
const { allowedOperations } = useBoardAllowedOperations();

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
	startEditMode();
	emit("add:element");
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
	max-width: 768px;
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

.v-dialog {
	--fullscreen-scale: 1.25;

	/* Override with scaled versions, referencing original root values */
	--heading-1: calc(2.0625rem * var(--fullscreen-scale));
	--heading-2: calc(1.75rem * var(--fullscreen-scale));
	--heading-3: calc(1.4375rem * var(--fullscreen-scale));
	--heading-4: calc(1.1875rem * var(--fullscreen-scale));
	--heading-5: calc(1.4375rem * var(--fullscreen-scale));
	--heading-6: calc(1.1875rem * var(--fullscreen-scale));

	/* text sizes */
	--text-xs: calc(0.694rem * var(--fullscreen-scale));
	--text-sm: calc(0.833rem * var(--fullscreen-scale));
	--text-md: calc(1rem * var(--fullscreen-scale));
	--text-lg: calc(1.2rem * var(--fullscreen-scale));
}
</style>
