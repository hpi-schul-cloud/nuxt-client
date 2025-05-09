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
						<v-btn class="mr-4" @click="onToggleFullscreen">
							toggle fullscreen (debug)
						</v-btn>
						<v-btn class="mr-4" @click="onToggleEdit">
							{{
								isEditMode
									? $t("common.actions.edit") +
										" " +
										$t("common.actions.finish")
									: $t("common.actions.edit")
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

<script lang="ts">
import { CardResponse } from "@/serverApi/v3";
import { ElementMove } from "@/types/board/DragAndDrop";
import { useBoardPermissions } from "@data-board";
import { mdiClose } from "@icons/material";
import { useDeleteConfirmationDialog } from "@ui-confirmation-dialog";
import { defineComponent, PropType, ref } from "vue";
import CardAddElementMenu from "./CardAddElementMenu.vue";
import CardTitle from "./CardTitle.vue";
import ContentElementList from "./ContentElementList.vue";

export default defineComponent({
	name: "CardHostDetailView",
	components: {
		CardTitle,
		CardAddElementMenu,
		ContentElementList,
	},
	props: {
		card: {
			type: Object as PropType<CardResponse>,
			required: true,
		},
		isOpen: {
			type: Boolean,
			required: true,
		},
		rowIndex: {
			type: Number,
			required: true,
		},
		columnIndex: {
			type: Number,
			required: true,
		},
	},
	emits: [
		"update:title",
		"delete:element",
		"delete:card",
		"move-down:element",
		"move-up:element",
		"move-keyboard:element",
		"add:element",
		"enter:title",
		"close:detail-view",
	],
	setup(props, { emit }) {
		const isEditMode = ref(false);
		const isFullscreen = ref(true);

		const { hasDeletePermission, hasEditPermission } = useBoardPermissions();
		const { askDeleteConfirmation } = useDeleteConfirmationDialog();

		const onToggleEdit = () => (isEditMode.value = !isEditMode.value);
		const onToggleFullscreen = () => (isFullscreen.value = !isFullscreen.value);
		const onDialogClose = () => emit("close:detail-view");

		const onUpdateCardTitle = (value: string) => emit("update:title", value);
		const onEnterTitle = () => emit("enter:title");

		const onAddElement = () => {
			emit("add:element");
			isEditMode.value = true;
		};

		const onDeleteElement = (elementId: string) =>
			emit("delete:element", elementId);

		const onDeleteCard = async () => {
			let shouldDelete = true;
			shouldDelete = await askDeleteConfirmation(
				props.card.title,
				"components.boardCard"
			);

			if (shouldDelete) {
				emit("delete:card");
			}
		};

		const onMoveElementDown = (elementMove: ElementMove) =>
			emit("move-down:element", elementMove);
		const onMoveElementUp = (elementMove: ElementMove) =>
			emit("move-up:element", elementMove);
		const onMoveElementKeyboard = (
			elementMove: ElementMove,
			keyCode: string
		) => {
			emit("move-keyboard:element", elementMove, keyCode);
		};

		return {
			mdiClose,
			isEditMode,
			hasEditPermission,
			hasDeletePermission,
			onToggleEdit,
			onUpdateCardTitle,
			onEnterTitle,
			onAddElement,
			onDeleteElement,
			onMoveElementDown,
			onMoveElementUp,
			onMoveElementKeyboard,
			onDialogClose,
			onDeleteCard,
			// debug
			onToggleFullscreen,
			isFullscreen,
		};
	},
});
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
