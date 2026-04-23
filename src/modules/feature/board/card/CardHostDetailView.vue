<template>
	<div>
		<VDialog :model-value="isOpen" fullscreen scrollable @keydown.escape="onDialogClose">
			<VCard>
				<div class="toolbar-fixed-offset">
					<VToolbar class="toolbar-position">
						<VBtn icon data-testid="close-detail-view-button" @click="onDialogClose">
							<VIcon>{{ mdiClose }}</VIcon>
						</VBtn>
						<VToolbarTitle>{{ $t("components.board.dialog.detail-view.title") }}</VToolbarTitle>
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
				<VCardText
					:style="{
						backgroundColor: cardBackground,
					}"
					class="pt-0"
				>
					<div
						class="detail-view-size pt-lg-8 pt-md-4 pt-1 mx-auto"
						:style="{
							backgroundColor: 'white',
							borderLeft: cardBorderColor ? `3px solid ${cardBorderColor}` : undefined,
						}"
					>
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
import { colorToHexLighten3, colorToHexLighten5 } from "@/utils/color.utils";
import type { CardResponse } from "@api-server";
import { Colors } from "@api-server";
import { useBoardAllowedOperations, useCourseBoardEditMode } from "@data-board";
import { mdiClose } from "@icons/material";
import { computed, toRef } from "vue";

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

const cardRef = toRef(props, "card");
const { isEditMode, startEditMode, stopEditMode } = useCourseBoardEditMode(cardRef.value.id);
const { allowedOperations } = useBoardAllowedOperations();

const cardBackground = computed(() => colorToHexLighten5(cardRef.value?.backgroundColor ?? Colors.TRANSPARENT));
const cardBorderColor = computed(() => {
	const color = cardRef.value?.backgroundColor;
	if (!color || color === Colors.TRANSPARENT) return undefined;
	return colorToHexLighten3(color);
});

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

<style lang="scss" scoped>
@use "sass:map";
@use "@/styles/settings" as *;

.detail-view-size {
	max-width: 920px;
	padding: 0 4rem;

	@media #{map.get($display-breakpoints, 'sm-and-down')} {
		padding: 0 0.5rem;
	}
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
