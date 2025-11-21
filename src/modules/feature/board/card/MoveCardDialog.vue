<template>
	<Dialog
		v-model:is-dialog-open="isDialogOpen"
		:are-actions-disabled="isMoving"
		:message="t('components.molecules.move.card.title')"
		confirm-btn-lang-key="common.actions.move"
		:confirm-btn-disabled="!selectedColumnId"
		:loading="isMoving"
		@confirm="onConfirm"
		@cancel="isDialogOpen = false"
	>
		<template #content>
			<p class="text-lg mt-2">
				{{ dialogQuestion }}
			</p>

			<VForm id="moveCardForm" data-testid="move-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="rooms"
					:disabled="isMoving"
					item-value="id"
					item-title="name"
					:hint="t('components.molecules.move.card.hint.restriction')"
					:label="t('components.molecules.label.room')"
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#moveCardForm' }"
					@update:menu="resetBoardSelection"
				/>
				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId || isMoving"
					:label="t('components.molecules.label.board')"
					:items="boards"
					item-value="id"
					:placeholder="t('common.words.board')"
					:menu-props="{ attach: '#moveCardForm' }"
					@update:menu="selectedColumnId = undefined"
				/>
				<VSelect
					v-model="selectedColumnId"
					:disabled="!selectedBoardId || isMoving"
					:label="t('components.molecules.label.section')"
					:items="columns"
					item-value="id"
					:placeholder="t('components.boardSection')"
					:menu-props="{ attach: '#moveCardForm' }"
				/>
			</VForm>
		</template>
	</Dialog>
</template>

<script setup lang="ts">
import { useCardDialogData } from "./card-dialog-composable";
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { BoardCardApiFactory } from "@/serverApi/v3";
import { $axios } from "@/utils/api";
import { useNotificationStore } from "@data-app";
import { useBoardStore, useCardStore } from "@data-board";
import { useEnvConfig } from "@data-env";
import { Dialog } from "@ui-dialog";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
	cardId: string;
	roomId?: string;
}>();

const {
	selectedBoardId,
	selectedColumnId,
	selectedRoomId,
	resetBoardSelection,
	columns,
	boards,
	selectedColumn,
	selectedBoard,
	rooms,
	// eslint-disable-next-line
} = useCardDialogData(props.roomId);

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});

const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
const { reloadBoard } = useBoardStore();

const { execute, isRunning: isMoving } = useSafeAxiosTask();

const { getCardLocation, moveCardRequest } = useBoardStore();
const isSocketEnabled = useEnvConfig().value.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

const dialogQuestion = computed(() => {
	const card = useCardStore().getCard(props.cardId);
	return t("components.molecules.move.card.question", {
		title: card?.title ? ` "${card.title}"` : "",
	});
});

const onConfirm = async () => {
	const cardLocation = getCardLocation(props.cardId);
	const payload = {
		cardId: props.cardId,
		fromColumnId: cardLocation?.columnId,
		fromColumnIndex: cardLocation?.columnIndex,
		oldIndex: cardLocation?.columnIndex,
		newIndex: selectedColumn.value?.cards?.length,
		toColumnId: selectedColumnId.value,
		toColumnIndex: selectedColumn.value?.cards?.length,
	};

	const { success } = await execute(
		async () => {
			if (isSocketEnabled) {
				// @ts-expect-error Cause ts thinks it may be undefined.
				await moveCardRequest(payload);
			} else {
				await cardsApi.cardControllerMoveCard(props.cardId, {
					toColumnId: selectedColumnId.value as string,
				});
			}
			await reloadBoard();
		},
		t("common.notifications.errors.notMoved", {
			type: t("components.boardColumn"),
		})
	);
	if (success && selectedBoard.value && selectedColumn.value) {
		useNotificationStore().notify({
			status: "success",
			text: "components.molecules.move.card.message.success",
			link: {
				to: `/boards/${selectedBoardId.value}`,
				text: selectedBoard.value.title,
			},
			replace: {
				column: selectedColumn.value.title,
			},
			duration: 10000,
		});
	}

	isDialogOpen.value = false;
};
</script>
