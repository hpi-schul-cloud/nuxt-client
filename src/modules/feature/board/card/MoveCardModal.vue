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
				{{ t("components.molecules.move.card.question") }}
			</p>

			<VForm id="moveCardForm" data-testid="move-card-form">
				<VSelect
					v-model="selectedRoomId"
					:items="rooms"
					:disabled="isMoving"
					item-value="id"
					item-title="name"
					:hint="t('components.molecules.move.card.hint.restriction')"
					:label="t('components.molecules.import.columnBoard.options.selectRoom')"
					:placeholder="t('common.labels.room')"
					:menu-props="{ attach: '#moveCardForm' }"
					@update:menu="resetBoardSelection"
				/>
				<VSelect
					v-model="selectedBoardId"
					:disabled="!selectedRoomId || isMoving"
					:label="t('components.molecules.move.card.label.board')"
					:items="boards"
					item-value="id"
					:placeholder="t('common.words.board')"
					:menu-props="{ attach: '#moveCardForm' }"
					@update:menu="selectedColumnId = undefined"
				/>
				<VSelect
					v-model="selectedColumnId"
					:disabled="!selectedBoardId || isMoving"
					:label="t('components.molecules.move.card.label.section')"
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
import { useSafeAxiosTask } from "@/composables/async-tasks.composable";
import { BoardCardApiFactory, ColumnResponse, Permission, RoomBoardItemResponse } from "@/serverApi/v3";
import { RoomItem } from "@/types/room/Room";
import { $axios } from "@/utils/api";
import { useNotificationStore } from "@data-app";
import { useBoardApi, useBoardStore } from "@data-board";
import { useEnvConfig } from "@data-env";
import { useRoomDetailsStore, useRoomStore } from "@data-room";
import { Dialog } from "@ui-dialog";
import { sortBy } from "lodash-es";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps<{
	cardId: string;
	roomId?: string;
}>();

const cardsApi = BoardCardApiFactory(undefined, "/v3", $axios);
const { fetchBoardCall } = useBoardApi();
const { reloadBoard } = useBoardStore();

const { execute, isRunning: isMoving } = useSafeAxiosTask();

const isDialogOpen = defineModel("is-dialog-open", {
	type: Boolean,
	default: false,
});
const selectedRoomId = ref<string>();
const selectedBoardId = ref<string>();
const selectedColumnId = ref<string>();

const rooms = ref<RoomItem[]>();
const boards = ref<RoomBoardItemResponse[]>();
const columns = ref<ColumnResponse[]>();

const selectedBoard = computed(() => boards.value?.find((board) => board.id === selectedBoardId.value));
const selectedColumn = computed(() => columns.value?.find((col) => col.id === selectedColumnId.value));

const { getCardLocation, moveCardRequest } = useBoardStore();
const isSocketEnabled = useEnvConfig().value.FEATURE_COLUMN_BOARD_SOCKET_ENABLED;

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

const resetBoardSelection = () => {
	selectedColumnId.value = undefined;
	selectedBoardId.value = undefined;
};

onMounted(async () => {
	const result = await useRoomStore().fetchRoomsPlain();

	rooms.value = sortBy(
		result?.data?.data.filter((room) => room.permissions.includes(Permission.RoomEditContent)),
		(r) => r.name
	);

	if (props.roomId && rooms.value?.find((r) => r.id === props.roomId)) {
		selectedRoomId.value = props.roomId;
	} else {
		selectedRoomId.value = undefined;
	}
});

watch(selectedRoomId, async (newRoomId) => {
	if (!newRoomId) return;
	boards.value = (await useRoomDetailsStore().fetchBoardsOfRoom(newRoomId)).boards;
});

watch(selectedBoardId, async (newBoardId) => {
	if (!newBoardId) return;
	columns.value = (await fetchBoardCall(newBoardId)).columns;
});
</script>
